var _VER = '1.0.0';
var _INDEX = 3;
var _TYPE = 'jd:search_rank:books';

var _SELECTOR_ITEM = 'li.item-book';
var _TOTAL_HIT_TAG = 'LogParm.result_count="';

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
    }else{
        return null;
    }

    totalHits = parseInt(hitString);
    return totalHits;
}






function parseSkus($){
    var items = [];
    var itemDivList = $(_SELECTOR_ITEM);
    for(var i = 0; i < itemDivList.length; ++i){
        var itemLi = itemDivList[i];

        try{

            var skuId = $(itemLi).find('div.btns').find('a[stock]').attr('stock');
            var skuTitle = $(itemLi).find('div.p-name').find('a').text();

            if(skuId == null || skuId == undefined || skuId == ''){
                skuId = $(itemLi).attr('bookid');
                if(skuId == null || skuId == undefined || skuId == ''){
                    skuId =  $(itemLi).find('div.btns').find('a[data-stock]').attr('data-stock');
                }
            }

            items.push({
                skuId:skuId,
                skuTitle:skuTitle
            });

            log('Sku id : ' + skuId + ', Sku title:' + skuTitle, config.LOG._LOG_LEVEL_INFO);

        }catch(exp){
            log('parseSkus() exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
        }


    }

    return items;
}


try{

    log('Parsing html check:' + htmlString,
        config.LOG._LOG_LEVEL_WARNING);


    parserInfo.index = _INDEX;
    parserInfo.ver = _VER;
    parserInfo.type = _TYPE;

    var $ = cheerio.load(htmlString);
    var totalHits = parseTotalHit(htmlString);
    var items = parseSkus($);
    result.items = items;
    result.totalHits = totalHits;
    result.handler = _INDEX;

    if(items.length > 0){
        result.retcode = _RETCODE_SUCCESS;
    }else{
        result.retcode = _RETCODE_ERROR;
    }

    log('Parsing res check,Total hits:' + totalHits + ', items count:' + items.length,
        config.LOG._LOG_LEVEL_WARNING);
}catch(exp){
    log('Parsing exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
}