# Quick Guide: Install PHP 8.4 on Windows

**Current Status:** PHP 8.3.29 is installed at `C:\php\php83\php.exe`

Follow these steps to install PHP 8.4 and make it the default:

## Option 1: Automated Installation (Recommended)

1. **Run the installation script as Administrator:**
   ```powershell
   # Right-click PowerShell and select "Run as Administrator"
   cd D:\BOOKINGHEALTH\bookinghealth
   .\install-php84.ps1
   ```

2. **Close and reopen your terminal**, then verify:
   ```powershell
   php -v
   ```

## Option 2: Manual Installation

### Step 1: Download PHP 8.4

1. Visit: https://windows.php.net/download/
2. Download: **php-8.4.x-Win32-vs16-x64.zip** (Thread Safe version)
3. Extract to: `C:\php\php84`

### Step 2: Configure PHP

1. Navigate to `C:\php\php84`
2. Copy `php.ini-development` to `php.ini`
3. Open `php.ini` in a text editor
4. Uncomment (remove the `;`) these lines:
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

### Step 3: Update System PATH

1. Press `Win + R`, type `sysdm.cpl`, press Enter
2. Go to **Advanced** tab → Click **Environment Variables**
3. Under **System variables**, find and select **Path**, click **Edit**
4. **Remove** or move down: `C:\php\php83` (if present)
5. **Add** at the top: `C:\php\php84`
6. Click **OK** on all dialogs

### Step 4: Verify Installation

1. **Close and reopen** your terminal/PowerShell
2. Run:
   ```powershell
   php -v
   ```
   Should show: `PHP 8.4.x`

3. If it still shows 8.3, **restart your computer**

## Option 3: Using Laravel Herd (Easiest)

Laravel Herd automatically manages PHP versions:

1. Download: https://herd.laravel.com/windows
2. Install Herd
3. Run: `herd use php@8.4`
4. Verify: `php -v`

## After Installation

Once PHP 8.4 is active, update your Composer dependencies:

```powershell
composer update
```

Then verify Laravel works:

```powershell
php artisan --version
```

## Troubleshooting

- **Still seeing PHP 8.3?** 
  - Close all terminal windows
  - Restart your computer
  - Check PATH order: `C:\php\php84` should come before `C:\php\php83`

- **PHP not found?**
  - Verify PATH includes `C:\php\php84`
  - Check that `C:\php\php84\php.exe` exists

- **Extensions missing?**
  - Check `php.ini` in `C:\php\php84`
  - Run `php -m` to see loaded extensions

