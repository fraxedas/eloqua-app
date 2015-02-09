(function(database){
	var mongodb = require("mongodb");

    //local url or heroku
    var mongodbUrl = process.env.MONGOLAB_URI || "mongodb://localhost:27017/nebula"

    var theDb = null;

    database.getDb = function(next){
        if(!theDb){
            //connect to the database
            mongodb.MonoClient.connect(mongodbUrl, function(err, db){
                if(err){
                    next(err, null);
                }else{
                    theDb = {
                        db:db
                    };
                    next(null, theDb);
                }
            })
        }else{
            next(null, theDb);
        }
    };

})(module.exports);