var _VER = '1.0.0';
var _INDEX = 1;
var _TYPE = 'jd:analyze_rank';

/*var _SELECTOR_ITEM = 'li[data-sku]';*/
var _SELECTOR_ITEM = 'li.gl-item';
var _TOTAL_HIT_TAG = 'LogParm.result_count="';
var _PROMO='<>推广';
var _PROMO_1='<>广告';
var _WAN='万';

var _RETCODE_SUCCESS = 1;
var _RETCODE_ERROR = -1;


function log(log, level){
    utils.log('{DParser JD Search Rank ' + _INDEX + '(ver:' + _VER + ')} ' + log, level);
}



function parseTotalHit(htmlString){
    var totalHits = 0;
    var hitString = '';
    var pos = htmlString.indexOf(_TOTAL_HIT_TAG);
    if(pos != -1){
        for(var i = pos + _TOTAL_HIT_TAG.length ; i < pos + 1024; ++i){
            if(htmlString[i] != '"'){
                hitString += htmlString[i];
            }else{
                break;
            }
        }
    }
    totalHits = parseInt(hitString);
    if(isNaN(totalHits)){
        var $=cheerio.load(htmlString);
        hitString=$('#J_resCount').text();
        if(hitString.indexOf('万')>0){
            hitString=hitString.substring(0,hitString.indexOf('万'));
            totalHits=parseFloat(hitString);
            totalHits=totalHits*10000;
        }else{
            totalHits=parseInt(hitString);
        }
    }
    log('totalHitis=='+totalHits,config.LOG._LOG_LEVEL_WARNING);
    return totalHits;
}

function parseSection($){
    var item=[];
    var data=$('#J_filter .f-datagrid');
    data=$(data).find('a');
    for (let i=0;i<data.length;i++){
        var nextNode=$(data[i]);
        item.push({
            range:nextNode.data('range'),
            tips:nextNode.data('tips')
        });
    }
    return item;
}

function parserCate($){
    var result=0;
    var data=$('#J_container .s-category .J_valueList');
    data=$(data).find('li');
    log('cateInfo:'+$(data[0]).find('a').data('v'),config.LOG._LOG_LEVEL_DEBUG);
    result=$(data[0]).find('a').data('v');
    return result;
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
            /*            var spread=$(itemLi).find('div').find("span").text();*/
            if((spread==_PROMO)||spread==_PROMO_1){
                log("spread="+spread,config.LOG._LOG_LEVEL_WARNING);
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



try{
    parserInfo.index = _INDEX;
    parserInfo.ver = _VER;
    parserInfo.type = _TYPE;
    log("$ info:"+htmlString, config.LOG._LOG_LEVEL_DEBUG);
    var $ = cheerio.load(htmlString);

    var totalHits = parseTotalHit(htmlString);
    var items = parseSkus($);
    var section=parseSection($);
    var top_cate=parserCate($);
    result.items = items;
    result.section=section;
    result.totalHits = totalHits;
    result.top_cate=top_cate;
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