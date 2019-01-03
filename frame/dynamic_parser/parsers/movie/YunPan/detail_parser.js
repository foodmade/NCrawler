var _VER = '1.0.0';
var _INDEX = 1;
var _TYPE = 'YunPan:detail_parser';

var _RETCODE_SUCCESS = 1;
var _RETCODE_ERROR = -1;


function log(log, level){
    utils.log('{DParser YunPan:detail_parser ' + _INDEX + '(ver:' + _VER + ')} ' + log, level);
}


function parserHtml() {
    var result = {
        rows :[],
        retcode:_RETCODE_ERROR
    };
    var videoInfoList = eval('(function() {try {'+htmlString+'} catch (e) {}; return VideoInfoList;})()');

    if(videoInfoList === undefined || videoInfoList === ''){
        return result;
    }
    videoInfoList = videoInfoList.split('$');
    var videosourcelist = [];

    for (var i=0;i<videoInfoList.length;i++){
        var videoPathName,videoPath;
        if(videoInfoList[i] === ''){
            continue;
        }
        if(videoInfoList[i].indexOf('http')>-1){
            videoPath = videoInfoList[i];
            if(i!==0){
                videoPathName = videoInfoList[i-1];
            }else{
                videoPathName = "HD";
            }
            videosourcelist.push({
                videoPathName:videoPathName,
                videoPath:videoPath
            });
        }
    }

    result.rows.push({
        videosourcelist:videosourcelist
    });

    if(result.rows.length === 0){
        return result;
    }
    result.retcode = _RETCODE_SUCCESS;
    return result;

}

/*(function() {try {htmlString} catch (e) {}  return VideoInfoList;})();*/

try{
    log("htmlString:"+htmlString,4);
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