var _VER = '1.0.0';
var _INDEX = 0;
var _TYPE = 'qidian:search_shouye_paihangbang';

var _RETCODE_SUCCESS = 1;
var _RETCODE_ERROR = -1;


function log(log, level){
    utils.log('{DParser qidian Search ' + _INDEX + '(ver:' + _VER + ')} ' + log, level);
}

function parserHtml() {
    var result = {
        rows :[],
        retcode:_RETCODE_ERROR
    };

    var $ = cheerio.load(htmlString);
    var domes = $('#formUrl').attr('action');

    log('rows length:'+domes,4);

    return result;

}


try{

    htmlString = JSON.stringify(htmlString);

    log('Parsing html check,html111111111111:' + htmlString, 4);

    result = parserHtml();

    parserInfo.index = _INDEX;
    parserInfo.ver = _VER;
    parserInfo.type = _TYPE;

    result.handler = _INDEX;

    if(result.items.length > 0){
        result.retcode = _RETCODE_SUCCESS;
    }else{
        result.retcode = _RETCODE_ERROR;
    }

    log('Parsing res check,Total hits:' + result.totalHits + ', items count:' + result.items.length,
        config.LOG._LOG_LEVEL_WARNING);

}catch(exp){
    log('Parsing exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
}