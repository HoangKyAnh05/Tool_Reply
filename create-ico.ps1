Add-Type -AssemblyName System.Drawing

$size = 256
$bmp = New-Object System.Drawing.Bitmap $size, $size
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

$p1 = New-Object System.Drawing.Point 0, 0
$p2 = New-Object System.Drawing.Point $size, $size

# Background Dark Blue
$cBg1 = [System.Drawing.Color]::FromArgb(255, 30, 27, 75)
$cBg2 = [System.Drawing.Color]::FromArgb(255, 2, 6, 23)
$bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush $p1, $p2, $cBg1, $cBg2

$g.FillEllipse($bgBrush, 8, 8, ($size - 16), ($size - 16))

# Outer Orbit Rings
$pen1 = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(220, 99, 102, 241)), 6
$pen2 = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(200, 236, 72, 153)), 4
$pen3 = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(200, 6, 182, 212)), 4

$g.DrawEllipse($pen1, 36, 36, 184, 184)
$g.TranslateTransform(128, 128)
$g.RotateTransform(-30)
$g.DrawEllipse($pen2, -95, -45, 190, 90)
$g.RotateTransform(60)
$g.DrawEllipse($pen3, -95, -45, 190, 90)
$g.ResetTransform()

# Central AI Core
$coreP1 = New-Object System.Drawing.Point 88, 88
$coreP2 = New-Object System.Drawing.Point 168, 168
$cCore1 = [System.Drawing.Color]::FromArgb(255, 168, 85, 247)
$cCore2 = [System.Drawing.Color]::FromArgb(255, 56, 189, 248)
$coreBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush $coreP1, $coreP2, $cCore1, $cCore2
$g.FillEllipse($coreBrush, 88, 88, 80, 80)

$innerBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 15, 23, 42))
$g.FillEllipse($innerBrush, 100, 100, 56, 56)

$sparkBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
$g.FillEllipse($sparkBrush, 116, 116, 24, 24)

# Satellites
$nodeBrush1 = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 56, 189, 248))
$nodeBrush2 = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 244, 63, 94))
$nodeBrush3 = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 129, 140, 248))

$g.FillEllipse($nodeBrush1, 50, 80, 16, 16)
$g.FillEllipse($nodeBrush2, 190, 160, 16, 16)
$g.FillEllipse($nodeBrush3, 120, 28, 14, 14)

$g.Dispose()

$assetsDir = Join-Path (Get-Location) "assets"
if (-not (Test-Path $assetsDir)) { New-Item -ItemType Directory -Path $assetsDir | Out-Null }

$pngPath = Join-Path $assetsDir "app-icon.png"
$icoPath = Join-Path $assetsDir "app-icon.ico"

$bmp.Save($pngPath, [System.Drawing.Imaging.ImageFormat]::Png)

$hIcon = $bmp.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($hIcon)
$fileStream = New-Object System.IO.FileStream $icoPath, ([System.IO.FileMode]::Create)
$icon.Save($fileStream)
$fileStream.Close()
$icon.Dispose()
$bmp.Dispose()

Write-Host "SUCCESS: Generated $icoPath and $pngPath"
