var config = require('../config/config');
var utils = require('./utils');


module.exports = {
    init:function(options){

    },
    route:function (handler, pathname) {

        if(pathname == '/start'){
            return handler.start(pathname);
        }else if(pathname == '/stop'){
            return handler.stop(pathname);
        }else if(pathname == '/state'){
            return handler.state();
        }else if(pathname == '/restart'){
            return handler.restart();
        }
        else{
            utils.log("No request handler found for " + pathname, config.LOG._LOG_LEVEL_ERROR);
            return 'f**k u, man:)';
        }
        return '';
    }
};