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
                db.apps.find().sort({name: 1}).toArray(function (err, results){
                   if(err){
                        next(err, null);
                    }else{
                        next(null, results);
                    } 
                })
            }
        });
    };

    data.getApp = function(name, next) {
        database.getDb(function(err, db) {
            if(err){
                next(err);
            }else{
                db.apps.findOne({name: name}, next);
            }
        });
    };

    data.clearApps = function(next) {
        database.getDb(function(err, db) {
            if(err){
                next(err, null);
            }else{
                //test if there is data
                db.apps.drop(function (err){
                   if(err){
                        next(err);
                    }else{
                        next(null);
                    } 
                })
            }
        });
    };

    data.createApp = function(name, description, next) {
        database.getDb(function(err, db) {
            if(err){
                next(err);
            }else{
                db.apps.find({name: name}).count(function(err, count){
                    if(err){
                        next(err);
                    }else{
                        if(count != 0){
                            next("App already exist");
                        }else {
                            var app = {
                                name: name,
                                description: description,
                                services: []
                            };
                            db.apps.insert(app, function (err){
                               if(err){
                                    next(err);
                                }else{
                                    next(null);
                                } 
                            })
                        }
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