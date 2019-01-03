var _VER = '1.0.0';
var _INDEX = 2;
var _TYPE = 'jd:search_rank';

/*var _SELECTOR_ITEM = 'li[data-sku]';*/
var _SELECTOR_ITEM = 'li.gl-item';
var _TOTAL_HIT_TAG = 'LogParm.result_count="';
var _PROMO='推广';

var _RETCODE_SUCCESS = 1;
var _RETCODE_ERROR = -1;


function log(log, level){
    utils.log('{DParser JD Search Rank ' + _INDEX + '(ver:' + _VER + ')} ' + log, level);
}



function parseTotalHit(htmlString){
    var totalHits = 0;
    var pos = htmlString.indexOf(_TOTAL_HIT_TAG);
    if(pos != -1){
        var hitString = '';
        for(var i = pos + _TOTAL_HIT_TAG.length ; i < pos + 1024; ++i){
            if(htmlString[i] != '"'){
                hitString += htmlString[i];
            }else{
                break;
            }
        }
    }

    totalHits = parseInt(hitString);
    return totalHits;
}


function parseSkus($){
    var items = [];
    var itemDivList = $(_SELECTOR_ITEM);
    for(var i = 0; i < itemDivList.length; ++i){
        var b=false;
        var itemLi = itemDivList[i];
        try{
            var skuId = $(itemLi).attr('data-sku');
            var skuTitle = $(itemLi).find('div.p-name').find('a').text();
            var spread=$(itemLi).find('div span').text();
            if(spread.indexOf(_PROMO)>0){
                b=true;
            }
            items.push({
                skuId:skuId,
                skuTitle:skuTitle,
                promo:b
            });

            log('Sku id : ' + skuId + ', Sku title:' + skuTitle, config.LOG._LOG_LEVEL_INFO);

        }catch(exp){
            log('parseSkus() exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
        }


    }

    return items;
}


function parseSParam(htmlString){

    var params = [];
    var params_string = '';
    var sparam_tag = 'SEARCH.page_html(';
    var pos = htmlString.indexOf(sparam_tag);
    if(pos != -1){
        var hitString = '';
        for(var i = pos + sparam_tag.length ; i < pos + 1024; ++i){
            if(htmlString[i] != ')'){
                hitString += htmlString[i];
            }else{
                break;
            }
        }

        params_string = hitString;
        params = hitString.split(',');
    }


    return {params:params,params_string:params_string};
}


try{



    parserInfo.index = _INDEX;
    parserInfo.ver = _VER;
    parserInfo.type = _TYPE;

    var $ = cheerio.load(htmlString);
    var totalHits = parseTotalHit(htmlString);
    var items = parseSkus($);
    var sparam = parseSParam(htmlString);

    result.items = items;
    result.totalHits = totalHits;
    result.sparam = sparam;
    result.handler = _INDEX;

    if(items.length > 0){
        result.retcode = _RETCODE_SUCCESS;
    }else{
        result.retcode = _RETCODE_ERROR;
        log('Parsing failed,html:' + htmlString,
            config.LOG._LOG_LEVEL_DEBUG);
    }

    log('Parsing res check,Total hits:' + totalHits + ', items count:' + items.length,
        config.LOG._LOG_LEVEL_WARNING);
}catch(exp){
    log('Parsing exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
}