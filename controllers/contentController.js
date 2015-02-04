(function(homeController){
	homeController.init = function(app){
        var data = require("../data");

		app.get("/service/create", function(req, res){
            data.getActionRecordDefinition(function (err, result) {
                res.send(result);
            });
        });

        app.get("/service/create/content", function (req, res) {
            data.getContentRecordDefinition(function (err, result) {
                res.send(result);
            });
        });

        app.post("/service/copy", function (req, res) {
            res.send({ name : "Oscar Fraxedas", isValid: true });
        });

        app.delete("/service/delete", function (req, res) {
            res.send({ name : "Oscar Fraxedas", isValid: true });
        });

        app.get("/service/configure", function (req, res) {
            res.render("configure", { title: "Service configuration"});
        });
	};
})(module.exports);