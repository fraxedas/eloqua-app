CALL service_variables

REM Pre
REM bitsadmin /transfer mydownloadjob  /download /priority normal %MONGO_URL% %MONGO_INSTALLER%

REM Act
msiexec.exe /quiet /i %MONGO_INSTALLER_PATH% INSTALLLOCATION="%MONGO_DIR%"

REM Post
service_create
