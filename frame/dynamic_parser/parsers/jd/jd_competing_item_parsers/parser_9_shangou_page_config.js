(function(){

   /* var vm = require('vm'); */
    var _VER = '1.0.0';
    var _INDEX = 9;
    var _TYPE = 'jd:parser_9_shangou_page_config';


    parserInfo.index = _INDEX;
    parserInfo.ver = _VER;
    parserInfo.type = _TYPE;

    var _RETCODE_SUCCESS = 1;
    var _RETCODE_ERROR = -1;

    function log(log, level){
        utils.log('{DParser JD Color Size  ' + _INDEX + '(ver:' + _VER + ')} ' + log, level);
    }

    function parseColorSize(dataBuff){

        /*var buf = new Buffer(htmlString);*/
        var htmlString = iconv.decode(dataBuff, 'gb2312').toString();

        log('Html check --- (Decoded):' + htmlString, config.LOG._LOG_LEVEL_DEBUG);

        var _PAGE_CONFIG_DATA_PREF = 'window.pageConfig = ';
        var _PAGE_CONFIG_DATA_SUFF = '};';

        var res = {
            all_color_size:[],
            on_shelf:true
        };

        try{

            res.on_shelf = _parseIsOnShelf();

            var pos = htmlString.indexOf(_PAGE_CONFIG_DATA_PREF);
            var pos_end =  htmlString.indexOf(_PAGE_CONFIG_DATA_SUFF);

            var hitString = htmlString.substring(pos + _PAGE_CONFIG_DATA_PREF.length, pos_end + 2);

            if(pos != -1){

                log('parseColorSize() pageConfig hit string:' + hitString, config.LOG._LOG_LEVEL_WARNING);
                var pageConfig = _doStringToObject(hitString);
                /* res.all_color_size = pageConfig.product.colorSize; */
                res.skuidkey = pageConfig.product.skuidkey;
                res.cateString = pageConfig.product.cat[0] + ',' + pageConfig.product.cat[1] + ',' + pageConfig.product.cat[2];
                res.cate1 = pageConfig.product.cat[0];
                res.cate2 = pageConfig.product.cat[1];
                res.cate3 = pageConfig.product.cat[2];
                res.brand = pageConfig.product.brand;
                res.state = 1;

            }else{
                res.state = 0;
            }



        }catch(exp){
            res.state = 0;
            log('Parsing exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
            log('Parsing exception:' + exp.stack, config.LOG._LOG_LEVEL_ERROR);
        }

        return res;


        function _parseIsOnShelf(){

            try{

                var onShelf = true;
                var $ = cheerio.load(htmlString);
                var itemInfo = $('#product-intro').find('#itemInfo');
                var itemOver = $('div.m-itemover-title');
                log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ check:' + itemOver.length, config.LOG._LOG_LEVEL_DEBUG);
                if(itemOver.length > 0){
                    onShelf = false;
                }else{
                    onShelf = true;
                }
                return onShelf;

            }catch(exp){
                log('_parseIsOnShelf exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
                log('_parseIsOnShelf exception:' + exp.stack, config.LOG._LOG_LEVEL_ERROR);
            }

            return true;

        }
    }

    function _doStringToObject(hitString){

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

        log('Html check:' + htmlString, config.LOG._LOG_LEVEL_WARNING);
        result.handler = _INDEX;
        result.res = parseColorSize(dataBuff);
        if(result.res.state != 1){
            result.retcode = _RETCODE_ERROR;
        }else{
            result.retcode = _RETCODE_SUCCESS;
        }

        log('Parsed result check:' + JSON.stringify(result),
            config.LOG._LOG_LEVEL_WARNING);

    }catch(exp){
        log('Parsing exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
    }

})();



