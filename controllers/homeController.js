(function(homeController){
	var data = require("../data");
	homeController.init = function(app){
		
		app.get("/", function(req, res){
			data.getEndpoints(function (err, result) {
				var url = req.protocol + "://" + req.get('host')
                res.render("index", {title: "CloudApp to integrate with Eloqua", endpoints: result, root: url});
            });
		});

		app.get("/apps", function(req, res){
			data.getApps(function (err, result) {
				res.render("apps", {title: "Applications", apps: result});
            });
		});

		app.get("/author", function(req, res){
			res.send({name : "Oscar Fraxedas", isValid: true});
		});
	};
})(module.exports);