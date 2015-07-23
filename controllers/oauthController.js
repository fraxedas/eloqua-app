(function(oauthController){

    var eloquaOauth = require("../lib/eloqua-oauth");
    var appId = 'id';
    var appSecret = 'oscar';
    
    oauthController.init = function(oauth){
		
		oauth.all("/oauth/:appId/:installId", function(req, res){
            eloquaOauth.authorize({
                client_id: appId,
                redirect_uri: req.protocol + "://" + req.get('host') + '/callback/{appId}/{installId}',
                state: req.params.appId + ':' + req.params.installId
            }, function (uri, status) {
                res.set('Location', uri).status(status).send();
            });
        });

        
        oauth.all("/callback/:appId/:installId", function(req, res){
            var authenticate = {
                code: req.query.code,
                redirect_uri: req.protocol + "://" + req.get('host') + '/callback/{appId}/{installId}',
                client_secret: appSecret
            };
            eloquaOauth.grant(authenticate, function (error, body) {
                if (error) {
                    //redirect to error
                }else{
                    //redirect to catalogs
                }
            });
        });
  
	};
})(module.exports);