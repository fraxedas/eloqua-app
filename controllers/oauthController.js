(function(oauthController){

    var persist = require('node-persist');
    persist.initSync();
    var eloquaOauth = require("../lib/eloqua-oauth");
    
    oauthController.init = function(oauth){
		
		oauth.all("/oauth/:appId/:installId", function(req, res){
            eloquaOauth.authorize({
                client_id: req.params.appId,
                redirect_uri: "https://" + req.get('host') + '/callback/{appId}/{installId}',
                state: req.params.installId
            }, function (uri, status) {
                res.set('Location', uri).status(status).send();
            });
        });

        
        oauth.all("/callback/:appId/:installId", function(req, res){
            var appId = req.params.appId;
            var client_secret = persist.getItem(req.params.appId);
            var code = req.query.code;
            var state = req.query.state;
            console.log(state);
            
            var authenticate = {
                code: code,
                redirect_uri: "https://" + req.get('host') + '/callback/{appId}/{installId}',
                client_secret: client_secret
            };
            eloquaOauth.grant(authenticate, function (error, body) {
                if (error) {
                    res.render("error", 
                    {
                        title: "Oauth error", 
                        body: body, 
                        error: error
                    });
                }else{
                    persist.setItem(appId + '_oauth',body);
                    res.redirect("/oauth/" + appId);
                }
            });
        });
        
        oauth.post("/secret/:appId/:appSecret", function(req, res){
            var appId = req.params.appId;
            var appSecret = req.params.appSecret;
            persist.setItem(appId,appSecret);
                    
            res.redirect("/secret/" + appId);
        });
        
        oauth.get("/secret/:appId", function(req, res){
            var appId = req.params.appId;
                    
            res.send({
                appId: appId,
                appSecret: persist.getItem(appId)
            });
        });
        
        oauth.get("/oauth/:appId", function(req, res){
            var appId = req.params.appId;
                    
            res.send({
                appId: appId,
                oauth: persist.getItem(appId + '_oauth')
            });
        });
  
	};
})(module.exports);