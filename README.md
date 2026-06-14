# Ninety Football OS

> **Strategic Operating System for Sports Media Intelligence**

Ninety Football OS is a specialized internal dashboard developed for the planning, execution, and analysis of modern sports media distribution. Engineered specifically for high-velocity football content, this platform centralizes competitive intelligence, script frameworks, monetization roadmaps, and production systems into a single executive interface.

## System Architecture

The application is structured around four primary operational pillars:

1. **Core Strategy**: Executive summaries, long-term roadmaps, and structural brand architecture.
2. **Intelligence**: Real-time competitor analysis, viral format libraries, and event-driven data tracking (e.g., World Cup 2026).
3. **Production**: Proprietary script frameworks, automated prompt systems, and publishing pipelines.
4. **Operations**: Performance KPI tracking, monetization frameworks, and resource aggregation.

## Technical Specifications

- **Framework**: React via Vite
- **Interface**: Custom CSS design system optimized for data visualization and prolonged viewing.
- **Data Architecture**: Modular local state management designed for rapid iteration.
- **Environment**: Configured for local execution via Node.js or native desktop compilation via Electron.

## Installation & Deployment

Ensure Node.js (v18+) is installed on your local environment.

1. **Initialize the repository**:
   ```bash
   npm install
   ```

2. **Execute via Local Server**:
   ```bash
   npm run dev
   ```

3. **Execute via Native Desktop Wrapper**:
   ```bash
   npm run app
   ```
   *(Initializes a standalone, frameless desktop application window utilizing the Electron runtime).*

## Directory Structure

```text
ninety-football-os/
├── src/
│   ├── components/       # Feature-specific modules (PromptSuite, etc.)
│   ├── components/ui/    # Reusable design system tokens
│   ├── data/             # Centralized strategic intelligence logic
│   ├── App.jsx           # Primary application router
│   └── index.css         # Global design system
├── main.cjs              # Electron runtime entry point
└── Launch_Dashboard.vbs  # Silent execution script for Windows
```

## Security & Compliance
This software and its internal strategic data are proprietary. Unauthorized distribution of the competitive intelligence or production frameworks contained within is strictly prohibited.
