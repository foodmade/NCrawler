(function(){

    var _VER = '1.0.0';
    var _INDEX = 2;
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

        var _JD_AD_TYPE_PROMOCATE = '1755';

        var items =[];

        try{


            var resObj = doStringToJSObject(htmlString);

            if((resObj[_JD_AD_TYPE_PROMOCATE] == null || resObj[_JD_AD_TYPE_PROMOCATE] == undefined)){
                result.state = -1;
            }else{

                var obj = resObj[_JD_AD_TYPE_PROMOCATE];

                for(var i = 0; i < obj.length; ++i){
                    items.push({
                        skuId:obj[i].sku_id,
                        skuTitle:obj[i].ad_title,
                        shopId:obj[i].shop_id,
                    });
                }

                result.state = 1;

            }


        }catch(exp){
            res.state = -2;
            log('Do parse exp:' + exp.message);
            log('Do parse exp:' + exp.stack);
        }


        return items;

    }

    function doStringToJSObject(hitString){

        try{

            var sharedParam = {pageConfig:null};
            var code = '(function(){ function jQuery2449576(a){ return a;} obj=' + hitString + '; })();';
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
        result.items = doParse(htmlString);
        if(result.state < 0){
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