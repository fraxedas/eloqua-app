(function(echoController){
    echoController.init = function(app){
        app.all("/echo/:status/:echo", function (req, res) {
            res.status(req.params.status).send(req.params.echo);
        });
	};
})(module.exports);