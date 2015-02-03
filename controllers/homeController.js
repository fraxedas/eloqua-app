(function(homeController){
	var data = require("../data");

	homeController.init = function(app){
		
		app.get("/", function(req, res){
			data.getNoteCategories(function(err, result){
				res.render("index", {title: "Express + Vash", error: err, categories: result});
			});
			
		});

		app.get("/user", function(req, res){
			res.send({name : "Oscar Fraxedas", isValid: true});
		});
	};
})(module.exports);