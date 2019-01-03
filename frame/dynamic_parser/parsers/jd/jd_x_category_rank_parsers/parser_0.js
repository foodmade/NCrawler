(function(){

    var _VER = '1.0.0';
    var _INDEX = 0;
    var _TYPE = 1;


    parserInfo.index = _INDEX;
    parserInfo.ver = _VER;
    parserInfo.type = _TYPE;


    var _RETCODE_SUCCESS = 1;
    var _RETCODE_ERROR = -1;


    function log(log, level){
        utils.log('{DParser ' + _TYPE + _INDEX + '(ver:' + _VER + ')} ' + log, level);
    }


    function doParse(htmlString){

        var _JD_AD_TYPE_RMTJ = '46';

        var res = {

        };

        try{


            var resObj = doStringToJSObject(htmlString);

            if((resObj[_JD_AD_TYPE_RMTJ] == null || resObj[_JD_AD_TYPE_RMTJ] == undefined)){
                res.state = -1;
            }else{

                var rmtj = resObj[_JD_AD_TYPE_RMTJ];

                res.rmtj = [];

                for(var i = 0; i < rmtj.length; ++i){
                    res.rmtj.push({
                        sku_id:rmtj[i].sku_id,
                        ad_title:rmtj[i].ad_title,
                        shop_id:rmtj[i].shop_id,
                        vender_id:rmtj[i].vender_id
                    });
                }

                res.state = 1;


            }


        }catch(exp){
            res.state = -2;
            log('Do parse exp:' + exp.message);
            log('Do parse exp:' + exp.stack);
        }


        return res;

    }

    function doStringToJSObject(hitString){

        try{

            var sharedParam = {pageConfig:null};
            var code = '(function(){ function jQuery6173591(a){ return a;} obj=' + hitString + '; })();';
            var script = vm.createScript(code);
            script.runInNewContext(sharedParam);

        }catch(exp){
            log('doStringToJSObject exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
            log('doStringToJSObject exception:' + exp.stack, config.LOG._LOG_LEVEL_ERROR);
        }
        return sharedParam.obj;
    }


    try{

        log('Html check:' + htmlString, config.LOG._LOG_LEVEL_WARNING);

        result.handler = _INDEX;
        result.res = doParse(htmlString);
        if(result.res.state < 0){
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