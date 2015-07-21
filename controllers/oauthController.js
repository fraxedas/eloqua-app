(function(oauthController){

    var eloquaOauth = require("../lib/eloqua-oauth");
    var appId = 'id';
    var appSecret = 'oscar';
    
    oauthController.init = function(oauth){
		
		oauth.all("/oauth/:appId/:installId", function(req, res){
            var authorize = eloquaOauth.authorize({
                client_id: appId,
                redirect_uri: req.protocol + "://" + req.get('host') + '/callback/{appId}/{installId}',
                state: req.params.appId + ':' + req.params.installId
            });
            res.statusCode = authorize.status;
            res.setHeader('Location', authorize.uri);
            res.end();
        });

        
        oauth.all("/callback/:appId/:installId?code={code}&state={state}", function(req, res){
            var authenticate = {
                code: appId,
                client_secret: appSecret
            };
            res.statusCode = authorize.status;
            res.setHeader('Location', authorize.uri);
            res.end();
        });
  
	};
})(module.exports);