(function(actionController){
    actionController.init = function(app){
        var data = require("../data");

		app.all("/action/create", function(req, res){
            data.getActionRecordDefinition(function (err, result) {
                res.send(result);
            });
        });

        app.post("/action/copy", function (req, res) {
            data.getActionRecordDefinition(function (err, result) {
                res.send(result);
            });
        });

        app.delete("/action/delete", function (req, res) {
            res.status(204).send();
        });

        app.get("/action/configure", function (req, res) {
            res.render("configure", { title: "Service configuration"});
        });
        
        app.all("/action/notify", function (req, res) {
            res.status(204).send();
        });
	};
})(module.exports);