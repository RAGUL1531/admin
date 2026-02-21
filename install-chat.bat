@echo off
echo ========================================
echo Doctor-Patient Chat Integration
echo ========================================
echo.
echo This script will install dependencies for the doctor portal
echo.

cd /d "%~dp0"

echo Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Installation failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Add DoctorChat route to App.tsx (see INTEGRATION_SUMMARY.md)
echo 2. Start WebSocket server from paper-starter-kit
echo 3. Start this dev server with: npm run dev
echo 4. Navigate to /doctor-chat in your browser
echo.
pause
