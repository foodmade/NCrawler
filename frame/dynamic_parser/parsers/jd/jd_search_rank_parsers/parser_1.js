var _VER = '1.0.0';
var _INDEX = 1;
var _TYPE = 'jd:search_rank';

var _SELECTOR_ITEM = 'li[sku]';
var _TOTAL_HIT_TAG = 'LogParm.result_count="';

var _RETCODE_SUCCESS = 1;
var _RETCODE_ERROR = -1;






function log(log, level){
    utils.log('{DParser JD Search Rank ' + _INDEX + '(ver:' + _VER + ')} ' + log, level);
}


function isBooksPage($){

    var itemDivList = $('body').children('li');
    if(itemDivList.length > 0){
        var item = itemDivList[0];
        if($(item).hasClass('item-book')){
            return true;
        }
    }

    return false;

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

    if(isBooksPage($)){
        log('Book items page, jump over!',config.LOG._LOG_LEVEL_ERROR);
        return [];
    }


    var items = [];
    /* var itemDivList = $(_SELECTOR_ITEM); */

    var itemDivList = $('body').children('li');

    /* log('items count check-----------------------------------------:' + itemDivList.length, config.LOG._LOG_LEVEL_WARNING); */

    if(!_isMyStyle($)){
        return items;
    }

    for(var i = 0; i < itemDivList.length; ++i){
        var itemLi = itemDivList[i];
		var b=false;
        try{

            var skuId = $(itemLi).attr('sku');
            var skuTitle = $(itemLi).find('div.p-name').find('a').text();
			var spread=$(itemLi).find('div span').text();
			if(spread.indexOf(_PROMO)>0){
                b=true;
            }
            if(skuId == undefined || skuId == null){
                skuId = $(itemLi).attr('data-sku');
                if(skuId == undefined || skuId == null){
                    skuId = -1;
                }
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

    function _isMyStyle($){
        var factor = $('ul.list-h');
        if(factor.length > 0){
            return false;
        }
        return true;
    }
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


    var _BODY_T_S = '\x3cbody\x3e';
    var _BODY_T_E = '\x3c/body\x3e';


    var consHtml =  _BODY_T_S + htmlString + _BODY_T_E;

    var $ = cheerio.load(consHtml);
    var totalHits = parseTotalHit(consHtml);
    var items = parseSkus($);
    var sparam = parseSParam(htmlString);

    result.items = items;
    result.totalHits = totalHits;
    result.sparam = sparam;
    result.handler = _INDEX;

    log('Parsing html check:' + consHtml, config.LOG._LOG_LEVEL_DEBUG);

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