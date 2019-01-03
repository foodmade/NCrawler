var _VER = '1.0.0';
var _INDEX = 0;
var _TYPE = 'jd:x_category_app_search_rank';

var _RETCODE_SUCCESS = 1;
var _RETCODE_ERROR = -1;

var _SELECTOR_ITEM = 'li[sku]';


function log(log, level){
    utils.log('{DParser JD Search Rank Mobile App ' + _INDEX + '(ver:' + _VER + ')} ' + log, level);
}


function parseResult(htmlString){

    var res = {
        totalHits:0,
        items:[]
    };

    try{

        var jsonObj = JSON.parse(htmlString);

        res.totalHits = jsonObj.wareCount;

        for(var i = 0; i < jsonObj.wareInfo.length; ++i){
            var item = jsonObj.wareInfo[i];
            var promotion=false;
            if(item.promotionType==null){
                promotion=true;
            }
            res.items.push({
                skuId:item.wareId,
                skuTitle:item.wname,
                pic:item.imageurl,
                promo:promotion
            });
        }


    }catch(exp){
        log('Parsing json string exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
    }
    return res;
}



try{

    log('Parsing html check,html:' + htmlString, 2);

    parserInfo.index = _INDEX;
    parserInfo.ver = _VER;
    parserInfo.type = _TYPE;


    result = parseResult(htmlString);

    result.handler = _INDEX;

    if(result.items.length > 0){
        result.retcode = _RETCODE_SUCCESS;
    }else{
        result.retcode = _RETCODE_ERROR;
    }

    log('Parsing res check,Total hits:' + result.totalHits + ', items count:' + result.items.length,
        config.LOG._LOG_LEVEL_WARNING);

}catch(exp){
    log('Parsing exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
}