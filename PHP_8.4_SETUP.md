# PHP 8.4 Installation Guide for Windows

This guide will help you install and configure PHP 8.4 for your Laravel project on Windows.

## Method 1: Using Laravel Herd (Easiest - Recommended)

Laravel Herd is the official Laravel development environment that makes PHP version management easy:

1. **Download and Install Laravel Herd**
   - Visit: https://herd.laravel.com/windows
   - Download and run the installer
   - Herd automatically manages PHP versions including PHP 8.4

2. **Switch to PHP 8.4**
   ```powershell
   herd use php@8.4
   ```

3. **Verify Installation**
   ```powershell
   php -v
   ```
   Should show PHP 8.4.x

## Method 2: Using Chocolatey

If you have Chocolatey installed:

```powershell
choco install php --version=8.4.0
```

## Method 2: Manual Installation

1. **Download PHP 8.4**
   - Visit: https://windows.php.net/download/
   - Download the latest PHP 8.4 Thread Safe (TS) x64 ZIP package
   - Extract to `C:\php84` (or your preferred location)

2. **Configure PHP**
   - Copy `php.ini-development` to `php.ini` in your PHP directory
   - Edit `php.ini` and uncomment/enable these extensions:
     ```
     extension=curl
     extension=fileinfo
     extension=gd
     extension=mbstring
     extension=openssl
     extension=pdo_mysql
     extension=pdo_sqlite
     extension=zip
     ```

3. **Update System PATH**
   - Open System Properties → Environment Variables
   - Add `C:\php84` to your System PATH
   - Or run in PowerShell (as Administrator):
     ```powershell
     [Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\php84", [EnvironmentVariableTarget]::Machine)
     ```

4. **Verify Installation**
   ```powershell
   php -v
   ```
   Should show PHP 8.4.x

## Method 3: Using XAMPP/WAMP

- Download XAMPP with PHP 8.4 (when available) or update existing installation
- Ensure PHP 8.4 is in your system PATH

## After Installation

1. **Update Composer Dependencies**
   ```powershell
   composer update
   ```

2. **Verify PHP Version**
   ```powershell
   php -v
   composer --version
   ```

3. **Test Laravel**
   ```powershell
   php artisan --version
   ```

## Required PHP Extensions for Laravel

Make sure these extensions are enabled in `php.ini`:
- BCMath
- Ctype
- cURL
- DOM
- Fileinfo
- JSON
- Mbstring
- OpenSSL
- PCRE
- PDO
- Tokenizer
- XML

## Troubleshooting

- If `php` command is not recognized, restart your terminal/PowerShell
- Check PHP version: `php -v`
- Check loaded extensions: `php -m`
- Verify composer uses correct PHP: `composer --version`

