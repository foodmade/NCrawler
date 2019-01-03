var http = require("http");
var url = require("url");
var utils = require('./utils');
var config = require('../config/config');
var domain = require('domain');


function start(router, handler) {




    http.createServer(onRequest).listen(config.SERVER.port);
    utils.log('-----------------Crawler(General, atom, OO) sever{' + config.SERVER.id + '} started:' + config.SERVER.port + '---------------------', config.LOG._LOG_LEVEL_ERROR);


    ////////////////////////////////////////////////////////////////
    function onRequest(request, response) {

        var args = url.parse(request.url, true).query;
        var pathname = url.parse(request.url).pathname;

        utils.log('Vistor IP addr:' + getClientIp(request), config.LOG._LOG_LEVEL_ERROR);
        utils.log('Vistor access TOKEN:' + args.token, config.LOG._LOG_LEVEL_ERROR);

        if(validatingIP(getClientIp(request)) == false){
            utils.log('Vistor access denied:' + getClientIp(request), config.LOG._LOG_LEVEL_ERROR);
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write("Access deny.");
            response.end();
            return;
        }

        var retdata = router.route(handler, pathname);



        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(JSON.stringify(retdata));
        response.end();

        //////////////////////////////////////////////////////////
        function getClientIp(req) {
            /*
            return req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress; */

            var ipAddress;
            var headers = req.headers;
            var forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
            forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
            if (!ipAddress) {
                ipAddress = req.connection.remoteAddress;
            }
            return ipAddress;
        }

        /*
        var dm = domain.create();

        dm.run(function(){
            var pathname = url.parse(request.url).pathname;
            var retdata = router.route(handler, pathname);

            utils.log(getClientIp(request), config.LOG._LOG_LEVEL_ERROR);

            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(JSON.stringify(retdata));
            response.end();

            //////////////////////////////////////////////////////////
            function getClientIp(req) {
                return req.headers['x-forwarded-for'] ||
                    req.connection.remoteAddress ||
                    req.socket.remoteAddress ||
                    req.connection.socket.remoteAddress;
            }
        });

        dm.on('error', function(err) {
            utils.log('Sever module exception handler:' + err.message, config.LOG._LOG_LEVEL_ERROR);
        }); */


    }



    //////////////////////////////////////////////////////////
    function getClientIp(req) {
        return req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
    }

    /////////////////////////////////////////////////////////
    function validatingIP(srcIP){
        try{

            if(!config.SERVER.accessControl || !config.SERVER.accessControl.ipWhiteList ||  config.SERVER.accessControl.ipWhiteList.length <= 0){
                return true;
            }

            for(var i = 0; i < config.SERVER.accessControl.ipWhiteList.length; ++i){
                if(srcIP == config.SERVER.accessControl.ipWhiteList[i]){
                    return true;
                }

                if(config.SERVER.accessControl.ipWhiteList[i] == '*'){
                    return true;
                }
            }

        }catch(exp){

        }
        return false;
    }
}

exports.start = start;