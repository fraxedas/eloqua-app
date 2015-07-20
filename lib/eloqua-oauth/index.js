(function(oauth){
	var qs = require('querystring');
    var request = require('request');
    var persist = require('node-persist');
    persist.initSync();
    
    var authorize_url = 'https://login.eloqua.com/auth/oauth2/authorize';
    var token_url = 'https://login.eloqua.com/auth/oauth2/token';

    oauth.authorize  = function(authenticate, next) {
        var parameters = qs.stringify({
            response_type: 'code',
            client_id: authenticate.client_id,
            redirect_uri: authenticate.redirect_uri,
            scope: 'full',
            state: 'installing'
            });
        var uri = (authenticate.authorize_url || authorize_url) + '?' + parameters;
        next(uri, 302);
    };
    
    oauth.grant  = function(authenticate, next) {
        var body = {
            grant_type: 'authorization_code',
            code: authenticate.code,
            redirect_uri: authenticate.redirect_uri
            };
        getToken(authenticate, next, body);
    };
    
    oauth.access_header  = function() {
        var access_token = persist.getItem('oauth').access_token;
        return {'Authorization': 'Bearer ' + access_token};
    };
    
    oauth.refresh  = function(authenticate, next) {
        var body = {
            grant_type: 'refresh_token',
            refresh_token: persist.getItem('oauth').refresh_token,
            scope: 'full',
            redirect_uri: authenticate.redirect_uri
            };
        getToken(authenticate, next, body);
    };
    
    var getToken  = function(authenticate, next, body) {
        var uri = (authenticate.token_url || token_url);
        var credentials = new Buffer(authenticate.client_id + ':' + authenticate.client_secret).toString('base64');
        var options = {
          url: uri,
          headers: {
            'Authorization': 'Basic ' + credentials
          },
          body: body
        };
        request.post(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                persist.setItem('oauth',body);
            }else{
                console.log(error);
                next(error, null);
            }
        });
    };
    

})(module.exports);