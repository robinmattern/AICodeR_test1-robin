
Set oShell = CreateObject("WScript.Shell")
oShell.Run("""C:\windows\explorer.exe")
WScript.Sleep 1000
oShell.AppActivate "Explorer"

WScript.Sleep 500
oShell.SendKeys "%d"
WScript.Sleep 300
oShell.SendKeys "E:\Repos\Robin\AIObjs_\dev02-robin"
WScript.Sleep 300
oShell.SendKeys "{ENTER}"

WScript.Sleep 500
oShell.SendKeys "^t"

WScript.Sleep 300
oShell.SendKeys "%d"
WScript.Sleep 300
oShell.SendKeys "E:\Repos\Robin\AIObjs_\._\DOCs\Models"
WScript.Sleep 300
oShell.SendKeys "{ENTER}"

