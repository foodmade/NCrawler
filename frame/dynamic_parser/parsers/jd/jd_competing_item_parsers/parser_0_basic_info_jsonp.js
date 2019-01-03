(function(){

    var _VER = '1.0.0';
    var _INDEX = 0;
    var _TYPE = 'jd:competing_item_info_jsonp';


    parserInfo.index = _INDEX;
    parserInfo.ver = _VER;
    parserInfo.type = _TYPE;

    var _RETCODE_SUCCESS = 1;
    var _RETCODE_ERROR = -1;

    function log(log, level){
        utils.log('{DParser JD Basic Info Jsonp  ' + _INDEX + '(ver:' + _VER + ')} ' + log, level);
    }

    function parseJsonp(htmlString){
        var res = {
            basic_info:{}
        };

        try{

            var reg = /\((.*)\)/g;
            var targ = (htmlString.match(reg))[0];

            targ = targ.replace(/^\(+|\)+$/g, '');


            var rspJsonObj = JSON.parse(targ);

            if(!rspJsonObj.master){
                res.state = 0;
            }else{
                res.basic_info.title = rspJsonObj.master.name;
                res.basic_info.price = rspJsonObj.master.price;
                res.basic_info.skuid = rspJsonObj.master.skuid;
                res.basic_info.sort = rspJsonObj.master.sort;
                res.basic_info.pic = rspJsonObj.master.pic;

                res.state = 1;
            }

        }catch(exp){
            res.state = 0;
            log('Parsing jsonp exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
            log('Parsing jsonp exception:' + exp.stack, config.LOG._LOG_LEVEL_ERROR);
        }

        return res;
    }


    try{

        log('Html check:' + htmlString, config.LOG._LOG_LEVEL_DEBUG);
        /*
        result.handler = _INDEX;
        result.res = parseJsonp(htmlString);
        if(result.res.state != 1){
            result.retcode = _RETCODE_ERROR;
        }else{
            result.retcode = _RETCODE_SUCCESS;
        } */

        result.retcode = _RETCODE_ERROR;

        log('Parsed result check:' + JSON.stringify(result),
            config.LOG._LOG_LEVEL_WARNING);

    }catch(exp){
        log('Parsing exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
    }

})();




