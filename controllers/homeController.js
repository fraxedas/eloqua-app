(function(homeController){

	homeController.init = function(app){
		
		app.get("/", function(req, res){
			res.render("index", {title: "CloudApp to integrate with Eloqua"});
		});

		app.get("/author", function(req, res){
			res.send({name : "Oscar Fraxedas", isValid: true});
		});
	};
})(module.exports);