# Quick Install: PHP 8.4 for Laravel

## Current Situation
- You have PHP 8.3.29 at `C:\php\php83\php.exe`
- You need PHP 8.4 for your Laravel project

## Fastest Method: Manual Download & Install

### Step 1: Download PHP 8.4 (2 minutes)

1. Go to: **https://windows.php.net/download/**
2. Find **PHP 8.4** section
3. Download: **php-8.4.x-Win32-vs16-x64.zip** (Thread Safe, x64)
4. Save to your Downloads folder

### Step 2: Extract PHP 8.4 (1 minute)

1. Extract the ZIP file
2. Rename the extracted folder to `php84`
3. Move it to `C:\php\php84` (so you have both `C:\php\php83` and `C:\php\php84`)

### Step 3: Configure PHP 8.4 (2 minutes)

1. Go to `C:\php\php84`
2. Copy `php.ini-development` → rename to `php.ini`
3. Open `php.ini` in Notepad
4. Press `Ctrl+F` and search for these lines, remove the `;` at the start:
   - `;extension=curl` → `extension=curl`
   - `;extension=fileinfo` → `extension=fileinfo`
   - `;extension=gd` → `extension=gd`
   - `;extension=mbstring` → `extension=mbstring`
   - `;extension=openssl` → `extension=openssl`
   - `;extension=pdo_mysql` → `extension=pdo_mysql`
   - `;extension=pdo_sqlite` → `extension=pdo_sqlite`
   - `;extension=zip` → `extension=zip`
5. Save the file

### Step 4: Update PATH (3 minutes)

**Method A: Using the batch script (Easiest)**
1. Right-click `update-path-to-php84.bat`
2. Select "Run as administrator"
3. Follow the prompts

**Method B: Manual (If script doesn't work)**
1. Press `Win + R`, type `sysdm.cpl`, press Enter
2. Click **Advanced** tab → **Environment Variables**
3. Under **System variables**, find **Path**, click **Edit**
4. Find `C:\php\php83` and either:
   - Delete it, OR
   - Move `C:\php\php84` above it
5. If `C:\php\php84` is not there, click **New** and add it
6. Click **OK** on all windows

### Step 5: Verify (1 minute)

1. **Close ALL terminal/PowerShell windows**
2. Open a **new** PowerShell window
3. Run:
   ```powershell
   php -v
   ```
4. Should show: `PHP 8.4.x`

**If it still shows 8.3:**
- Restart your computer
- Then check again: `php -v`

### Step 6: Update Composer (1 minute)

```powershell
composer update
php artisan --version
```

## Alternative: Laravel Herd (Easiest Overall)

If you want automatic PHP version management:

1. Download: https://herd.laravel.com/windows
2. Install Herd
3. Run: `herd use php@8.4`
4. Done! No PATH configuration needed.

## Troubleshooting

**Problem:** `php -v` still shows 8.3
- **Solution:** Restart your computer, then check again

**Problem:** `php` command not found
- **Solution:** Verify `C:\php\php84` is in your PATH and `php.exe` exists there

**Problem:** Extensions not loading
- **Solution:** Check `php.ini` in `C:\php\php84` and verify extensions are uncommented

---

**Total Time:** ~10 minutes




