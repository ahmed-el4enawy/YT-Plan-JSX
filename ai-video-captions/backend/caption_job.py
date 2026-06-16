"""Caption job processing pipeline.

Runs the full video captioning workflow:
  1. Probe video for dimensions and duration (ffprobe)
  2. Transcribe audio with word-level timestamps (faster-whisper)
  3. Generate ASS subtitle file
  4. Burn subtitles into video (ffmpeg)
  5. Clean up temp files and mark job completed
"""

import json
import logging
import os
import shutil
import subprocess
import time

logger = logging.getLogger(__name__)

# Default Whisper model size; override via env var to trade speed vs accuracy.
_WHISPER_MODEL_SIZE = os.environ.get("WHISPER_MODEL_SIZE", "base")


# ---------------------------------------------------------------------------
# Low-level helpers (each independently mockable)
# ---------------------------------------------------------------------------

def probe_video(video_path: str) -> tuple[int, int, float]:
    """Return (width, height, duration_seconds) for *video_path* via ffprobe.

    Raises:
        RuntimeError: if ffprobe is not installed or returns a non-zero exit code.
        ValueError: if the probe output cannot be parsed.
    """
    cmd = [
        "ffprobe",
        "-v", "quiet",
        "-print_format", "json",
        "-show_streams",
        video_path,
    ]
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
    except FileNotFoundError as exc:
        raise RuntimeError("ffprobe not found; please install ffmpeg") from exc
    except subprocess.CalledProcessError as exc:
        raise RuntimeError(f"ffprobe failed: {exc.stderr.strip()}") from exc

    data = json.loads(result.stdout)
    video_stream = next(
        (s for s in data.get("streams", []) if s.get("codec_type") == "video"),
        None,
    )
    if video_stream is None:
        raise ValueError(f"No video stream found in {video_path!r}")

    width = int(video_stream["width"])
    height = int(video_stream["height"])

    # Duration may live on the stream or the container (format) level.
    duration_str = video_stream.get("duration") or data.get("format", {}).get("duration")
    if duration_str is None:
        raise ValueError(f"Could not determine duration of {video_path!r}")
    duration = float(duration_str)

    return width, height, duration


def transcribe_audio(video_path: str) -> dict:
    """Transcribe *video_path* using faster-whisper with word-level timestamps.

    Returns a dict with keys:
        language  (str)   – detected language code, e.g. "en"
        segments  (list)  – list of segment dicts, each containing:
            start, end, text, words (list of word dicts with start/end/word)

    The model size is controlled by the ``WHISPER_MODEL_SIZE`` environment
    variable (default: "base").
    """
    # Import here so tests can mock at the module level without importing
    # faster-whisper at module load time (it is a heavy optional dependency).
    import os, sys, glob
    
    # Add NVIDIA DLL directories to PATH for ctranslate2 (faster-whisper) on Windows
    if os.name == "nt":
        for path_dir in sys.path:
            # Look for nvidia directories in site-packages
            for nvidia_dir in glob.glob(os.path.join(path_dir, "nvidia", "*", "bin")):
                if os.path.exists(nvidia_dir):
                    os.environ["PATH"] = nvidia_dir + os.pathsep + os.environ.get("PATH", "")
                    if hasattr(os, "add_dll_directory"):
                        try:
                            os.add_dll_directory(nvidia_dir)
                        except Exception as e:
                            logger.warning("Failed to add DLL directory %s: %s", nvidia_dir, e)

    from faster_whisper import WhisperModel  # type: ignore[import]

    try:
        model = WhisperModel(_WHISPER_MODEL_SIZE, device="cuda", compute_type="int8_float16")
    except Exception as e:
        logger.warning("CUDA initialization failed (%s). Falling back to CPU.", e)
        model = WhisperModel(_WHISPER_MODEL_SIZE, device="cpu", compute_type="int8")
    
    segments_iter, info = model.transcribe(video_path, word_timestamps=True)

    segments = []
    for seg in segments_iter:
        words = []
        for w in (seg.words or []):
            words.append({"word": w.word, "start": w.start, "end": w.end})
        segments.append({
            "start": seg.start,
            "end": seg.end,
            "text": seg.text.strip(),
            "words": words,
        })

    return {
        "language": info.language,
        "segments": segments,
    }


def generate_ass_from_transcript(
    transcript: dict,
    duration: float,
    output_path: str,
    caption_style: str,
    caption_position: int,
    language: str,
    video_width: int,
    video_height: int,
):
    """Generate an ASS subtitle file from a transcript dict.

    This is a thin wrapper around ``subtitles.generate_ass()``.
    Returns True on success.
    """
    import subtitles

    return subtitles.generate_ass(
        transcript,
        0,
        duration,
        output_path,
        caption_style=caption_style,
        caption_position=caption_position,
        language=language,
        video_width=video_width,
        video_height=video_height,
    )


