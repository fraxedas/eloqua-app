///Implements the Eloqua oauth flow described at:
///http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCAB/index.html#Developers/GettingStarted/Authentication/authenticate-using-oauth.htm%3FTocPath%3DGetting%2520started%2520with%2520Oracle%2520Eloqua%2520APIs%7CAuthentication%7C_____2

(function(oauth){
	var qs = require('querystring');
    var request = require('request');
    var config = require('./config');
    
    oauth.authorize  = function(authorize, next) {
        var parameters = qs.stringify({
            client_id: authorize.client_id,
            redirect_uri: authorize.redirect_uri,
            state: authorize.state,
            response_type: 'code',
            scope: 'full'
            });
        var uri = config.authorize_url + '?' + parameters;
        return next(uri, 302);
    };
    
    oauth.grant  = function(authenticate, next) {
        var body = {
            grant_type: 'authorization_code',
            code: authenticate.code,
            redirect_uri: authenticate.redirect_uri
            };
        getToken(authenticate, next, body);
    };
    
    oauth.refresh  = function(authenticate, next) {
        var body = {
            grant_type: 'refresh_token',
            refresh_token: authenticate.refresh_token,
            scope: 'full',
            redirect_uri: authenticate.redirect_uri
            };
        getToken(authenticate, next, body);
    };
    
    var getToken  = function(authenticate, next, body) {
        var credentials = new Buffer(authenticate.client_id + ':' + authenticate.client_secret).toString('base64');
        var options = {
          url: config.token_url,
          headers: {
            'Authorization': 'Basic ' + credentials
          },
          json: body,
          proxy: config.proxy
        };
        request.post(options, function (error, response, body) {
            console.log(body);
            if (!error && response.statusCode < 400 && body.refresh_token && body.access_token) {
                next(null, body);
            }else{
                next(error || 'Oauth flow failed', null);
            }
        });
    };
    
    oauth.access_header  = function(access_token) {
        return {'Authorization': 'Bearer ' + access_token};
    };

})(module.exports);