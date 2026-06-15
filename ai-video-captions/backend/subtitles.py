"""ASS subtitle generation with word-by-word animations.

Creates styled ASS (Advanced SubStation Alpha) subtitle files with per-word
highlight animations.  Supports 6 animation types (highlight, karaoke, scale,
bounce, and their RTL-safe variants) across Latin, CJK, Cyrillic, Arabic,
Devanagari, Thai, and Hebrew scripts.

Ported from autoshorts ``backend/clips/subtitles.py`` — only the core
``generate_ass`` function.  Transcription and burn-in live in ``caption_job.py``.
"""

import pysubs2

from caption_styles import get_caption_style, get_output_format
from subtitle_utils import (
    escape_ass_text,
    get_subtitle_layout,
    is_latin_language,
    is_rtl_language,
    strip_emojis,
)


def _is_keyword(w: str) -> bool:
    """Lightweight NER / Regex detection for important keywords."""
    import re
    w = w.strip()
    if not w: return False
    # Numbers, monetary values, scores, dates
    if re.search(r'\d+|£|\$|€|%|-', w): return True
    # Capitalized words (excluding first word of sentence, approximation for Names/Teams)
    if len(w) > 3 and w[0].isupper() and not w.isupper(): return True
    return False

def generate_ass(
    transcript: dict,
    clip_start: float,
    clip_end: float,
    output_path: str,
    *,
    caption_style: str = "hormozi",
    caption_position: int = 10,
    language: str = "en",
    video_width: int | None = None,
    video_height: int | None = None,
) -> bool:
    """Generate an ASS subtitle file with styled word-by-word animations."""
    style_config = get_caption_style(caption_style)

    if video_width and video_height:
        play_res_x = video_width
        play_res_y = video_height
        dimension_scale = max(video_height / 1920, 0.35)
    else:
        format_config = get_output_format("vertical")
        play_res_x = format_config.width
        play_res_y = format_config.height
        dimension_scale = 1.0

    language = transcript.get("language", language)

    # ... [skipping segment parsing] ...
    clip_segments: list[dict] = []
    for segment in transcript.get("segments", []):
        for word_info in segment.get("words", []):
            if (
                word_info.get("end") is not None
                and word_info.get("start") is not None
                and word_info["end"] > clip_start
                and word_info["start"] < clip_end
            ):
                word_text = strip_emojis(word_info["word"].strip())
                if not word_text:
                    continue
                clip_segments.append(
                    {
                        "word": word_text,
                        "start": word_info["start"],
                        "end": word_info["end"],
                    }
                )

    if not clip_segments:
        return False

    max_chars_per_line, font_scale = get_subtitle_layout(language, style_config.font_size)
    max_lines = 2
    
    max_words_per_group = getattr(style_config, 'max_words', 3)
    max_pause_seconds = 0.5
    
    subtitles: list[tuple[float, float, list[tuple]]] = []
    current_lines: list[list[tuple]] = [[]]
    current_line_chars: list[int] = [0]
    current_word_count = 0
    current_start: float | None = None
    current_end: float | None = None

    for seg in clip_segments:
        word = seg["word"]
        seg_start = seg["start"]
        seg_end = seg["end"]

        if not word:
            continue

        start_rel = max(0.0, seg_start - clip_start)
        end_rel = max(0.0, seg_end - clip_start)

        if end_rel <= 0:
            continue

        word_length = len(word)
        
        is_long_pause = current_end is not None and (start_rel - current_end) > max_pause_seconds
        
        ends_with_punctuation = False
        if current_lines and current_lines[-1]:
            last_word = current_lines[-1][-1][0].rstrip()
            if last_word and last_word[-1] in [".", "?", "!"]:
                ends_with_punctuation = True
                
        should_split = is_long_pause or ends_with_punctuation or current_word_count >= max_words_per_group

        if not any(current_lines[0]) or should_split:
            if any(current_lines[0]):
                flattened_words = []
                for line_idx, line in enumerate(current_lines):
                    for word_tuple in line:
                        flattened_words.append(word_tuple + (line_idx,))
                subtitles.append((current_start, current_end, flattened_words))

            current_start = start_rel
            current_end = end_rel
            current_lines = [[(word, start_rel, end_rel)]]
            current_line_chars = [word_length]
            current_word_count = 1
        else:
            current_line_idx = len(current_lines) - 1
            current_line = current_lines[current_line_idx]
            current_chars = current_line_chars[current_line_idx]

            chars_with_word = current_chars + (1 if current_line else 0) + word_length

            if chars_with_word <= max_chars_per_line:
                current_line.append((word, start_rel, end_rel))
                current_line_chars[current_line_idx] = chars_with_word
                current_end = end_rel
                current_word_count += 1
            elif current_line_idx + 1 < max_lines:
                current_lines.append([(word, start_rel, end_rel)])
                current_line_chars.append(word_length)
                current_end = end_rel
                current_word_count += 1
            else:
                flattened_words = []
                for line_idx, line in enumerate(current_lines):
                    for word_tuple in line:
                        flattened_words.append(word_tuple + (line_idx,))
                subtitles.append((current_start, current_end, flattened_words))

                current_start = start_rel
                current_end = end_rel
                current_lines = [[(word, start_rel, end_rel)]]
                current_line_chars = [word_length]
                current_word_count = 1

    if any(current_lines[0]):
        flattened_words = []
        for line_idx, line in enumerate(current_lines):
            for word_tuple in line:
                flattened_words.append(word_tuple + (line_idx,))
        subtitles.append((current_start, current_end, flattened_words))

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

    if is_latin_language(language):
        new_style.fontname = style_config.font_name
    else:
        new_style.fontname = style_config.font_name_fallback

    new_style.fontsize = int(style_config.font_size * font_scale * dimension_scale)
    new_style.primarycolor = _parse_ass_color(style_config.primary_color)
    new_style.bold = style_config.bold
    new_style.italic = style_config.italic
    
    # Phase 3: Background Container Logic
    bg_shape = getattr(style_config, 'background_shape', 'none')
    if bg_shape != 'none':
        new_style.borderstyle = 3 # Opaque box
        new_style.outlinecolor = _parse_ass_color(getattr(style_config, 'background_color', '&H00000000'))
        new_style.backcolor = _parse_ass_color(style_config.shadow_color) # use shadow as drop shadow of box
        bg_padding = getattr(style_config, 'background_padding', 10)
        new_style.outline = round(bg_padding * font_scale * dimension_scale, 1)
        new_style.shadow = round(style_config.shadow_depth * font_scale * dimension_scale, 1)
    else:
        new_style.borderstyle = 1 # Outline + Shadow
        new_style.outlinecolor = _parse_ass_color(style_config.outline_color)
        new_style.shadowcolor = _parse_ass_color(style_config.shadow_color)
        new_style.outline = round(style_config.outline_size * font_scale * dimension_scale, 1)
        new_style.shadow = round(style_config.shadow_depth * font_scale * dimension_scale, 1)

    new_style.alignment = pysubs2.Alignment.BOTTOM_CENTER
    new_style.marginl = int(40 * dimension_scale)
    new_style.marginr = int(40 * dimension_scale)
    new_style.marginv = int(play_res_y * caption_position / 100)
    new_style.spacing = 0.5

    subs.styles[style_name] = new_style

    # ---- animation settings ----
    highlight_color = style_config.highlight_color
    animation_type = style_config.animation_type

    # ------------------------------------------------------------------
    # Generate per-word subtitle events
    # ------------------------------------------------------------------
    for _, line_end, word_list in subtitles:
        for idx, (word, word_start, _, _) in enumerate(word_list):
            # Event end = next word's start, or line end for last word
            if idx < len(word_list) - 1:
                event_end = word_list[idx + 1][1]
            else:
                event_end = line_end

            # Build full-line text with animation tags for the current word
            text_parts: list[str] = []
            prev_line_idx = None
            
            highlight_mode = getattr(style_config, 'highlight_mode', 'active_word')

            for i, (w, w_start, w_end, line_idx) in enumerate(word_list):
                # Line break when moving to a new display line
                if prev_line_idx is not None and line_idx != prev_line_idx:
                    text_parts.append("\\N")

                w_display = w.upper()
                w_upper = escape_ass_text(w_display)
                
                is_active = (i == idx)
                
                # Highlight Logic
                is_kw = _is_keyword(w_display)
                should_highlight = False
                if highlight_mode == "entire_sentence":
                    should_highlight = True
                elif highlight_mode == "keywords_only":
                    should_highlight = is_kw and is_active # or maybe just is_kw to always keep it highlighted? Let's highlight active keywords.
                else: # "active_word"
                    should_highlight = is_active
                    
                # Add persistent keyword color if it's a keyword in keywords_only mode
                if highlight_mode == "keywords_only" and is_kw and not is_active:
                    # keep keywords highlighted even when not active
                    text_parts.append(f"{{\\c{highlight_color}}}{w_upper}{{\\r}}")
                    prev_line_idx = line_idx
                    continue

                if is_active:
                    # Current word — apply style-specific animations
                    word_color = highlight_color if should_highlight else style_config.primary_color

                    if animation_type == "karaoke":
                        if is_rtl_language(language):
                            text_parts.append(f"{{\\c{word_color}}}{w_upper}{{\\r}}")
                        else:
                            duration_cs = (
                                int((w_end - w_start) * 100) if w_end > w_start else 30
                            )
                            text_parts.append(
                                f"{{\\kf{duration_cs}\\c{word_color}}}{w_upper}{{\\r}}"
                            )
                    elif animation_type == "scale":
                        text_parts.append(
                            f"{{\\fscx110\\fscy110\\c{word_color}}}{w_upper}{{\\r}}"
                        )
                    elif animation_type == "bounce":
                        bounce_pct = 120 if font_scale >= 1.0 else 112
                        text_parts.append(
                            f"{{\\t(0,50,\\fscx{bounce_pct}\\fscy{bounce_pct})"
                            f"\\t(50,100,\\fscx100\\fscy100)"
                            f"\\c{word_color}}}{w_upper}{{\\r}}"
                        )
                    else:
                        # Default highlight: simple colour change
                        if should_highlight:
                            text_parts.append(f"{{\\c{word_color}}}{w_upper}{{\\r}}")
                        else:
                            text_parts.append(w_upper)
                else:
                    # Not currently speaking AND not a persistent keyword
                    if should_highlight:
                        text_parts.append(f"{{\\c{highlight_color}}}{w_upper}{{\\r}}")
                    else:
                        text_parts.append(w_upper)

                prev_line_idx = line_idx

            # Join words with spacing
            if style_config.word_spacing != 100:
                space = f"{{\\fscx{style_config.word_spacing}}} {{\\fscx100}}"
                text = space.join(text_parts)
            else:
                text = " ".join(text_parts)

            # Apply letter spacing if non-zero
            if style_config.letter_spacing != 0:
                text = f"{{\\fsp{style_config.letter_spacing}}}{text}"
                
            # Entry / Exit Animations (Phase 3)
            anim_tags = ""
            entry_anim = getattr(style_config, 'entry_animation', 'none')
            exit_anim = getattr(style_config, 'exit_animation', 'none')
            
            if idx == 0:
                if entry_anim == "pop":
                    # pop in effect for the whole line group
                    anim_tags += "{\\t(0,150,\\fscx110\\fscy110)\\t(150,300,\\fscx100\\fscy100)}"
                elif entry_anim == "fade":
                    anim_tags += "{\\fad(200,0)}"
                    
            if idx == len(word_list) - 1:
                if exit_anim == "fade":
                    anim_tags += "{\\fad(0,200)}"
                    
            text = anim_tags + text

            event = pysubs2.SSAEvent(
                start=pysubs2.make_time(s=word_start),
                end=pysubs2.make_time(s=event_end),
                text=text,
                style=style_name,
            )
            subs.events.append(event)

    # ------------------------------------------------------------------
    # Save
    # ------------------------------------------------------------------
    try:
        subs.save(output_path)
    except Exception as exc:
        raise IOError(f"Failed to save subtitle file: {exc}") from exc

    return True
