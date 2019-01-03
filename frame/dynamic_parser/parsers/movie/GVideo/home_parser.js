var _VER = '1.0.0';
var _INDEX = 0;
var _TYPE = 'Gvideo:search_home_list';

var _RETCODE_SUCCESS = 1;
var _RETCODE_ERROR = -1;


function log(log, level){
    utils.log('{DParser Gvideo:search_home_list ' + _INDEX + '(ver:' + _VER + ')} ' + log, level);
}

function parserHtml() {
    var result = {
        rows :[],
        retcode:_RETCODE_ERROR
    };
    var $ = cheerio.load(htmlString);
    var ulDom = $('ul');
    var transHtmlStr = String(ulDom).replace(/\\&quot;/g,"");

    $ = cheerio.load(transHtmlStr);
    var videoList = $('ul.tv-list li');
    if(videoList.length === 0){
        return result;
    }
    for (var i = 0;i<videoList.length;i++){
        var domPic = $(videoList[i]).find('div.v-pic');
        var domTxt = $(videoList[i]).find('div.v-txt');
        /**封面图*/
        var coverImg = domPic.find('img').attr('data-src');
        /**是否高清**/
        var videoType = domPic.find('span.v-tips').text();
        /**电影名称**/
        var videoName = domTxt.find('p.v-tit a').text();
        /**人物信息**/
        var figures = domTxt.find('p.s-des');
        figures = parserAllFigure(figures,$);
        /**视频 id**/
        var videoId = domPic.find('.v-playBtn').attr('href');
        videoId = videoId.replace(/[^0-9]/ig,"");
        log('coverImg:'+coverImg,8);
        log('videoType:'+videoType,8);
        log('videoName:'+videoName,8);
        log('figures:'+JSON.stringify(figures),8);
        log('videoId:'+videoId,8);
        result.rows.push({
            coverimg:coverImg,
            videotype:videoType,
            videoname:videoName,
            figures:figures,
            videoid:videoId
        })
    }
    log('22222222222222222222222222',4);
    result.retcode = _RETCODE_SUCCESS;
    return result;

}

function parserAllFigure(actors, $) {
    var result = {
        actor:[],
        director:[]
    };

    if(actors === undefined || actors.length === 0){
        return result;
    }

    for (var j = 0; j < actors.length;j++) {
        var figureDetail = $(actors[j]).find('a');
        if(j === 0){
            /**演员**/
            result.actor = parserFigure(figureDetail,$);
        }else if(j === 1){
            /**导演**/
            result.director = parserFigure(figureDetail,$);
        }
    }
    return result;
}

function parserFigure(figureDetail, $) {
    var result = [];

    if(figureDetail === undefined || figureDetail.length === 0){
        return result;
    }
    for (var k = 0; k < figureDetail.length; k++) {

        result.push($(figureDetail[k]).text());
    }

    return result;
}


try{

    htmlString = JSON.stringify(htmlString);
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