(function(oauthController){

    var eloquaOauth = require("../lib/eloqua-oauth");
    var appId = 'id';
    var appSecret = 'oscar';
    
    oauthController.init = function(oauth){
		
		oauth.all("/oauth", function(req, res){
            var authorize = eloquaOauth.authorize({
                client_id: appId,
                client_secret: appSecret
            });
            res.statusCode = authorize.status;
            res.setHeader('Location', authorize.uri);
            res.end();
        });

        
        oauth.all("/callback", function(req, res){
            var authorize = eloquaOauth.authorize({
                client_id: appId,
                client_secret: appSecret
            });
            res.statusCode = authorize.status;
            res.setHeader('Location', authorize.uri);
            res.end();
        });
  
	};
})(module.exports);