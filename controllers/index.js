(function(controllers) {
    var homeController = require('./homeController');
    var actionController = require('./actionController.js');
    var contentController = require('./contentController.js');
    var applicationController = require('./applicationController.js');
    var menuController = require('./menuController.js');
    var echoController = require('./echoController.js');
    
    controllers.init = function (app){
        homeController.init(app);
        actionController.init(app);
        contentController.init(app);
        applicationController.init(app);
        menuController.init(app);
        echoController.init(app);
    }
})(module.exports);