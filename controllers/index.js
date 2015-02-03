(function(controllers){
	homeController = require("./homeController");
	
	controllers.init = function(app){
		homeController.init(app)
	}
})(module.exports);