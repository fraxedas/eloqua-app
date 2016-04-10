(function(oauthController){

    var persist = require('node-persist');
    persist.initSync();
    var eloqua = require('eloqua-oauth');
    var redirect = 'https://eloqua-app.herokuapp.com/callback';
    
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
            var uri = eloqua.authorize_uri(appId, redirect, installId);
            console.log(uri);
            res.redirect(uri);
        });

        
        oauth.all("/callback", function(req, res){
            var installId = req.query.state;
            var item = persist.getItem(installId);
            var appId = item.appId;
            var callback = item.callback;
            var client_secret = persist.getItem(appId);
            var code = req.query.code;
            
            eloqua.grant(appId, client_secret, code, redirect, function (error, body) {
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