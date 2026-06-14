import sys
import os
import time

# Ensure backend modules are reachable
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from caption_job import probe_video, transcribe_audio, generate_ass_from_transcript, burn_subtitles

def main():
    video_path = os.path.join("..", "1.mp4")
    if not os.path.exists(video_path):
        print(f"Error: {video_path} not found.")
        sys.exit(1)

    output_path = os.path.join("..", "1_captioned.mp4")
    ass_path = os.path.join("..", "temp_subtitles.ass")

    print(f"Probing video: {video_path}...")
    try:
        width, height, duration = probe_video(video_path)
    except Exception as e:
        print(f"Failed to probe video: {e}")
        sys.exit(1)
        
    print(f"Video specs: {width}x{height}, {duration}s")

    print("Transcribing audio (this will download the Whisper model the first time)...")
    start_time = time.time()
    try:
        transcript = transcribe_audio(video_path)
        language = transcript.get("language", "en")
        print(f"Transcription done in {time.time() - start_time:.2f}s. Language: {language}")
    except Exception as e:
        print(f"Failed to transcribe: {e}")
        sys.exit(1)

    print("Generating ASS file...")
    # Defaulting to 'mrbeast' style for high engagement
    caption_style = "mrbeast"
    caption_position = 20
    try:
        generate_ass_from_transcript(
            transcript,
            duration,
            ass_path,
            caption_style=caption_style,
            caption_position=caption_position,
            language=language,
            video_width=width,
            video_height=height,
        )
        print(f"ASS file saved to {ass_path}")
    except Exception as e:
        print(f"Failed to generate ASS: {e}")
        sys.exit(1)

    print("Burning subtitles to video...")
    start_time = time.time()
    try:
        burn_subtitles(video_path, ass_path, output_path)
        print(f"Burn done in {time.time() - start_time:.2f}s.")
    except Exception as e:
        print(f"Failed to burn subtitles: {e}")
        sys.exit(1)

    # Cleanup
    if os.path.exists(ass_path):
        os.remove(ass_path)

    print(f"Success! Output saved to: {os.path.abspath(output_path)}")

if __name__ == "__main__":
    main()
