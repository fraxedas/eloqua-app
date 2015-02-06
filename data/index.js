(function(data){
	var seedData = require("./seedData");

    data.getActionRecordDefinition = function(next) {
        next(null, seedData.actionRecordDefinition);
    };

    data.getContentRecordDefinition = function(next) {
        next(null, seedData.contentRecordDefinition);
    };

    data.getEndpoints = function(next) {
        next(null, seedData.endpoints);
    };
})(module.exports);