(function(){

    var _VER = '1.0.0';
    var _INDEX = 4;
    var _TYPE = 'jd:competing_color_size';


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

        var _COLOR_SIZE_DATA_PREF = 'var ColorSize = ';
        var _COLOR_SIZE_DATA_SUFF = ';';

        var res = {
            all_color_size:[],
            on_shelf:true
        };

        try{

            res.on_shelf = _parseIsOnShelf();

            var pos = htmlString.indexOf(_COLOR_SIZE_DATA_PREF);

            if(pos != -1){
                var hitString = '';
                for(var i = pos + _COLOR_SIZE_DATA_PREF.length ; i < pos + 10240; ++i){
                    if(htmlString[i] != _COLOR_SIZE_DATA_SUFF){
                        hitString += htmlString[i];
                    }else{
                        break;
                    }
                }

                var allColorSize = JSON.parse(hitString);
                res.all_color_size = allColorSize;
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
        }
    }


    try{

        log('Html check:' + htmlString, config.LOG._LOG_LEVEL_DEBUG);
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



