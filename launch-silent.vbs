Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
strScriptPath = fso.GetParentFolderName(WScript.ScriptFullName)
WshShell.CurrentDirectory = strScriptPath
electronExe = strScriptPath & "\node_modules\electron\dist\electron.exe"
mainScript = strScriptPath & "\electron\main.mjs"
If fso.FileExists(electronExe) Then
    WshShell.Run """" & electronExe & """ """ & mainScript & """", 1, False
Else
    WshShell.Run "cmd /c npx electron electron/main.mjs", 1, False
End If
