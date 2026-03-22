#!/bin/bash
echo "Starting Web Terraria..."
echo ""
echo "Opening game in browser..."
echo ""
echo "If the game doesn't open automatically, go to: http://localhost:8080"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start HTTP server
if command -v python3 &> /dev/null; then
    python3 -m http.server 8080
elif command -v python &> /dev/null; then
    python -m http.server 8080
elif command -v npx &> /dev/null; then
    npx http-server -p 8080
else
    echo "Error: No suitable HTTP server found."
    echo "Please install Python or Node.js to run the game."
    exit 1
fi