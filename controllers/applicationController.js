(function(applicationController){

    var data = require("../data");
    
    applicationController.init = function(app){
		
		app.post("/app/enable", function(req, res){
            res.send({ name : "Oscar Fraxedas", isValid: true });
        });

        app.get("/app/status", function (req, res) {
            res.send({ message : "I'm alive" });
        });

        app.get("/app/callback", function (req, res) {
            res.send();
        });

        app.get("/apps", function(req, res){
            data.getApps(function (err, result) {
                res.render("apps", 
                {
                    title: "Applications", 
                    apps: result, 
                    error: req.flash("newAppError")
                });
            });
        });

        app.post("/apps", function(req, res){
            var name = req.body.name;
            var description = req.body.description;
            
            data.createApp(name, description, function (err) {
                if(err){
                    console.log(err);     
                    req.flash("newAppError", err);
                    res.redirect("/apps");
                }else{
                    res.redirect("/apps");
                    //res.redirect("/services/" + name);
                }
            });
        });
	};
})(module.exports);