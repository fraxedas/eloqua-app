CALL service_variables

REM Pre
CALL service_stop

REM Act
sc.exe delete %MONGO_SERVICE%
