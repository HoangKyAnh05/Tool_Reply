$WshShell = New-Object -ComObject WScript.Shell

$appDir = "D:\code_tino_19_4\Code_Tool_Python\Tool_Imagine"
$vbsPath = Join-Path $appDir "launch-silent.vbs"
$icoPath = Join-Path $appDir "assets\app-icon.ico"
$shortcutName = "Imagine AI Studio.lnk"

# Get All Desktop paths
$desktopPaths = @(
    [Environment]::GetFolderPath("Desktop"),
    "C:\Users\Admin\Desktop",
    "D:\Desktop"
) | Select-Object -Unique

foreach ($dPath in $desktopPaths) {
    if (Test-Path $dPath) {
        $shortcutFile = Join-Path $dPath $shortcutName
        $Shortcut = $WshShell.CreateShortcut($shortcutFile)
        $Shortcut.TargetPath = "wscript.exe"
        $Shortcut.Arguments = "`"$vbsPath`""
        $Shortcut.WorkingDirectory = $appDir
        if (Test-Path $icoPath) {
            $Shortcut.IconLocation = "$icoPath, 0"
        }
        $Shortcut.Description = "Imagine AI Studio - Gemini, ChatGPT, Facebook, Instagram, Zalo Mini Browser"
        $Shortcut.Save()
        Write-Host "Created Desktop Shortcut at: $shortcutFile"
    }
}
