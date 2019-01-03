var _VER = '1.0.0';
var _INDEX = 1;
var _TYPE = 'jd:category_rank';

var _RETCODE_SUCCESS = 1;
var _RETCODE_ERROR = -1;

function log(log, level){
    utils.log('{DParser JD Category Rank ' + _INDEX + '(ver:' + _VER + ')} ' + log, level);
}


function parseTotalHit($){
    var totalHits = 0;
    var totalElement = $('div.st-ext').find('span');
    totalHits = parseInt(totalElement.text());
    return totalHits;
}

function parseSkus($){
    var items = [];
    var itemDivList = $('#plist').find('ul.gl-warp').find('li[data-sku]');

    log('item list count:' + itemDivList.length, config.LOG._LOG_LEVEL_INFO);
    for(var i = 0; i < itemDivList.length; ++i){
        var itemLi = itemDivList[i];

        try{

            var skuId = $(itemLi).attr('data-sku');
            var skuTitle = $(itemLi).find('div.p-name').find('a').find('em').text();

            items.push({
                skuId:skuId,
                skuTitle:skuTitle
            });

            log('Sku id : ' + skuId + ', Sku title:' + skuTitle, config.LOG._LOG_LEVEL_INFO);

        }catch(exp){
            log('Parsing exception : ' + exp.message, config.LOG._LOG_LEVEL_ERROR);
        }


    }

    return items;
}


try{

    parserInfo.index = _INDEX;
    parserInfo.ver = _VER;
    parserInfo.type = _TYPE;

    var $ = cheerio.load(htmlString);
    var totalHits = parseTotalHit($);
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