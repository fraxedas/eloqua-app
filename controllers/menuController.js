(function(menuController){
    menuController.init = function(app){
        var data = require("../data");

        app.get("/menu/notify", function (req, res) {
            res.render("menu", { title: "Menu service", params: req.url});
        });
	};
})(module.exports);