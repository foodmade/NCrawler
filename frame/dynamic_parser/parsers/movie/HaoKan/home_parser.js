var _VER = '1.0.0';
var _INDEX = 0;
var _TYPE = 'HaoKan:search_home_list';

var _RETCODE_SUCCESS = 1;
var _RETCODE_ERROR = -1;


function log(log, level){
    utils.log('{DParser HaoKan:search_home_list ' + _INDEX + '(ver:' + _VER + ')} ' + log, level);
}

function parserHtml() {
    var result = {
        rows :[],
        retcode:_RETCODE_ERROR
    };
    var $ = cheerio.load(htmlString);
    var videoList = $('ul.img-list li');
    log('videoList length:'+videoList.length,4);
    if(videoList.length === 0){
        return result;
    }
    for (var i = 0;i<videoList.length;i++){
        /**封面图*/
        var coverImg = $(videoList[i]).find('a img').attr('src');
        /**是否高清**/
        var videoType = $(videoList[i]).find('label.txt').text();
        /**电影名称**/
        var videoName = $(videoList[i]).find('h5 a').text();
        var videoDesc = $(videoList[i]).find('p');
        /**评分**/
        var score = $(videoList[i]).find('strong.ratbar-num').text();
        /**人物信息**/
        var figureText;
        for (var j = 0; j < videoDesc.length; j++) {
            if(j === 0){
                figureText = $(videoDesc[j]).text();
            }
        }
        var figures = {
            actor:[],
            director:[]
        };
        figures.director = figureText.split(',');
        /**视频 id**/
        var videoId = $(videoList[i]).find('a').attr('href');
        log('coverImg:'+coverImg,8);
        log('videoType:'+videoType,8);
        log('videoName:'+videoName,8);
        log('figures:'+JSON.stringify(figures),8);
        log('videoId:'+videoId,8);
        log('score:'+score,8);
        result.rows.push({
            coverimg:coverImg,
            videotype:videoType,
            videoname:videoName,
            figures:figures,
            videoid:videoId
        })
    }
    result.retcode = _RETCODE_SUCCESS;
    return result;

}


try{

    htmlString = iconv.decode(htmlString,'gbk');
    log("htmlString:"+htmlString,8);
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