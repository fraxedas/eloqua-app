(function(homeController){
	homeController.init = function(app){
        var data = require("../data");

        app.all("/content/create", function (req, res) {
            data.getContentRecordDefinition(function (err, result) {
                res.send(result);
            });
        });

        app.all("/content/copy", function (req, res) {
            res.send({ name : "Oscar Fraxedas", isValid: true });
        });

        app.delete("/content/delete", function (req, res) {
            res.send({ name : "Oscar Fraxedas", isValid: true });
        });

        app.get("/content/configure", function (req, res) {
            res.render("configure", { title: "Service configuration"});
        });

        app.all("/content/notify", function (req, res) {
            res.render("notify", { title: "Service notification" });
        });
	};
})(module.exports);