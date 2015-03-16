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
                    error: req.flash("appError")
                });
            });
        });

        app.get("/apps/:name", function(req, res){
            var name = req.params.name;
            data.getApp(name, function (err, result) {
                res.render("app", 
                {
                    title: name,
                    app: result
                });
            });
        });

        app.get("/apps/clear", function(req, res){
            data.clearApps(function (err) {
                if(err){
                    console.log(err);     
                    req.flash("appError", err);
                }
                res.redirect("/apps");
            });
        });

        app.post("/apps", function(req, res){
            var name = req.body.name;
            var description = req.body.description;
            
            data.createApp(name, description, function (err) {
                if(err){
                    console.log(err);     
                    req.flash("appError", err);
                    res.redirect("/apps");
                }else{
                    res.redirect("/apps");
                }
            });
        });

        app.get("/api/apps/:name", function(req, res){
            var name = req.params.name;

            data.getApp(name, function (err, result) {
                if(err){
                    res.send(500, err);
                }else{
                    res.set("Content-Type", "application/json");
                    res.send(result);    
                }
            });
        });

        app.post("/api/apps/:name/services", function(req, res){
            var name = req.params.name;

            var service = {
                name: req.body.name,
                type: req.body.type
            };
            
            data.addService(name, service, function (err) {
                if(err){
                    console.log(err); 
                    res.send(500, err);
                }else{
                    res.set("Content-Type", "application/json");
                    res.status(201).send(service);
                }
            });
        });
	};
})(module.exports);