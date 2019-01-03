(function(){

    var _VER = '1.0.0';
    var _INDEX = 5;
    var _TYPE = 'jd:competing_comment_jsonp_2';


    parserInfo.index = _INDEX;
    parserInfo.ver = _VER;
    parserInfo.type = _TYPE;

    var _RETCODE_SUCCESS = 1;
    var _RETCODE_ERROR = -1;

    function log(log, level){
        utils.log('{DParser JD Comment Jsonp 2  ' + _INDEX + '(ver:' + _VER + ')} ' + log, level);
    }

    function parseJsonp(htmlString){
        var res = {
            comment:{}
        };

        try{

            /*
            var reg = /\((.*)\)/g;
            var targ = (htmlString.match(reg))[0];
            targ = targ.replace('(', '');
            targ = targ.replace(')', ''); */

            var reg = /\((.*)\)/g;
            var targ = (htmlString.match(reg))[0];

            targ = targ.replace(/^\(+|\)+$/g, '');

            var rspJsonObj = JSON.parse(targ);

            if(!rspJsonObj.CommentCount){
                res.state = 0;
            }else{
                /*res.comment = rspJsonObj; */
                var comment = rspJsonObj;

                res.comment.sku_id = comment.SkuId;
                res.comment.product_id = comment.ProductId;

                res.comment.scoure_1_count = comment.Score1Count;
                res.comment.scoure_2_count = comment.Score2Count;
                res.comment.scoure_3_count = comment.Score3Count;
                res.comment.scoure_4_count = comment.Score4Count;
                res.comment.scoure_5_count = comment.Score5Count;

                res.comment.show_count = comment.ShowCount;
                res.comment.comment_count = comment.CommentCount;
                res.comment.avg_score = comment.AverageScore;

                res.comment.good_count = comment.GoodCount;
                res.comment.good_rate = comment.GoodRate;
                res.comment.good_rate_show = comment.GoodRateShow;
                res.comment.good_rate_style = comment.GoodRateStyle;

                res.comment.gen_count = comment.GeneralCount;
                res.comment.gen_rate = comment.GeneralRate;
                res.comment.gen_rate_show = comment.GeneralRateShow;
                res.comment.gen_rate_style = comment.GeneralRateStyle;


                res.comment.poor_count = comment.PoorCount;
                res.comment.poor_rate = comment.PoorRate;
                res.comment.poor_rate_show = comment.PoorRateShow;
                res.comment.poor_rate_style = comment.PoorRateStyle;

                res.state = 1;
            }

        }catch(exp){
            res.state = 0;
            log('Parsing jsonp exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
        }

        return res;
    }


    try{

        log('Html check:' + htmlString, config.LOG._LOG_LEVEL_DEBUG);
        result.handler = _INDEX;
        result.res = parseJsonp(htmlString);
        if(result.res.state != 1){
            result.retcode = _RETCODE_ERROR;
        }else{
            result.retcode = _RETCODE_SUCCESS;
        }

        log('Parsed result check:' + JSON.stringify(result),
            config.LOG._LOG_LEVEL_WARNING);

    }catch(exp){
        log('Parsing exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
    }

})();




