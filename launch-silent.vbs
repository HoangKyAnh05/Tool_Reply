Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
strScriptPath = fso.GetParentFolderName(WScript.ScriptFullName)
WshShell.CurrentDirectory = strScriptPath
' 0 = Hide window (Runs completely silently in background without terminal popup)
WshShell.Run "cmd /c npm run electron:dev", 0, False
