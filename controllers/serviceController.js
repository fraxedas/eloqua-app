(function(serviceController){
    serviceController.init = function(app){
        var data = require("../data");

		app.get("/service/create", function(req, res){
            data.getActionRecordDefinition(function (err, result) {
                res.send(result);
            });
        });

        app.post("/service/copy", function (req, res) {
            data.getActionRecordDefinition(function (err, result) {
                res.send(result);
            });
        });

        app.delete("/service/delete", function (req, res) {
            res.status(204).send();
        });

        app.get("/service/configure", function (req, res) {
            res.render("configure", { title: "Service configuration"});
        });
	};
})(module.exports);