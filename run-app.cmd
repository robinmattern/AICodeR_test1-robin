@echo off

    title FormR AIApps

    set  DIR=%~dp0
    set  CLIENT_PORT=61324&  bash %DIR%killport.sh %CLIENT_PORT% >NUL
    set  UPLOAD_PORT=31314&  bash %DIR%killport.sh %UPLOAD_PORT% >NUL
    set  SERVER_PORT=31323&  bash %DIR%killport.sh %SERVER_PORT% >NUL

rem --------------------------------------------------------------

                                        cd  %DIR%server1\s14_python-uploader-api
    start /B ""  %DIR%server\run-server.cmd     %SERVER_PORT%
rem                                     cd ..\../server2\c23_summarize-video-api
rem start /B ""  %DIR%server\run-server.cmd     %SERVER_PORT%
                                        cd ..\../client2\c24_floating-boxes-app
    start /B ""  %DIR%client\run-client.cmd     %CLIENT_PORT%  >NUL
                                        cd ..\..\
    explorer     http://localhost:%CLIENT_PORT%

rem --------------------------------------------------------------

    pause >NUL
