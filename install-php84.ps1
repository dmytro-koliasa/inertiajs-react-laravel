# PHP 8.4 Installation Script for Windows
# This script downloads and installs PHP 8.4, then updates the PATH

Write-Host "PHP 8.4 Installation Script" -ForegroundColor Green
Write-Host "============================" -ForegroundColor Green
Write-Host ""

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "WARNING: This script should be run as Administrator to update system PATH." -ForegroundColor Yellow
    Write-Host "You can still install PHP 8.4, but you'll need to manually update PATH." -ForegroundColor Yellow
    Write-Host ""
}

# PHP installation directory
$phpDir = "C:\php\php84"
$phpZip = "$env:TEMP\php-8.4.zip"
$phpUrl = "https://windows.php.net/downloads/releases/php-8.4.0-Win32-vs16-x64.zip"

# Check if PHP 8.4 already exists
if (Test-Path "$phpDir\php.exe") {
    Write-Host "PHP 8.4 already exists at $phpDir" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to reinstall? (y/N)"
    if ($overwrite -ne "y" -and $overwrite -ne "Y") {
        Write-Host "Skipping download..." -ForegroundColor Yellow
        $skipDownload = $true
    } else {
        Remove-Item -Path $phpDir -Recurse -Force -ErrorAction SilentlyContinue
    }
}

if (-not $skipDownload) {
    Write-Host "Step 1: Downloading PHP 8.4..." -ForegroundColor Cyan
    Write-Host "URL: $phpUrl" -ForegroundColor Gray
    
    try {
        Invoke-WebRequest -Uri $phpUrl -OutFile $phpZip -UseBasicParsing
        Write-Host "Download complete!" -ForegroundColor Green
    } catch {
        Write-Host "ERROR: Failed to download PHP 8.4" -ForegroundColor Red
        Write-Host "Please download manually from: https://windows.php.net/download/" -ForegroundColor Yellow
        Write-Host "Look for: php-8.4.x-Win32-vs16-x64.zip (Thread Safe)" -ForegroundColor Yellow
        exit 1
    }

    Write-Host ""
    Write-Host "Step 2: Extracting PHP 8.4..." -ForegroundColor Cyan
    
    # Create directory if it doesn't exist
    if (-not (Test-Path $phpDir)) {
        New-Item -ItemType Directory -Path $phpDir -Force | Out-Null
    }
    
    # Extract ZIP file
    Expand-Archive -Path $phpZip -DestinationPath $phpDir -Force
    Write-Host "Extraction complete!" -ForegroundColor Green
    
    # Clean up ZIP file
    Remove-Item -Path $phpZip -Force -ErrorAction SilentlyContinue
}

Write-Host ""
Write-Host "Step 3: Configuring PHP 8.4..." -ForegroundColor Cyan

# Copy php.ini if it doesn't exist
$phpIni = "$phpDir\php.ini"
$phpIniDevelopment = "$phpDir\php.ini-development"

if (-not (Test-Path $phpIni) -and (Test-Path $phpIniDevelopment)) {
    Copy-Item -Path $phpIniDevelopment -Destination $phpIni
    Write-Host "Created php.ini from php.ini-development" -ForegroundColor Green
}

# Enable required extensions
if (Test-Path $phpIni) {
    Write-Host "Enabling required PHP extensions..." -ForegroundColor Gray
    
    $extensions = @(
        "extension=curl",
        "extension=fileinfo",
        "extension=gd",
        "extension=mbstring",
        "extension=openssl",
        "extension=pdo_mysql",
        "extension=pdo_sqlite",
        "extension=zip"
    )
    
    $iniContent = Get-Content $phpIni -Raw
    
    foreach ($ext in $extensions) {
        $extName = $ext -replace "extension=", ""
        $pattern = ";$ext"
        if ($iniContent -match [regex]::Escape($pattern)) {
            $iniContent = $iniContent -replace [regex]::Escape($pattern), $ext
            Write-Host "  Enabled: $extName" -ForegroundColor Gray
        }
    }
    
    Set-Content -Path $phpIni -Value $iniContent -NoNewline
}

Write-Host ""
Write-Host "Step 4: Updating System PATH..." -ForegroundColor Cyan

# Get current PATH
$currentPath = [Environment]::GetEnvironmentVariable("Path", "Machine")

# Remove old PHP 8.3 path if it exists
$pathEntries = $currentPath -split ';' | Where-Object { $_ -and $_ -notmatch 'php83' }

# Add PHP 8.4 path at the beginning
$newPath = "$phpDir;" + ($pathEntries -join ';')

if ($isAdmin) {
    try {
        [Environment]::SetEnvironmentVariable("Path", $newPath, "Machine")
        Write-Host "System PATH updated successfully!" -ForegroundColor Green
        Write-Host "Added: $phpDir" -ForegroundColor Gray
    } catch {
        Write-Host "WARNING: Failed to update system PATH automatically." -ForegroundColor Yellow
        Write-Host "Please manually add $phpDir to your system PATH" -ForegroundColor Yellow
    }
} else {
    Write-Host "WARNING: Not running as Administrator. PATH not updated." -ForegroundColor Yellow
    Write-Host "Please manually add $phpDir to your system PATH:" -ForegroundColor Yellow
    Write-Host "  1. Press Win+R, type 'sysdm.cpl', press Enter" -ForegroundColor Gray
    Write-Host "  2. Go to Advanced tab → Environment Variables" -ForegroundColor Gray
    Write-Host "  3. Edit 'Path' under System variables" -ForegroundColor Gray
    Write-Host "  4. Add: $phpDir" -ForegroundColor Gray
    Write-Host "  5. Move it to the top of the list" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Installation Complete!" -ForegroundColor Green
Write-Host "======================" -ForegroundColor Green
Write-Host ""
Write-Host "IMPORTANT: Please close and reopen your terminal/PowerShell window" -ForegroundColor Yellow
Write-Host "Then run: php -v" -ForegroundColor Cyan
Write-Host ""
Write-Host "If it still shows PHP 8.3, restart your computer." -ForegroundColor Gray



