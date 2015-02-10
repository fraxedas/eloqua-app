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

    data.getApps = function(next) {
        database.getDb(function(err, db) {
            if(err){
                next(err, null);
            }else{
                //test if there is data
                db.apps.find().toArray(function (err, results){
                   if(err){
                        next(err, null);
                    }else{
                        next(null, results);
                    } 
                })
            }
        });
    };

    function seedDatabase() {
        database.getDb(function(err, db) {
            if(err){
                console.log("Failed to seed database:" + err);
            }else{
                //test if there is data
                db.apps.count(function(err, count) {
                    if(err){
                        console.log("Failed to get database count:" + err);
                    }else{
                        if(count == 0){
                            console.log("Seeding the Database ...");
                            seedData.initialApps.forEach(function(item) {
                                db.apps.insert(item, function(err) {
                                    if(err) console.log("Failed to get database count:" + err);
                                });
                            });
                        } else{
                            console.log("Database already seeded");
                        }
                    }
                });
            }
        });
    }

    seedDatabase();

})(module.exports);