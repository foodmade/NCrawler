var _VER = '1.0.0';
var _INDEX = 1;
var _TYPE = 'DongJing:detail_parser';

var _RETCODE_SUCCESS = 1;
var _RETCODE_ERROR = -1;


function log(log, level){
    utils.log('{DParser DongJing:detail_parser ' + _INDEX + '(ver:' + _VER + ')} ' + log, level);
}


function parserHtml() {
    var result = {
        rows :[],
        retcode:_RETCODE_ERROR
    };
    var $ = cheerio.load(htmlString);
    var scriptContent;
    var videoSources;
    $('script').each(function (i, ele) {
        scriptContent = $(this).text();
        if(scriptContent !== '' && scriptContent.indexOf('videoObject')>-1){
            videoSources = eval('(function() {try{'+scriptContent+'}catch(e){}; return videoObject;})()');
            result.rows.push({
                videosourcelist:[
                    {
                        videoPath:videoSources.video[0][0],
                        videoName:'source1'
                    }
                ]
            })
        }
    });

    if(result.rows.length === 0){
        return result;
    }
    result.retcode = _RETCODE_SUCCESS;
    return result;

}

try{
    htmlString = iconv.decode(htmlString,'gb2312');
    log("htmlString:"+htmlString,8);
    result = parserHtml();

    parserInfo.index = _INDEX;
    parserInfo.ver = _VER;
    parserInfo.type = _TYPE;

    result.handler = _INDEX;

    if(result.rows.length > 0){
        result.retcode = _RETCODE_SUCCESS;
    }else{
        result.retcode = _RETCODE_ERROR;
    }

    log('Parsing res check,Total hits:' + result.totalHits + ', items count:' + result.items.length,
        config.LOG._LOG_LEVEL_WARNING);

}catch(exp){
    log('Parsing exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
}