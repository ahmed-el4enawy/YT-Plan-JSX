Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "c:\Users\BlistKai\Downloads\Projects\YT Plan JSX"
WshShell.Run "cmd /c npm run app", 0, False
