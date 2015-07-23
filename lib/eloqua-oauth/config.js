(function(config){
	
    var login = 'https://login.eloqua.com/';
    config.token_url = login + 'auth/oauth2/token'; 
    config.authorize_url  = login + 'auth/oauth2/authorize';
    
    if(process.env.NODE_ENV == 'dev'){
        console.log('running dev config');
        config.proxy  = 'http://127.0.0.1:8888';
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    }
    
})(module.exports);