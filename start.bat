@echo off
echo Starting Web Terraria...
echo.
echo Opening game in browser...
echo.
echo If the game doesn't open automatically, go to: http://localhost:8080
echo.
echo Press Ctrl+C to stop the server
echo.

:: Start HTTP server
python -m http.server 8080

:: If Python is not available, try Node.js
if errorlevel 1 (
    echo Python not found, trying Node.js...
    npx http-server -p 8080
)