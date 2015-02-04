(function(data){
	var seedData = require("./seedData");

    data.getNoteCategories = function(next) {
        next(null, seedData.initialNotes);
    };

    data.getActionRecordDefinition = function(next) {
        next(null, seedData.actionRecordDefinition);
    };

    data.getContentRecordDefinition = function(next) {
        next(null, seedData.contentRecordDefinition);
    };
})(module.exports);