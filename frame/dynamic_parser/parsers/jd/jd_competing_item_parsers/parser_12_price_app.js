var _VER = '1.0.0';
var _INDEX = 0;
var _TYPE = 'jd:search_rank_mobile_app_price';

var _RETCODE_SUCCESS = 1;
var _RETCODE_ERROR = -1;

var _SELECTOR_ITEM = 'li[sku]';


function log(log, level){
    utils.log('{DParser JD Search Rank Mobile App price ' + _INDEX + '(ver:' + _VER + ')} ' + log, level);
}


function parseResult(htmlString){

    var res = {
    };

    try{

        var jsonObj = JSON.parse(htmlString);
        var app_item=jsonObj.wareInfo.jprice;
        if(!app_item || app_item.length <= 0){
            res.state = 0;
        }else {
            res.price = app_item.value;
            res.display = app_item.display;
            res.state=1;
        }

    }catch(exp){
        res.state=0;
        log('Parsing json string exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
    }
    return res;
}



try{

    log('Parsing html check,html:' + htmlString, 2);

    parserInfo.index = _INDEX;
    parserInfo.ver = _VER;
    parserInfo.type = _TYPE;


    result.res = parseResult(htmlString);

    result.handler = _INDEX;

    if(result.res.length > 0){
        result.retcode = _RETCODE_SUCCESS;
    }else{
        result.retcode = _RETCODE_ERROR;
    }

    log('Parsing res check,Total hits:' + result.totalHits + ', items count:' + result.items.length,
        config.LOG._LOG_LEVEL_WARNING);

}catch(exp){
    log('Parsing exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
}