(function(controllers) {
    var homeController = require("./homeController");
    var serviceController = require('./serviceController.js');
    var applicationController = require('./applicationController.js');
    
    controllers.init = function (app){
        homeController.init(app);
        serviceController.init(app);
        applicationController.init(app);
    }
})(module.exports);