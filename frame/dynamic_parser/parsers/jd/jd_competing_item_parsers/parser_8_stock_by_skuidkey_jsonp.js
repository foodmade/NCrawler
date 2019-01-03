(function(){

    var _VER = '1.0.0';
    var _INDEX = 8;
    var _TYPE = 'jd:parser_8_stock_by_skuidkey_jsonp';


    parserInfo.index = _INDEX;
    parserInfo.ver = _VER;
    parserInfo.type = _TYPE;

    var _RETCODE_SUCCESS = 1;
    var _RETCODE_ERROR = -1;

    function log(log, level){
        utils.log('{DParser ' + _TYPE + _INDEX + '(ver:' + _VER + ')} ' + log, level);
    }


    function doParse(htmlString){
        var res = {

        };

        try{


            var resObj = doStringToJSObject(htmlString);

            if(resObj.stock == null || resObj.stock == undefined){
                res.state = -1;
            }else{
                res.stockStateCode = resObj.stock.StockState;
                res.stockStateName = resObj.stock.StockStateName;
                switch(res.stockStateCode){
                    case 34:
                        res.isStocking = 0;
                        res.state = 0;
                        break;
                    case 33:
                        res.isStocking = 1;
                        res.state = 1;
                        break;
                    default :
                        res.isStocking = 0;
                        res.state = 0;
                }
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
            var code = '(function(){ function getStockCallback(a){ return a;} obj=' + hitString + '; })();';
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




