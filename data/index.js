(function(data){
	var seedData = require("./seedData");
    var database = require("./database");

    data.getActionRecordDefinition = function(next) {
        next(null, seedData.actionRecordDefinition);
    };

    data.getContentRecordDefinition = function(next) {
        next(null, seedData.contentRecordDefinition);
    };

    data.getEndpoints = function(next) {
        next(null, seedData.endpoints);
    };

    function seedDatabase(){

    };

    seedDatabase();

})(module.exports);