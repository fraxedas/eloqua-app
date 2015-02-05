(function(data){
	var seedData = require("./seedData");

    data.getActionRecordDefinition = function(next) {
        next(null, seedData.actionRecordDefinition);
    };

    data.getContentRecordDefinition = function(next) {
        next(null, seedData.contentRecordDefinition);
    };
})(module.exports);