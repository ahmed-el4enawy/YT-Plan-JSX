@echo off
cd ai-video-captions\backend

IF NOT EXIST "venv" (
    echo [AI Caption Studio] First time setup: Creating Python virtual environment...
    python -m venv venv
)

venv\Scripts\python -c "import flask" 2>NUL
IF %ERRORLEVEL% NEQ 0 (
    echo [AI Caption Studio] Installing backend dependencies. This may take a few minutes...
    venv\Scripts\python -m pip install --upgrade pip
    venv\Scripts\pip install -r requirements.txt
    echo [AI Caption Studio] Setup complete!
)

echo [AI Caption Studio] Starting AI Backend Server...
venv\Scripts\python app.py
