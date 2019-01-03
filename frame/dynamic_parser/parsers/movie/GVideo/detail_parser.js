var _VER = '1.0.0';
var _INDEX = 1;
var _TYPE = 'Gvideo:detail_parser';

var _RETCODE_SUCCESS = 1;
var _RETCODE_ERROR = -1;


function log(log, level){
    utils.log('{DParser Gvideo:detail_parser ' + _INDEX + '(ver:' + _VER + ')} ' + log, level);
}


function parserHtml() {
    var result = {
        rows :[],
        retcode:_RETCODE_ERROR
    };
    var $ = cheerio.load(htmlString);

    /**解析剧情简介*/
    var videoDesc = $('div.infor_intro').text();

    var scriptContent;
    var videoSources;
    $('div.iplays script').each(function (i, ele) {
        scriptContent = $(this).text();
        if(scriptContent !== ''){
            videoSources = eval('(function() {'+scriptContent+'; return mac_url;})()');
            videoSources = videoSources.split('$$$');
            log('soucres:'+JSON.stringify(videoSources));
            result.rows.push({
                videosourcelist:splitSources(videoSources),
                videodesc:videoDesc
            })
        }
    });
    if(result.rows.length === 0){
        return result;
    }
    result.retcode = _RETCODE_SUCCESS;
    return result;

}

function splitSources(videoSources) {
    var result = [];

    if(videoSources === undefined || videoSources === ''){
        return result;
    }

    for (var i = 0; i < videoSources.length; i++) {
        var s = videoSources[i].split('$');
        result.push({
            videoPathName:s[0],
            videoPath:s[1]
        })
    }
    return result;
}

try{
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