def burn_subtitles(video_path: str, ass_path: str, output_path: str) -> bool:
    """Burn ASS subtitles into *video_path* and write to *output_path*.

    Uses libx264 with veryfast preset and CRF 18 for high quality output.
    Audio is stream-copied without re-encoding.

    Returns True on success.

    Raises:
        RuntimeError: if ffmpeg is not installed or returns a non-zero exit code.
    """
    # FFmpeg filter parser needs special escaping on Windows for absolute paths
    ass_path_escaped = ass_path.replace('\\', '/').replace(':', '\\:')
    
    cmd = [
        "ffmpeg",
        "-y",
        "-i", video_path,
        "-vf", f"ass='{ass_path_escaped}'",
        "-c:v", "libx264",
        "-preset", "veryfast",
        "-crf", "18",
        "-c:a", "copy",
        output_path,
    ]
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
    except FileNotFoundError as exc:
        raise RuntimeError("ffmpeg not found; please install ffmpeg") from exc
    except subprocess.CalledProcessError as exc:
        raise RuntimeError(f"ffmpeg failed: {exc.stderr[-500:]}") from exc

    _ = result  # success
    return True


# ---------------------------------------------------------------------------
# Main pipeline
# ---------------------------------------------------------------------------

def process_caption_job(
    storage,
    job_id: str,
    video_path: str,
    caption_style: str,
    caption_position: int,
    data_dir: str,
) -> None:
    """Run the full captioning pipeline for a job.

    Progress milestones:
        5   – job started, probing video
        40  – transcription complete
        50  – ASS file generated
        90  – subtitles burned into video
        100 – completed

    All exceptions are caught; on failure the job is marked "failed" with the
    exception message stored in ``error_message``.
    """
    # Derived paths
    ass_path = os.path.join(data_dir, "temp", job_id, "subtitles.ass")
    output_dir = os.path.join(data_dir, "output", job_id)
    output_path = os.path.join(output_dir, "captioned.mp4")

    start_time = time.time()

    try:
        # ------------------------------------------------------------------
        # Phase 1: probe
        # ------------------------------------------------------------------
        storage.update_status(
            job_id,
            status="processing",
            phase="transcribing",
            progress=5,
        )

        width, height, duration = probe_video(video_path)
        storage.update_status(job_id, duration=duration)

                # ------------------------------------------------------------------
        # Phase 2: transcribe
        # ------------------------------------------------------------------
        transcript = transcribe_audio(video_path)
        language = transcript.get("language", "en")
        storage.update_status(job_id, language=language, progress=40)

        

        # ------------------------------------------------------------------
        # Phase 3: generate ASS
        # ------------------------------------------------------------------
        storage.update_status(job_id, phase="burning", progress=50)

        os.makedirs(os.path.dirname(ass_path), exist_ok=True)
        grouped_data = generate_ass_from_transcript(
            transcript=transcript,
            duration=duration,
            output_path=ass_path,
            caption_style=caption_style,
            caption_position=caption_position,
            language=language,
            video_width=width,
            video_height=height,
        )

        if grouped_data:
            os.makedirs(output_dir, exist_ok=True)
            transcript_path = os.path.join(output_dir, "transcript.json")
            with open(transcript_path, "w", encoding="utf-8") as f:
                json.dump({"segments": grouped_data}, f, indent=2)

        # ------------------------------------------------------------------
        # Phase 4: burn subtitles
        # ------------------------------------------------------------------
        storage.update_status(job_id, phase="finalizing", progress=90)

        os.makedirs(output_dir, exist_ok=True)
        burn_subtitles(video_path, ass_path, output_path)

        # ------------------------------------------------------------------
        # Phase 5: clean up temp files and finalise
        # ------------------------------------------------------------------
        temp_job_dir = os.path.join(data_dir, "temp", job_id)
        if os.path.isdir(temp_job_dir):
            shutil.rmtree(temp_job_dir, ignore_errors=True)

        storage.update_status(
            job_id,
            status="completed",
            progress=100,
            output_path=output_path,
            processing_time_ms=int((time.time() - start_time) * 1000),
        )

    except Exception as exc:  # noqa: BLE001
        logger.exception("Job %s failed: %s", job_id, exc)
        storage.update_status(job_id, status="failed", error=str(exc))




