CALL service_variables

REM Act
mkdir %DATA_DIR%
mkdir %LOG_DIR%

ECHO Creating the config file
echo logpath=%LOG_DIR%\mongod.log > "%MONGO_DIR%\mongod.cfg"
echo dbpath=%DATA_DIR% >> "%MONGO_DIR%\mongod.cfg"

ECHO Creating the service
sc.exe create MongoDB binPath= "\"%MONGO_DIR%\bin\mongod.exe\" --service --config=\"%MONGO_DIR%\mongod.cfg"" DisplayName= "%MONGO_SERVICE%" start= "auto"

REM Post
CALL service_start
