$WshShell = New-Object -ComObject WScript.Shell

$appDir = "D:\code_tino_19_4\Code_Tool_Python\Tool_Imagine"
$electronExe = Join-Path $appDir "node_modules\electron\dist\electron.exe"
$mainMjs = Join-Path $appDir "electron\main.mjs"
$icoPath = Join-Path $appDir "assets\app-icon.ico"
$shortcutName = "Imagine AI Studio.lnk"

# All target directories for shortcut
$targetDirs = @(
    [Environment]::GetFolderPath("Desktop"),
    "C:\Users\Admin\Desktop",
    "D:\Desktop",
    [Environment]::GetFolderPath("Programs"),
    "C:\Users\Admin\AppData\Roaming\Microsoft\Windows\Start Menu\Programs",
    $appDir
) | Select-Object -Unique

foreach ($dir in $targetDirs) {
    if (Test-Path $dir) {
        $shortcutFile = Join-Path $dir $shortcutName
        try {
            $Shortcut = $WshShell.CreateShortcut($shortcutFile)
            $Shortcut.TargetPath = $electronExe
            $Shortcut.Arguments = "`"$mainMjs`""
            $Shortcut.WorkingDirectory = $appDir
            if (Test-Path $icoPath) {
                $Shortcut.IconLocation = "$icoPath, 0"
            }
            $Shortcut.Description = "Imagine AI Studio - IELTS Visual Map, 600 Writing, 3000 Fishbone Vocab & GenZ Studio"
            $Shortcut.Save()
            Write-Host "Created shortcut: $shortcutFile"
        } catch {
            Write-Host "Skip $shortcutFile"
        }
    }
}
