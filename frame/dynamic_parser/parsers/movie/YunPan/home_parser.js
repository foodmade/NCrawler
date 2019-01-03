var _VER = '1.0.0';
var _INDEX = 0;
var _TYPE = 'YunPan:search_home_list';

var _RETCODE_SUCCESS = 1;
var _RETCODE_ERROR = -1;


function log(log, level){
    utils.log('{DParser YunPan:search_home_list ' + _INDEX + '(ver:' + _VER + ')} ' + log, level);
}

function parserHtml() {
    var result = {
        rows :[],
        retcode:_RETCODE_ERROR
    };
    var $ = cheerio.load(htmlString);
    var videoList = $('ul.clist li');
    log('videoList length:'+videoList.length,4);
    if(videoList.length === 0){
        return result;
    }
    for (var i = 0;i<videoList.length;i++){
        /**封面图*/
        var coverImg = $(videoList[i]).find('a img').attr('original');
        /**是否高清**/
        var videoType = $(videoList[i]).find('a span').text();
        /**电影名称**/
        var videoName = $(videoList[i]).find('h2 a').text();
        var videoDesc = $(videoList[i]).find('div').text();
        /**评分**/
        var score = 0;
        /**人物信息**/
        var figureInfo = $(videoList[i]).find('p');
        var figures = {
            actor:[],
            director:[]
        };
        figures.actor = $(figureInfo[0]).text().replace('主演：','').split(',');
        /**地区**/
        var areaCity  = $(figureInfo[1]).text().replace('地区：','');
        /**年份**/
        var year = $(figureInfo[2]).text().replace('年份：','');
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