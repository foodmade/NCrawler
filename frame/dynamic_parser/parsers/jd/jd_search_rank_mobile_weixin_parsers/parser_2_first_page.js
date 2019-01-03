(function(){

    var _VER = '1.0.0';
    var _INDEX = 2;
    var _TYPE = 'jd:search_rank_mobile_weixin_first_page';

    var _RETCODE_SUCCESS = 1;
    var _RETCODE_ERROR = -1;

    var _TOTAL_HIT_TAG = '_sfpageinit({';


    function log(log, level){
        utils.log('{DParser JD Search Rank ' + _INDEX + '(ver:' + _VER + ')} ' + log, level);
    }

/*
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
*/

    function parseSkus(htmlString){

        var _JS_DATA_PREF = '_sfpageinit({';
        var _JS_DATA_SUFF = '});';

        var res = {
            totalHits:0,
            items:[]
        };

        try{


            var hitString = '';

            var pos = htmlString.indexOf(_JS_DATA_PREF);



            if(pos != -1){

                pos -= 1;

                var tempStr = htmlString.substr(pos);
                var pos_end = tempStr.indexOf(_JS_DATA_SUFF);

                if(pos_end != -1){
                    hitString = tempStr.substring(_JS_DATA_PREF.length, pos_end + 1);

                    log('hit string check--------:' + hitString, config.LOG._LOG_LEVEL_WARNING);

                    var resObj = doStringToObject(hitString);

                    res.totalHits = resObj.data.searchm.Head.Summary.OrgSkuCount;


                    for(var i = 0; i < resObj.data.searchm.Paragraph.length; ++i){

                        var item = resObj.data.searchm.Paragraph[i];
                        res.items.push({
                            skuId:item.wareid,
                            skuTitle:item.Content.warename
                        });
                    }

                }

            }






        }catch(exp){
            log('Parsing exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
            log('Parsing exception:' + exp.stack, config.LOG._LOG_LEVEL_ERROR);
        }


        return res;
    }

    function doStringToObject(hitString){

        try{

            var sharedParam = {pageConfig:null};
            var code = '(function(){ pageConfig=' + hitString + '; })();';
            var script = vm.createScript(code);
            script.runInNewContext(sharedParam);

        }catch(exp){
            log('_doStringToObject exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
            log('_doStringToObject exception:' + exp.stack, config.LOG._LOG_LEVEL_ERROR);
        }
        return sharedParam.pageConfig;
    }


    try{

        log('Parsing html:' + htmlString,
            config.LOG._LOG_LEVEL_DEBUG);

        parserInfo.index = _INDEX;
        parserInfo.ver = _VER;
        parserInfo.type = _TYPE;

        var res = parseSkus(htmlString);

        result.items = res.items;
        result.totalHits = res.totalHits;
        result.handler = _INDEX;

        if(result.items.length > 0){
            result.retcode = _RETCODE_SUCCESS;
        }else{
            /* log('Parser error:' + htmlString, config.LOG._LOG_LEVEL_ERROR); */
            result.retcode = _RETCODE_ERROR;
        }

        log('Parsing res check,Total hits:' + result.totalHits + ', items count:' + result.items.length,
            config.LOG._LOG_LEVEL_WARNING);

    }catch(exp){
        log('Parsing exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
    }

})();




