var _VER = '1.0.0';
var _INDEX = 0;
var _TYPE = 'DongJing:search_home_list';

var _RETCODE_SUCCESS = 1;
var _RETCODE_ERROR = -1;


function log(log, level){
    utils.log('{DParser DongJing:search_home_list ' + _INDEX + '(ver:' + _VER + ')} ' + log, level);
}

function parserHtml() {
    var result = {
        rows :[],
        retcode:_RETCODE_ERROR
    };
    var $ = cheerio.load(htmlString);
    var videoList = $('div.channel li');
    log('videoList length:'+videoList.length,4);
    if(videoList.length === 0){
        return result;
    }
    for (var i = 0;i<videoList.length;i++){
        /**封面图*/
        var coverImg = $(videoList[i]).find('img').attr('data-original');
        /**是否高清**/
        var videoType = $(videoList[i]).find('div.img span.bgb p').text();
        /**电影名称**/
        var videoName = $(videoList[i]).find('div.text h2').text();
        var videoDesc = "";
        /**评分**/
        var score = 0;
        /**人物信息**/
        var figures = {
            actor:[],
            director:[]
        };
        /**地区**/
        var areaCity  = $($(videoList[i]).find('div.text p')[0]).text();
        /**年份**/
        var year = 0;
        /**视频 id**/
        var videoId = $(videoList[i]).find('a').attr('href');
        videoId = videoId.replace(/[^0-9]/ig,"");
        log('coverImg:'+coverImg,4);
        log('videoType:'+videoType,4);
        log('videoName:'+videoName,4);
        log('figures:'+JSON.stringify(figures),4);
        log('videoId:'+videoId,4);
        log('score:'+score,4);
        log('videoDesc:'+videoDesc,4);
        log('areaCity:'+areaCity,4);
        log('year:'+year,4);
        result.rows.push({
            coverimg:coverImg,
            videotype:videoType,
            videoname:videoName,
            figures:figures,
            videoid:videoId,
            score:score,
            videodesc:videoDesc,
            areacity:areaCity,
            year:year
        })
    }
    result.retcode = _RETCODE_SUCCESS;
    return result;

}

/**
 *   148735  ==>  255                   118936 ===> 152
 *   148736  ==>  0
 *   148737  ==>  1
 *   148738  ==>  2
 *   148739  ==>  3
 *   148740  ==>  4
 *
 *   148774  ==>  38
 *   148775  ==>  39
 *   148776  ==>  40
 * **/

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