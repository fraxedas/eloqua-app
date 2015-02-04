(function(applicationController){

    applicationController.init = function(app){
		
		app.post("/app/enable", function(req, res){
            res.send({ name : "Oscar Fraxedas", isValid: true });
        });

        app.get("/app/status", function (req, res) {
            res.send({ message : "I'm alive" });
        });

        app.get("/app/callback", function (req, res) {
            res.ok();
        });
	};
})(module.exports);