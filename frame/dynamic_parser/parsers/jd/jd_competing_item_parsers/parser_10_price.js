(function(){

    var _VER = '1.0.0';
    var _INDEX = 10;
    var _TYPE = 'jd:competing_price';


    parserInfo.index = _INDEX;
    parserInfo.ver = _VER;
    parserInfo.type = _TYPE;

    var _RETCODE_SUCCESS = 1;
    var _RETCODE_ERROR = -1;

    function log(log, level){
        utils.log('{DParser JD Price  ' + _INDEX + '(ver:' + _VER + ')} ' + log, level);
    }

    function parseJsonp(htmlString){
        var res = {
        };

        try{

            log('string:' + htmlString, config.LOG._LOG_LEVEL_WARNING);

            var resObj = doStringToJSObject(htmlString);

            if(!resObj || resObj.length <= 0){
                res.state = 0;
            }else{

                res.price = resObj[0].p;
                res.m = resObj[0].m;

                res.state = 1;
            }

        }catch(exp){
            res.state = 0;
            log('Parsing jsonp exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
        }

        return res;
    }


    function doStringToJSObject(hitString){

        try{

            var sharedParam = {pageConfig:null};
            var code = '(function(){ function cnp(a){ return a;} obj=' + hitString + '; })();';
            var script = vm.createScript(code);
            script.runInNewContext(sharedParam);

        }catch(exp){
            log('doStringToJSObject exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
            log('doStringToJSObject exception:' + exp.stack, config.LOG._LOG_LEVEL_ERROR);
        }
        return sharedParam.obj;
    }


    try{

        log('Html check:' + htmlString, config.LOG._LOG_LEVEL_DEBUG);
        result.handler = _INDEX;
        result.res = parseJsonp(htmlString);
        if(result.res.state != 1){
            result.retcode = _RETCODE_ERROR;
        }else{
            result.retcode = _RETCODE_SUCCESS;
        }

        log('Parsed result check:' + JSON.stringify(result),
            config.LOG._LOG_LEVEL_WARNING);

    }catch(exp){
        log('Parsing exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
    }

})();




