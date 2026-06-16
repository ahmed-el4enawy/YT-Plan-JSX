# Content Operations System

> **Strategic Operating System for Sports Media Intelligence**

Content Operations System is a specialized internal dashboard developed for the planning, execution, and analysis of modern sports media distribution. Engineered specifically for high-velocity digital media, this platform centralizes competitive intelligence, script frameworks, monetization roadmaps, and production systems into a single executive interface.

## System Architecture

The application is structured around five primary operational pillars:

1. **Core Strategy**: Executive summaries, long-term roadmaps, and structural brand architecture.
2. **Intelligence**: Real-time competitor analysis, viral format libraries, and event-driven data tracking.
3. **Production**: Proprietary script frameworks, automated prompt systems, and publishing pipelines.
4. **Operations**: Performance KPI tracking, monetization frameworks, and resource aggregation.
5. **Video Engineering Engine**: A fully integrated Python-based backend that processes video, transcribes audio utilizing faster-whisper, and burns highly stylized, frame-accurate typography into content directly within the dashboard.

## Technical Specifications

- **Frontend Framework**: React via Vite
- **Interface Design**: Custom CSS design system optimized for data visualization and prolonged viewing.
- **Video Processing Backend**: Python, Flask, FFmpeg, faster-whisper, pysubs2.
- **Environment Integration**: Configured for local execution via Node.js or native desktop compilation via Electron, with automatic Python virtual environment bootstrapping.

## Installation & Deployment

### Prerequisites
- Node.js (v18+)
- Python (3.10+)
- FFmpeg (Installed and added to systemic PATH variables)

### Configuration Instructions

1. **Initialize the repository**:
   `ash
   npm install
   `

2. **Execute via Native Desktop Wrapper (Recommended)**:
   `ash
   npm run app
   `
   *This command leverages concurrently to bootstrap the React frontend, automatically instantiate the Python processing environment, install backend requirements, and launch the unified Electron desktop interface.*

3. **Execute via Browser (Development Mode)**:
   `ash
   npm run dev
   `

## Directory Structure

`	ext
content-operations-system/
+-- src/
¦   +-- components/       # Feature-specific modules (TranscriptEditor, PromptSuite)
¦   +-- components/ui/    # Reusable design system tokens
¦   +-- data/             # Centralized strategic intelligence logic
¦   +-- pages/            # View-level routing and structural files
¦   +-- App.jsx           # Primary application router
¦   +-- index.css         # Global design system
+-- ai-video-captions/
¦   +-- backend/          # Video processing pipeline and Python server
+-- main.cjs              # Electron runtime entry point
+-- start_backend.bat     # Automated Python provisioning script
`

## Security & Compliance
This software and its internal strategic data are proprietary. Unauthorized distribution of the competitive intelligence or production frameworks contained within is strictly prohibited.

