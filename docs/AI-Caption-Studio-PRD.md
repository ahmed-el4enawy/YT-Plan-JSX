# AI Caption Studio – Product Requirements Document (PRD)

## Vision
Build a professional desktop/web application that transforms a raw video into a fully captioned, social-media-ready video automatically.

The application should compete with modern creator tools such as Captions, Submagic, CapCut, VEED, and Descript by combining AI transcription, intelligent caption generation, branding, animation, and export into a single workflow.

The goal is not to create a subtitle generator.
The goal is to create an **AI Caption Studio**.

Users should be able to upload a video, choose a style, and receive a professionally captioned final video with minimal editing.

---

# Core Workflow
1. Upload Video
2. AI Transcribes Speech
3. AI Generates Word-Level Timestamps
4. AI Segments Captions Intelligently
5. AI Applies Caption Style
6. AI Highlights Important Words
7. User Adjusts Settings (Optional)
8. Export Final Video

---

# AI Transcription Engine

## Models
* Whisper Large-v3
* WhisperX

Requirements:
* Word-level timestamps
* Multi-language support
* Speaker detection
* High transcription accuracy
* Fast GPU inference

The system must support precise word timing because modern creator captions rely on word-by-word animation and highlighting. WhisperX is commonly used for this purpose due to its word-level timestamp alignment capabilities.

## Transcription Settings
### Language
* Auto Detect
* Manual Selection

### Accuracy Mode
* Fast
* Balanced
* Maximum Accuracy

### Speaker Detection
* Enabled
* Disabled

### Remove Filler Words
Examples:
* um
* uh
* like
* you know

---

# Caption Segmentation Engine

## Caption Modes
* Single Word
* Two Words
* Three Words
* Three to Five Words
* Full Sentence

## Reading Speed
* Slow
* Medium
* Fast

## Maximum Characters
Adjustable slider

## AI Smart Splitting
The AI should automatically determine optimal caption breaks based on:
* Speech rhythm
* Punctuation
* Pauses
* Reading speed
* Platform type

---

# Caption Styling System

## Fonts
Built-in:
* Anton
* Montserrat
* Poppins
* Bebas Neue
* Impact
* Oswald
* Inter

User Upload:
* TTF
* OTF

---

# Text Settings

## Font Size
Slider

## Font Weight
* Light
* Regular
* Medium
* Bold
* Extra Bold

## Letter Spacing
Slider

## Line Height
Slider

## Uppercase
Enabled / Disabled

---

# Color System

## Primary Text Color
## Secondary Text Color
## Highlight Color
## Stroke Color
## Background Color
## Shadow Color
## Gradient Support

---

# Word Highlighting Engine

## Highlight Modes
* Current Word
* Previous Word
* Current Sentence
* Keywords Only

## Highlight Effects
* Color Change
* Scale Up
* Glow
* Bounce
* Pulse

## Smart Keyword Detection
AI should automatically detect and emphasize:
* Names
* Teams
* Scores
* Money Amounts
* Statistics
* Dates
* Numbers

Example:
"Liverpool signed Wirtz for £116 million"

Automatically highlight:
* Liverpool
* Wirtz
* £116 million

---

# Stroke Settings
## Enable Stroke
Yes / No
## Stroke Thickness
1–20
## Stroke Opacity
Slider
## Stroke Color
Color Picker

---

# Background Box System
## Enable Background
Yes / No
## Shapes
* Rectangle
* Rounded Rectangle
* Pill
## Border Radius
Slider
## Border Width
Slider
## Border Color
Color Picker
## Padding
Slider
## Opacity
Slider

---

# Shadow System
## Enable Shadow
Yes / No
## Opacity
Slider
## Blur
Slider
## Distance
Slider
## Angle
Slider

---

# Glow System
## Enable Glow
Yes / No
## Glow Color
Color Picker
## Intensity
Slider
## Radius
Slider

---

# Animation Engine
## Entry Animations
* Pop
* Bounce
* Zoom
* Fade
* Slide

## Exit Animations
* None
* Fade
* Shrink

## Word Animations
* Pop Every Word
* Bounce Every Word
* Scale Current Word
* Pulse Current Word

---

# Caption Presets
## Football News
* White Text
* Black Stroke
* Yellow Highlight

## Hormozi
* White Text
* Black Stroke
* Word Highlight

## Red Box
* White Text
* Red Rounded Background

## Gaming
## Podcast
## Documentary
## Luxury

All presets should be editable and savable.

---

# Brand Kit System
## Upload Logo
## Brand Colors
## Brand Fonts
## Watermark Position
## Save Brand Profile

Example:
"Ninety Football"
One click should apply all branding settings automatically.

---

# AI Style Cloning
## Upload Screenshot
User uploads a screenshot of captions from any video.
AI automatically extracts:
* Font
* Colors
* Stroke
* Shadows
* Background Shape
* Position
* Animation Style

Then recreates the style automatically.
This should be a flagship feature.

---

# Live Preview System
Requirements:
* Real-time preview
* Instant updates
* Zoom support
* Frame-by-frame inspection

---

# Export System
## Resolution
* 720p
* 1080p
* 1440p
* 4K

## Frame Rate
* 24 FPS
* 30 FPS
* 60 FPS

## Quality
* Low
* Medium
* High
* Ultra

---

# Subtitle Export
## Formats
* SRT
* ASS
* VTT
* TXT
* JSON

Word-level subtitle exports are supported by modern timestamping pipelines and professional subtitle workflows.

---

# Advanced Features
## Batch Processing
Process multiple videos simultaneously.

## Preset Marketplace
Share and import styles.

## AI Viral Mode
Automatically choose:
* Caption style
* Font size
* Highlight strategy
* Animation
Based on the content category.

## Auto Safe Zone
Prevent captions from overlapping platform UI.

## Social Platform Presets
* YouTube Shorts
* TikTok
* Instagram Reels
* Facebook Reels

---

# Success Criteria
The user should be able to:
1. Upload a video.
2. Click one preset.
3. Receive a fully captioned professional video.
4. Export immediately.

The application should reduce the caption creation process from 20–30 minutes to less than 60 seconds while maintaining professional creator-level quality.
