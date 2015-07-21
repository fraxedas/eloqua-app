CALL service_variables

REM Pre
service_delete

REM Act
msiexec.exe /q /uninstall %MONGO_INSTALLER_PATH%

REM Post
mongo_clean