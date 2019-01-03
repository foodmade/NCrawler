(function(){

    var _VER = '1.0.0';
    var _INDEX = 3;
    var _TYPE = 'jd:competing_shop_info_jsonp';


    parserInfo.index = _INDEX;
    parserInfo.ver = _VER;
    parserInfo.type = _TYPE;

    var _RETCODE_SUCCESS = 1;
    var _RETCODE_ERROR = -1;

    function log(log, level){
        utils.log('{DParser JD Shop Info Jsonp  ' + _INDEX + '(ver:' + _VER + ')} ' + log, level);
    }

    function parseJsonp(dataBuff){

        var htmlString = iconv.decode(dataBuff, 'gb2312').toString();

        var res = {
            shop_info:{}
        };

        try{

            var reg = /\((.*)\)/g;
            var targ = (htmlString.match(reg))[0];

            targ = targ.replace(/^\(+|\)+$/g, '');

            var rspJsonObj = JSON.parse(targ);

            if(!rspJsonObj.vender){
                res.state = 0;
            }else{
                res.shop_info = {};
                res.shop_info.shop_name = rspJsonObj.vender;
                res.shop_info.shop_loc = rspJsonObj.df;
                res.shop_info.shop_url = rspJsonObj.url;
                res.shop_info.is_pop = rspJsonObj.po;
                res.shop_info.vid = rspJsonObj.vid;
                res.shop_info.shop_id = rspJsonObj.id;

                res.state = 1;
            }

        }catch(exp){
            res.state = 0;
            log('Parsing jsonp exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
        }

        return res;
    }


    try{

        log('Html check:' + htmlString, config.LOG._LOG_LEVEL_WARNING);
        result.handler = _INDEX;
        result.res = parseJsonp(dataBuff);
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




