(function(){

    var _VER = '1.0.0';
    var _INDEX = 0;
    var _TYPE = 'jd:search_rank';

    var _RETCODE_SUCCESS = 1;
    var _RETCODE_ERROR = -1;

    var _TOTAL_HIT_TAG = 'LogParm.result_count="';


    function log(log, level){
        utils.log('{DParser JD Search Rank ' + _INDEX + '(ver:' + _VER + ')} ' + log, level);
    }


    function isBooksPage($){

        var itemDivList = $('ul.list-h').children('li');
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
            log('Book items page, jump over!', config.LOG._LOG_LEVEL_ERROR);
            return [];
        }

        var items = [];
        var itemDivList = $('ul.list-h').children('li');
        log('Item li count:' + itemDivList.length, config.LOG._LOG_LEVEL_INFO);
        for(var i = 0; i < itemDivList.length;++i){
            var itemLi = itemDivList[i];
			
            if($(itemLi).attr('id') == 'scroll_loading'){
                continue;
            }

            try{
                var skuId = $(itemLi).attr('sku');

                if(skuId == undefined || skuId == null){
                    skuId = $(itemLi).attr('data-sku');
                    if(skuId == undefined || skuId == null){
                        skuId = -1;
                    }

                }

                var skuTitle = $(itemLi).find('div.p-name').find('a').text();

                items.push({
                    skuId:skuId,
                    skuTitle:skuTitle
                });
                log('Sku id : ' + skuId + ', Sku title:' + skuTitle, config.LOG._LOG_LEVEL_INFO);
            }catch(exp){
                log('parseSkus() exp:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
            }
        }
        return items;
    }


    try{

        log('Parsing html:' + htmlString,
            config.LOG._LOG_LEVEL_DEBUG);

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
            /* log('Parser error:' + htmlString, config.LOG._LOG_LEVEL_ERROR); */
            result.retcode = _RETCODE_ERROR;
        }

        log('Parsing res check,Total hits:' + totalHits + ', items count:' + items.length,
            config.LOG._LOG_LEVEL_WARNING);

    }catch(exp){
        log('Parsing exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
    }

})();




