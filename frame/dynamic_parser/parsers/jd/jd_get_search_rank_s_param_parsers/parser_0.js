var _VER = '1.0.0';
var _INDEX = 0;
var _TYPE = 'jd:get_search_rank_s_param';

var _TOTAL_HIT_TAG = 'SEARCH.page_html(';

var _RETCODE_SUCCESS = 1;
var _RETCODE_ERROR = -1;


function log(log, level){
    utils.log('{DParser JD Get Search Rank S Params ' + _INDEX + '(ver:' + _VER + ')} ' + log, level);
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
    var params = parseSParam(htmlString);
    result.res = params;
    result.handler = _INDEX;

    if(params.length > 0){
        result.retcode = _RETCODE_SUCCESS;
    }else{
        result.retcode = _RETCODE_ERROR;
        log('Parsing failed,html:' + htmlString,
            config.LOG._LOG_LEVEL_DEBUG);
    }

    log('Parsing res check,s params:' + params, config.LOG._LOG_LEVEL_WARNING);
}catch(exp){
    log('Parsing exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
}