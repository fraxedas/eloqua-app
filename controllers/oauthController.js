(function(oauthController){

    var persist = require('node-persist');
    persist.initSync();
    var eloquaOauth = require("../lib/eloqua-oauth");
    
    oauthController.init = function(oauth){
		
		oauth.all("/oauth/:appId/:installId", function(req, res){
            var appId = req.params.appId;
            var installId = req.params.installId;
            var callback = req.query.callback;
            
            persist.setItem(installId,
                {
                    appId: appId,
                    callback: callback
                });                    
            eloquaOauth.authorize({
                client_id: appId,
                redirect_uri: "https://" + req.get('host') + '/callback',
                state: installId
            }, function (uri) {
                res.redirect(uri);
            });
        });

        
        oauth.all("/callback", function(req, res){
            var installId = req.query.state;
            var item = persist.getItem(installId);
            var appId = item.appId;
            var callback = item.callback;
            var client_secret = persist.getItem(appId);
            var code = req.query.code;
            
            var authenticate = {
                code: code,
                redirect_uri: "https://" + req.get('host') + '/callback',
                client_id: appId,
                client_secret: client_secret
            };
            eloquaOauth.grant(authenticate, function (error, body) {
                persist.setItem(appId + '_oauth', body);                    
                if (error) {
                    res.render("error", 
                    {
                        title: "Oauth error", 
                        body: body, 
                        error: error
                    });
                }else{
                    res.redirect(callback);
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