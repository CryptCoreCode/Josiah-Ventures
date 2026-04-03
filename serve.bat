@echo off
cd /d "%~dp0"
python -m http.server 5173 2>nul || py -m http.server 5173 2>nul
start "" "http://localhost:5173"
