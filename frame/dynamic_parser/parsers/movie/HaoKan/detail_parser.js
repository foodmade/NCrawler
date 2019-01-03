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
    var videoDesc = $('div.vod-story ul li p').text();
    var videosourcelist = [];
    var scriptContent;
    $('div.w900 script').each(function (i, ele) {
        scriptContent = $(this).text();
        if(scriptContent !== ''){
            scriptContent = scriptContent.replace('var ff_urls=\'','');
            scriptContent = scriptContent.substring(0,scriptContent.length-2);
            var sourceData = JSON.parse(scriptContent).Data;
            var videoSources = [];
            for (var i = 0;i < sourceData.length; i++){
                var urls = sourceData[i].playurls;
                if(!isNaN(urls)) {
                    continue;
                }
                for (var j = 0; j < urls.length; j++) {
                    videosourcelist.push({
                        videoPathName:String(urls[j]).split(',')[0],
                        videoPath:String(urls[j]).split(',')[1]
                    });
                }
            }
            log('urls111:'+videoSources,4);
            result.rows.push({
                videosourcelist:videosourcelist,
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