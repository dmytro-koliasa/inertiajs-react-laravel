@echo off
REM This script helps update your PATH to use PHP 8.4 instead of PHP 8.3
REM Run this as Administrator

echo ========================================
echo PHP 8.4 PATH Update Script
echo ========================================
echo.

REM Check if running as admin
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: This script must be run as Administrator!
    echo Right-click and select "Run as administrator"
    pause
    exit /b 1
)

echo Step 1: Checking current PATH...
echo.

REM Get current system PATH
for /f "tokens=2*" %%A in ('reg query "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v Path') do set "CURRENT_PATH=%%B"

echo Current PATH contains:
echo %CURRENT_PATH% | findstr /i "php"
echo.

echo Step 2: Updating PATH...
echo.

REM Remove php83 from PATH
set "NEW_PATH=%CURRENT_PATH:;C:\php\php83;=;%"
set "NEW_PATH=%NEW_PATH:C:\php\php83;=%"
set "NEW_PATH=%NEW_PATH:;C:\php\php83=%"

REM Add php84 at the beginning if not already present
echo %NEW_PATH% | findstr /i "C:\php\php84" >nul
if %errorLevel% neq 0 (
    set "NEW_PATH=C:\php\php84;%NEW_PATH%"
    echo Added C:\php\php84 to PATH
) else (
    echo C:\php\php84 already in PATH
)

REM Update system PATH
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v Path /t REG_EXPAND_SZ /d "%NEW_PATH%" /f >nul

if %errorLevel% equ 0 (
    echo.
    echo SUCCESS: PATH updated!
    echo.
    echo IMPORTANT: Close and reopen your terminal, then run: php -v
    echo If it still shows 8.3, restart your computer.
) else (
    echo.
    echo ERROR: Failed to update PATH
    echo Please update manually via System Properties
)

echo.
pause



