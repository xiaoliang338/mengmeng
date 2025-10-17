@echo off
chcp 65001 >nul
cd /d D:\0418\vs\Birthday
echo ========================================
echo   Birthday APP Server
echo ========================================
echo.
echo Current Directory: %CD%
echo.
echo HTML Files:
dir /b *.html
echo.
echo ========================================
echo Starting server...
echo URL: http://127.0.0.1:9000
echo ========================================
echo.
python -m http.server 9000
pause