def reprocess_caption_job(
    storage,
    job_id: str,
    video_path: str,
    caption_style: str,
    caption_position: int,
    data_dir: str,
    grouped_data: list,
) -> None:
    ass_path = os.path.join(data_dir, "temp", job_id, "subtitles.ass")
    output_dir = os.path.join(data_dir, "output", job_id)
    output_path = os.path.join(output_dir, "captioned.mp4")

    start_time = time.time()

    try:
        storage.update_status(job_id, status="processing", phase="re-burning", progress=50)

        width, height, duration = probe_video(video_path)

        # Convert the grouped_data back into the flattened tuple format subtitles.py expects
        subtitles_input = []
        for segment in grouped_data:
            word_list = []
            for w in segment.get("words", []):
                # Format: (word, start_rel, end_rel, line_idx)
                word_list.append((w["word"], w["start"], w["end"], 0))
            subtitles_input.append((segment["start"], segment["end"], word_list))

        import subtitles
        import pysubs2
        from caption_styles import get_caption_style, get_output_format
        from subtitle_utils import get_subtitle_layout, is_latin_language, is_rtl_language, escape_ass_text

        # ------------------------------------------------------------------
        # Inline re-generation of ASS using the grouped data
        # ------------------------------------------------------------------
        language = storage.get_job(job_id).get("language", "en")
        style_config = get_caption_style(caption_style)
        
        format_config = get_output_format("vertical")
        play_res_x = format_config.width
        play_res_y = format_config.height
        dimension_scale = 1.0

        subs = pysubs2.SSAFile()
        subs.info["WrapStyle"] = 3
        subs.info["ScaledBorderAndShadow"] = "yes"
        subs.info["PlayResX"] = play_res_x
        subs.info["PlayResY"] = play_res_y
        subs.info["ScriptType"] = "v4.00+"

        def _parse_ass_color(ass_color: str) -> pysubs2.Color:
            color_hex = ass_color.replace("&H", "").replace("&", "")
            color_hex = color_hex.zfill(8)
            alpha = int(color_hex[0:2], 16)
            blue = int(color_hex[2:4], 16)
            green = int(color_hex[4:6], 16)
            red = int(color_hex[6:8], 16)
            return pysubs2.Color(red, green, blue, alpha)

        style_name = "Default"
        new_style = pysubs2.SSAStyle()
        new_style.fontname = style_config.font_name if is_latin_language(language) else style_config.font_name_fallback
        
        _, font_scale = get_subtitle_layout(language, style_config.font_size)
        
        new_style.fontsize = int(style_config.font_size * font_scale * dimension_scale)
        new_style.primarycolor = _parse_ass_color(style_config.primary_color)
        new_style.bold = style_config.bold
        new_style.italic = style_config.italic
        new_style.outline = round(style_config.outline_size * font_scale * dimension_scale, 1)
        new_style.outlinecolor = _parse_ass_color(style_config.outline_color)
        new_style.shadow = round(style_config.shadow_depth * font_scale * dimension_scale, 1)
        new_style.shadowcolor = _parse_ass_color(style_config.shadow_color)
        new_style.alignment = pysubs2.Alignment.BOTTOM_CENTER
        new_style.marginl = int(40 * dimension_scale)
        new_style.marginr = int(40 * dimension_scale)
        new_style.marginv = int(play_res_y * caption_position / 100)
        new_style.spacing = 0.5
        subs.styles[style_name] = new_style

        highlight_color = style_config.highlight_color
        animation_type = style_config.animation_type

        for _, line_end, word_list in subtitles_input:
            for idx, (word, word_start, _, _) in enumerate(word_list):
                if idx < len(word_list) - 1:
                    event_end = word_list[idx + 1][1]
                else:
                    event_end = line_end

                text_parts = []
                prev_line_idx = None
                for i, (w, w_start, w_end, line_idx) in enumerate(word_list):
                    if prev_line_idx is not None and line_idx != prev_line_idx:
                        text_parts.append("\\N")
                    w_display = w.upper()
                    w_upper = escape_ass_text(w_display)
                    if i == idx:
                        word_color = highlight_color
                        if animation_type == "karaoke":
                            text_parts.append(f"{{\\c&H{word_color}&}}{w_upper}{{\\r}}")
                        else:
                            text_parts.append(f"{{\\c&H{word_color}&}}{w_upper}{{\\r}}")
                    else:
                        text_parts.append(w_upper)
                    prev_line_idx = line_idx
                    if i < len(word_list) - 1 and word_list[i + 1][3] == line_idx:
                        text_parts.append(" ")
                
                text = "".join(text_parts)
                if style_config.letter_spacing != 0:
                    text = f"{{\\fsp{style_config.letter_spacing}}}{text}"

                event = pysubs2.SSAEvent(
                    start=pysubs2.make_time(s=word_start),
                    end=pysubs2.make_time(s=event_end),
                    text=text,
                    style=style_name,
                )
                subs.events.append(event)

        subs.save(ass_path)
        
        storage.update_status(job_id, phase="burning_video", progress=75)
        burn_subtitles(video_path, ass_path, output_path)

        # Update transcript.json with new edited grouped_data
        transcript_path = os.path.join(output_dir, "transcript.json")
        with open(transcript_path, "w", encoding="utf-8") as f:
            json.dump({"segments": grouped_data}, f, indent=2)

        elapsed = time.time() - start_time
        storage.update_status(
            job_id,
            status="completed",
            progress=100,
            phase="done",
            processing_time_ms=int(elapsed * 1000),
            output_path=output_path,
        )
    except Exception as exc:
        logger.exception("Job %s reprocess failed", job_id)
        storage.update_status(job_id, status="failed", error=str(exc))
