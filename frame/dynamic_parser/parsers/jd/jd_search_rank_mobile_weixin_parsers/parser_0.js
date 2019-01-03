

var _VER = '1.0.0';
var _INDEX = 0;
var _TYPE = 'jd:jd_search_rank_mobile_parsers';


parserInfo.index = _INDEX;
parserInfo.ver = _VER;
parserInfo.type = _TYPE;

var _RETCODE_SUCCESS = 1;
var _RETCODE_ERROR = -1;

function log(log, level){
    utils.log('{DParser ' + _TYPE + _INDEX + '(ver:' + _VER + ')} ' + log, level);
}


function doParse(htmlString){
    var result = {};
    var items = [];

    try{

        result.handler = _INDEX;

        var resObj = doStringToJSObject(htmlString);

        result.totalHits = resObj.data.searchm.Head.Summary.OrgSkuCount;


        for(var i = 0; i < resObj.data.searchm.Paragraph.length; ++i){
            /* var item = resObj.data.price[i];

             items.push({
             skuId:item.id
             }); */

            var item = resObj.data.searchm.Paragraph[i];
            items.push({
                skuId:item.wareid,
                skuTitle:doRegularizationTitle(item.Content.warename)
            });
        }




    }catch(exp){
        log('Do parse exp:' + exp.message);
        log('Do parse exp:' + exp.stack);
    }

    result.items = items;


    if(result.totalHits > 0 && result.items.length > 0){
        result.retcode = 1;
    }else{
        result.retcode = -1;
    }

    return result;

}

function doStringToJSObject(hitString){

    try{

        var sharedParam = {pageConfig:null};
        var code = '(function(){ function jdSearchResultBkCb (a){ return a;} obj=' + hitString + '; })();';
        /* var script = vm.createScript(code);
        script.runInNewContext(sharedParam); */
        vm.runInNewContext(code, sharedParam);

    }catch(exp){
        log('doStringToJSObject exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
        log('doStringToJSObject exception:' + exp.stack, config.LOG._LOG_LEVEL_ERROR);
    }
    return sharedParam.obj;
}


function doRegularizationTitle(title){
    return title;
}

try{

    log('Html check:' + htmlString, config.LOG._LOG_LEVEL_WARNING);

    result = doParse(htmlString);



    log('Parsed result check:' + JSON.stringify(result),
        config.LOG._LOG_LEVEL_WARNING);

}catch(exp){
    log('Parsing exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
}




