(function(){

   /* var vm = require('vm'); */
    var _VER = '1.0.1';
    var _INDEX = 7;
    var _TYPE = 'jd:competing_color_size_v2';


    parserInfo.index = _INDEX;
    parserInfo.ver = _VER;
    parserInfo.type = _TYPE;

    var _RETCODE_SUCCESS = 1;
    var _RETCODE_ERROR = -1;

    function log(log, level){
        utils.log('{DParser JD Color Size  ' + _INDEX + '(ver:' + _VER + ')} ' + log, level);
    }

    function parseColorSize(dataBuff){

        /*var buf = new Buffer(htmlString);*/
        var htmlString = iconv.decode(dataBuff, 'gb2312').toString();
        var $ = cheerio.load(htmlString);

        log('Html check --- (Decoded):' + htmlString, config.LOG._LOG_LEVEL_DEBUG);

        var _PAGE_CONFIG_DATA_PREF = 'var pageConfig = ';
        var _PAGE_CONFIG_DATA_SUFF = '};';

        var _PIC_SRC_PREFIX = 'http://img11.360buyimg.com/n1/';

        var res = {
            all_color_size:[],
            on_shelf:true
        };

        try{

            res.on_shelf = _parseIsOnShelf();

            var pos = htmlString.indexOf(_PAGE_CONFIG_DATA_PREF);
            var pos_end =  htmlString.indexOf(_PAGE_CONFIG_DATA_SUFF);

            var hitString = htmlString.substring(pos + _PAGE_CONFIG_DATA_PREF.length, pos_end + 2);

            if(pos != -1){

                log('parseColorSize() pageConfig hit string:' + hitString, config.LOG._LOG_LEVEL_WARNING);
                var pageConfig = _doStringToObject(hitString);
                res.all_color_size = pageConfig.product.colorSize;
                res.skuidkey = pageConfig.product.skuidkey;
                res.cateString = pageConfig.product.cat[0] + ',' + pageConfig.product.cat[1] + ',' + pageConfig.product.cat[2];
                res.cate1 = pageConfig.product.cat[0];
                res.cate2 = pageConfig.product.cat[1];
                res.cate3 = pageConfig.product.cat[2];
                res.brand = pageConfig.product.brand;

                res.skuid = pageConfig.product.skuid;
                res.title = pageConfig.product.name;
                res.pic = _PIC_SRC_PREFIX + pageConfig.product.src;
                res.shop_id = pageConfig.product.shopId;
                res.vender_id = pageConfig.product.venderId;

                var shopInfo = _parseShopInfo();
                res.shop_name = shopInfo.shop_name;
                res.shop_url = shopInfo.shop_url;
                res.shop_logo = shopInfo.shop_logo;
                res.is_pop = shopInfo.is_pop;


                res.state = 1;

            }else{
                res.state = 0;
            }



        }catch(exp){
            res.state = 0;
            log('Parsing exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
            log('Parsing exception:' + exp.stack, config.LOG._LOG_LEVEL_ERROR);
        }

        return res;


        function _parseIsOnShelf(){

            try{

                var onShelf = true;
                var itemInfo = $('#product-intro').find('#itemInfo');
                var itemOver = $('div.m-itemover-title');
                log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ check:' + itemOver.length, config.LOG._LOG_LEVEL_DEBUG);
                if(itemOver.length > 0){
                    onShelf = false;
                }else{
                    onShelf = true;
                }
                return onShelf;

            }catch(exp){
                log('_parseIsOnShelf exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
                log('_parseIsOnShelf exception:' + exp.stack, config.LOG._LOG_LEVEL_ERROR);
            }

            return true;

        }


        function _parseShopInfo(){

            var shopInfo = {};

            try{

                var extraInfo = $('#extInfo');

                var sellerInfo = $(extraInfo).find('.seller-infor');

                var shopName = $(sellerInfo).find('a').text();
                var shopUrl = $(sellerInfo).find('a').attr('href');
                var shopLogo = $(extraInfo).find('.brand-logo').find('img').attr('src');
                var shopPopBox = $(extraInfo).find('.seller-pop-box');

                if(shopName.length==0){
                    extraInfo=$('.crumb-wrap');
                    sellerInfo=$(extraInfo).find('.w');
                    sellerInfo=$(sellerInfo).find('.contact');
                    sellerInfo=$(sellerInfo).find('.item');
                    sellerInfo=$(sellerInfo).find('.name');
                    shopName=$(sellerInfo).find('a').text();
                    shopUrl=$(sellerInfo).find('a').attr('href');
                }
                shopInfo.shop_name = shopName;
                shopInfo.shop_url = shopUrl;
                shopInfo.shop_logo = shopLogo;
                shopInfo.is_pop = shopPopBox.length > 0 ? true : false;



            }catch(exp){
                log('_parseShopInfo exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
                log('_parseShopInfo exception:' + exp.stack, config.LOG._LOG_LEVEL_ERROR);
            }

            return shopInfo;

        }

    }




    function _doStringToObject(hitString){

        try{

            var sharedParam = {pageConfig:null};
            var code = '(function(){ pageConfig=' + hitString + '; })();';
            var script = vm.createScript(code);
            script.runInNewContext(sharedParam);

        }catch(exp){
            log('_doStringToObject exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
            log('_doStringToObject exception:' + exp.stack, config.LOG._LOG_LEVEL_ERROR);
        }
        return sharedParam.pageConfig;
    }


    try{

     /*   log('Html check:' + htmlString, config.LOG._LOG_LEVEL_DEBUG); */
        result.handler = _INDEX;
        result.res = parseColorSize(dataBuff);
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



