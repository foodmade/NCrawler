(function(){

    var _VER = '1.0.0';
    var _INDEX = 1;
    var _TYPE = 'jd:competing_promotion_set_jsonp';


    parserInfo.index = _INDEX;
    parserInfo.ver = _VER;
    parserInfo.type = _TYPE;

    var _RETCODE_SUCCESS = 1;
    var _RETCODE_ERROR = -1;

    function log(log, level){
        utils.log('{DParser JD Promotion Set Jsonp  ' + _INDEX + '(ver:' + _VER + ')} ' + log, level);
    }


    /* --------------------------------------------------------  promotions detail parse method. ----------------------------------------- */

    var _PROM_TYPE_4 = 4;                           /* 促销 */
    var _PROM_TYPE_10 = 10;                         /* 满减  加价购 */
    var _PROM_TYPE_1 = 1;                    /* 特价 送京豆（积分） */
    var _PROM_TYPE_2 = 2;


    var _PARSED_PROM_TYPE_NAME_1 = '赠京豆';
    var _PARSED_PROM_TYPE_NAME_2 = '特价-1';
    var _PARSED_PROM_TYPE_NAME_3 = '赠券-1';
    var _PARSED_PROM_TYPE_NAME_4 = '赠品-1';
    var _PARSED_PROM_TYPE_NAME_5 = '赠品-2';
    var _PARSED_PROM_TYPE_NAME_6 = '满减-1';
    var _PARSED_PROM_TYPE_NAME_7 = '加价购-1';
    var _PARSED_PROM_TYPE_NAME_8 = '加价购-2';
    var _PARSED_PROM_TYPE_NAME_9 = '满赠-1';
    var _PARSED_PROM_TYPE_NAME_10 = '多买优惠';
    var _PARSED_PROM_TYPE_NAME_11 = '满赠-2';
    var _PARSED_PROM_TYPE_NAME_12 = '满减-2';
    var _PARSED_PROM_TYPE_NAME_100 = '手机专享价';


    var _USER_LEVEL_0  = 50;
    var _USER_LEVEL_1  = 56;
    var _USER_LEVEL_2  = 61;
    var _USER_LEVEL_3  = 62;
    var _USER_LEVEL_4  = 105;
    var _USER_LEVEL_5  = 110;

    var _USER_LEVEL_NAME_0  = '注册会员';
    var _USER_LEVEL_NAME_1  = '铜牌会员';
    var _USER_LEVEL_NAME_2  = '银牌会员';
    var _USER_LEVEL_NAME_3  = '金牌会员';
    var _USER_LEVEL_NAME_4  = '钻石会员';
    var _USER_LEVEL_NAME_5  = 'VIP会员';





    function promotionTypeNameMapping(rawTypeName){
        var typeName = '';

        var _DISP_PROM_TYPE_NAME_1 = '赠京豆';
        var _DISP_PROM_TYPE_NAME_2 = '特价';
        var _DISP_PROM_TYPE_NAME_3 = '赠券';
        var _DISP_PROM_TYPE_NAME_4 = '赠品';
        var _DISP_PROM_TYPE_NAME_5 = '赠品';
        var _DISP_PROM_TYPE_NAME_6 = '满减';
        var _DISP_PROM_TYPE_NAME_7 = '加价购';
        var _DISP_PROM_TYPE_NAME_8 = '加价购';
        var _DISP_PROM_TYPE_NAME_9 = '满赠';
        var _DISP_PROM_TYPE_NAME_10 = '多买优惠';
        var _DISP_PROM_TYPE_NAME_11 = '满赠';
        var _DISP_PROM_TYPE_NAME_12 = '满减';


        switch(rawTypeName){
            case _PARSED_PROM_TYPE_NAME_1:
                typeName = _DISP_PROM_TYPE_NAME_1;
                break;
            case _PARSED_PROM_TYPE_NAME_2:
                typeName = _DISP_PROM_TYPE_NAME_2;
                break;
            case _PARSED_PROM_TYPE_NAME_3:
                typeName = _DISP_PROM_TYPE_NAME_3;
                break;
            case _PARSED_PROM_TYPE_NAME_4:
                typeName = _DISP_PROM_TYPE_NAME_4;
                break;
            case _PARSED_PROM_TYPE_NAME_5:
                typeName = _DISP_PROM_TYPE_NAME_5;
                break;
            case _PARSED_PROM_TYPE_NAME_6:
                typeName = _DISP_PROM_TYPE_NAME_6;
                break;
            case _PARSED_PROM_TYPE_NAME_7:
                typeName = _DISP_PROM_TYPE_NAME_7;
                break;
            case _PARSED_PROM_TYPE_NAME_8:
                typeName = _DISP_PROM_TYPE_NAME_8;
                break;
            case _PARSED_PROM_TYPE_NAME_9:
                typeName = _DISP_PROM_TYPE_NAME_9;
                break;
            case _PARSED_PROM_TYPE_NAME_10:
                typeName = _DISP_PROM_TYPE_NAME_10;
                break;
            case _PARSED_PROM_TYPE_NAME_11:
                typeName = _DISP_PROM_TYPE_NAME_11;
                break;
            case _PARSED_PROM_TYPE_NAME_12:
                typeName = _DISP_PROM_TYPE_NAME_12;
                break;
            default:
                typeName = '未知促销';
        }

        return typeName;
    }


    function promoUserTypeLimit(usrLvl){
        var limit = '';

        switch (usrLvl){
            case _USER_LEVEL_0:
                limit =  '';
                break;
            case _USER_LEVEL_1:
                limit = '[限' + _USER_LEVEL_NAME_1 + '及以上]';
                break;
            case _USER_LEVEL_2:
                limit = '[限' + _USER_LEVEL_NAME_2 + '及以上]';
                break;
            case _USER_LEVEL_3:
                limit = '[限' + _USER_LEVEL_NAME_3 + '及以上]';
                break;
            case _USER_LEVEL_4:
                limit = '[限' + _USER_LEVEL_NAME_4 + '及以上]';
                break;
            case _USER_LEVEL_5:
                limit = '[限' + _USER_LEVEL_NAME_5 + '及以上]';
                break;
            default :
                limit =  '';
        }
        return limit;
    }







    function promotion_type_1(rawPromotion){    /* 单品促销 */

        var prom = {};


        try{
            prom.raw = rawPromotion;
            prom.promo_id = rawPromotion.promoId;
            prom.type = _PROM_TYPE_1;

            prom.user_level = rawPromotion.userLevel;
            prom.limit_time_promo =  rawPromotion.limitTimePromo;
            prom.promo_end_time = rawPromotion.promoEndTime;
            prom.full_refund_type = rawPromotion.fullRefundType;
            prom.adword_url = rawPromotion.adwordUrl;


            if(rawPromotion.score && rawPromotion.score > 0){
                prom.type_name = _PARSED_PROM_TYPE_NAME_1;
                prom.infomation = '赠' + rawPromotion.score +  '京豆';

            }else if(rawPromotion.price){
                prom.type_name = _PARSED_PROM_TYPE_NAME_2;
                prom.infomation = '特价：' + rawPromotion.price;

                var condition = '（';
                if(rawPromotion.maxNum > 0 && rawPromotion.maxNum == rawPromotion.minNum){
                    condition += '购买' + rawPromotion.maxNum + '件时享受 ';
                }else if(rawPromotion.maxNum != rawPromotion.minNum){
                    if(rawPromotion.minNum > 0){
                        condition += '至少需购买' + rawPromotion.minNum + '件 ';
                    }

                    if(rawPromotion.maxNum > 0){
                        condition += '至多享受' + rawPromotion.maxNum + '件 ';
                    }
                }

                condition += '）';
                if(condition == '（）'){
                    condition = '';
                }
                prom.infomation += condition;


            }else if(rawPromotion.adwordCouponList && rawPromotion.adwordCouponList.length > 0){
                prom.type_name = _PARSED_PROM_TYPE_NAME_3;
                var promInfo = '';
                for(var i = 0; i <  rawPromotion.adwordCouponList.length ; ++i){
                    var coupon =  rawPromotion.adwordCouponList[i];
                    if(coupon.type == 1){
                        promInfo += '赠' + coupon.couponQouta + '元京券';
                    }else{
                        promInfo += '赠' + coupon.couponQouta + '券';
                    }

                    if(coupon.adWord && coupon.adWord != ''){
                        promInfo += '（' + coupon.adWord + '）';
                    }

                }
                prom.infomation = promInfo;

            }else{
                prom.type_name = '未知1型促销';
                prom.infomation = '';
            }

        }catch(exp){
            log('promotion_type_1 exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
            log('promotion_type_1 exception:' + exp.stack, config.LOG._LOG_LEVEL_ERROR);
        }

        prom.type_name_disp = promotionTypeNameMapping(prom.type_name);
        prom.infomation += promoUserTypeLimit(rawPromotion.userLevel);

        return prom;
    }




    function promotion_type_2(rawPromotion){

        var prom = {};

        try{

            prom.raw = rawPromotion;
            prom.promo_id = rawPromotion.promoId;
            prom.type = _PROM_TYPE_10;
            prom.type_name = '';
            prom.infomation = '';
            prom.user_level = rawPromotion.userLevel;
            prom.limit_time_promo =  rawPromotion.limitTimePromo;
            prom.promo_end_time = rawPromotion.promoEndTime;
            prom.full_refund_type = rawPromotion.fullRefundType;
            prom.adword_url = rawPromotion.adwordUrl;

            if(rawPromotion.adwordGiftSkuList.length > 0){
                prom.type_name = _PARSED_PROM_TYPE_NAME_4;
                var promInfo = '';

                promInfo = '赠下方的热销商品';
                if(rawPromotion.minNum > 0){
                    promInfo += '（条件：购买' + rawPromotion.minNum + '件及以上）';
                }

                prom.infomation = promInfo;
                prom.gifts = [];



                for(var i = 0; i < rawPromotion.adwordGiftSkuList.length; ++i){
                    prom.gifts.push({
                        name:rawPromotion.adwordGiftSkuList[i].name,
                        sku_id:rawPromotion.adwordGiftSkuList[i].skuId,
                        number:rawPromotion.adwordGiftSkuList[i].number,
                        logo:rawPromotion.adwordGiftSkuList[i].imagePath,
                        logo_pref:'http://img10.360buyimg.com/n5'
                    });
                }


            }

        }catch (exp){
            log('promotion_type_2 exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
            log('promotion_type_2 exception:' + exp.stack, config.LOG._LOG_LEVEL_ERROR);
        }

        prom.type_name_disp = promotionTypeNameMapping(prom.type_name);
        prom.infomation += promoUserTypeLimit(rawPromotion.userLevel);

        return prom;
    }


    function promotion_type_4(rawPromotion){
        var prom = {};

        try{

            prom.raw = rawPromotion;
            prom.promo_id = rawPromotion.promoId;
            prom.type = _PROM_TYPE_4;
            prom.type_name = _PARSED_PROM_TYPE_NAME_5;
            prom.user_level = rawPromotion.userLevel;
            prom.limit_time_promo =  rawPromotion.limitTimePromo;
            prom.promo_end_time = rawPromotion.promoEndTime;
            prom.full_refund_type = rawPromotion.fullRefundType;
            prom.adword_url = rawPromotion.adwordUrl;

            var promInfo = '';

            promInfo = '赠下方的热销商品';
            if(rawPromotion.minNum > 0){
                promInfo += '（条件：购买' + rawPromotion.minNum + '件及以上）';
            }

            prom.infomation = promInfo;

            prom.gifts = [];

            for(var i = 0; i < rawPromotion.adwordGiftSkuList.length; ++i){
                prom.gifts.push({
                    name:rawPromotion.adwordGiftSkuList[i].name,
                    sku_id:rawPromotion.adwordGiftSkuList[i].skuId,
                    number:rawPromotion.adwordGiftSkuList[i].number,
                    logo:rawPromotion.adwordGiftSkuList[i].imagePath,
                    logo_pref:'http://img10.360buyimg.com/n5'
                });
            }

        }catch(exp){
            log('promotion_type_4 exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
            log('promotion_type_4 exception:' + exp.stack, config.LOG._LOG_LEVEL_ERROR);
        }


        prom.type_name_disp = promotionTypeNameMapping(prom.type_name);
        prom.infomation += promoUserTypeLimit(rawPromotion.userLevel);


        return prom;
    }



    function promotion_type_10(rawPromotion){
        var prom = {};

        try{

            prom.raw = rawPromotion;
            prom.promo_id = rawPromotion.promoId;
            prom.type = _PROM_TYPE_10;
            prom.type_name = '';
            prom.infomation = '';
            prom.user_level = rawPromotion.userLevel;
            prom.limit_time_promo =  rawPromotion.limitTimePromo;
            prom.promo_end_time = rawPromotion.promoEndTime;
            prom.full_refund_type = rawPromotion.fullRefundType;
            prom.adword_url = rawPromotion.adwordUrl;

            if(rawPromotion.fullRefundType == 6 || rawPromotion.fullRefundType == 1){

                if(rawPromotion.haveFullRefundGifts == true){

                    prom.type_name = _PARSED_PROM_TYPE_NAME_11;
                    prom.discount_list = [];
                    for(var i = 0; i < rawPromotion.fullLadderDiscountList.length; ++i){
                        var discount = rawPromotion.fullLadderDiscountList[i];
                        var disInfo = '满' +  discount.needMoney + '得赠品';
                        prom.discount_list.push({
                            discount_display:disInfo,
                            need_money:discount.needMoney
                        });

                        prom.infomation += disInfo + ';';
                    }

                }else{
                    prom.type_name = _PARSED_PROM_TYPE_NAME_6;
                    prom.discount_list = [];
                    for(var i = 0; i < rawPromotion.fullLadderDiscountList.length; ++i){
                        var discount = rawPromotion.fullLadderDiscountList[i];
                        var disInfo = '满' +  discount.needMoney + '减' + discount.rewardMoney;
                        prom.discount_list.push({
                            discount_display:disInfo,
                            need_money:discount.needMoney,
                            reward_money:discount.rewardMoney
                        });

                        prom.infomation += disInfo + ';';
                    }
                }

            }else if(rawPromotion.fullRefundType == 16 && rawPromotion.mfmzExtType == 4){

                if(!rawPromotion.addMoney || rawPromotion.addMoney <= 0){

                    prom.type_name = _PARSED_PROM_TYPE_NAME_9;
                    prom.discount_list = [];
                    for(var i = 0; i < rawPromotion.fullLadderDiscountList.length; ++i){
                        var discount = rawPromotion.fullLadderDiscountList[i];
                        var disInfo = '满' +  discount.needMoney + '得赠品';
                        prom.discount_list.push({
                            discount_display:disInfo,
                            need_money:discount.needMoney
                        });

                        prom.infomation += disInfo + ';';
                    }

                }else{

                    prom.type_name = _PARSED_PROM_TYPE_NAME_7;
                    prom.discount_list = [];
                    for(var i = 0; i < rawPromotion.fullLadderDiscountList.length; ++i){
                        var discount = rawPromotion.fullLadderDiscountList[i];
                        var disInfo = '满' +  discount.needMoney + '加' + discount.addMoney;
                        prom.discount_list.push({
                            discount_display:disInfo,
                            need_money:discount.needMoney,
                            reward_money:discount.addMoney
                        });

                        prom.infomation += disInfo + ';';
                    }

                }


            }else if(rawPromotion.fullRefundType == 2){

                prom.type_name = _PARSED_PROM_TYPE_NAME_12;
                prom.discount_list = [];
                for(var i = 0; i < rawPromotion.fullLadderDiscountList.length; ++i){
                    var discount = rawPromotion.fullLadderDiscountList[i];
                    var disInfo = '每满' +  discount.needMoney + '元，可减' + rawPromotion.reward + '元现金';
                    prom.discount_list.push({
                        item_detail:rawPromotion.adwordUrl == null ? '' : rawPromotion.adwordUrl,
                        discount_display:disInfo,
                        need_money:discount.needMoney,
                        reward:rawPromotion.reward
                    });

                    prom.infomation += disInfo + ';';
                }

            }else if(rawPromotion.fullRefundType == 4){
                prom.type_name = _PARSED_PROM_TYPE_NAME_8;
                prom.discount_list = [];
                for(var i = 0; i < rawPromotion.fullLadderDiscountList.length; ++i){
                    var discount = rawPromotion.fullLadderDiscountList[i];
                    var disInfo = '满' +  discount.needMoney + '加' + discount.addMoney + '即可购买热销商品';
                    prom.discount_list.push({
                        item_detail:rawPromotion.adwordUrl == null ? '' : rawPromotion.adwordUrl,
                        discount_display:disInfo,
                        need_money:discount.needMoney,
                        reward_money:discount.addMoney
                    });

                    prom.infomation += disInfo + ';';
                }
            }else if(rawPromotion.fullRefundType == 15){
                prom.type_name = _PARSED_PROM_TYPE_NAME_10;
                prom.discount_list = [];
                for(var i = 0; i < rawPromotion.fullLadderDiscountList.length; ++i){
                    var discount = rawPromotion.fullLadderDiscountList[i];
                    var disInfo = '买' +  discount.needNum + '件，总价打' + discount.rebate * 10 + '折';
                    prom.discount_list.push({
                        discount_display:disInfo,
                        needNum:discount.needNum,
                        rebate:discount.rebate
                    });

                    prom.infomation += disInfo + ';';
                }

            }else{
                prom.type_name = '未知10型促销';
                prom.discount_list = [];
            }



        }catch(exp){
            log('promotion_type_10 exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
            log('promotion_type_10 exception:' + exp.stack, config.LOG._LOG_LEVEL_ERROR);
        }


        prom.type_name_disp = promotionTypeNameMapping(prom.type_name);
        prom.infomation += promoUserTypeLimit(rawPromotion.userLevel);

        return prom;


    }

    function promotion_type_mpt(resObj){
        var prom = {};

        try {

            prom.raw = {};
            prom.promo_id = -1;
            prom.type = -1;
            prom.type_name = _PARSED_PROM_TYPE_NAME_100;
            prom.infomation = '';
            prom.user_level = -1;
            prom.limit_time_promo = -1;
            prom.promo_end_time = -1;
            prom.full_refund_type = -1;
            prom.adword_url = '';

            prom.type_name_disp = _PARSED_PROM_TYPE_NAME_100;

            var infos = resObj.mpt.split(',');

            prom.price = parseFloat(infos[0]);


        }catch(exp){
            log('promotion_type_mpt exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
            log('promotion_type_mpt exception:' + exp.stack, config.LOG._LOG_LEVEL_ERROR);
        }
        return prom;
    }


    function promotion_type_undefined(rawPromotion){
        var prom = {};

        prom.raw = rawPromotion;
        prom.promo_id = rawPromotion.promoId;
        prom.type = rawPromotion.promoType;
        prom.type_name = '未知基本促销类型';
        prom.infomation = '';
        prom.adword_url = rawPromotion.adwordUrl;

        prom.type_name_disp = promotionTypeNameMapping(prom.type_name);
        prom.infomation += promoUserTypeLimit(rawPromotion.userLevel);

        return prom;
    }






    function parseJsonp(htmlString){
        var res = {
            promotions:[]
        };

        try{

            var reg = /\((.*)\)/g;
            var targ = (htmlString.match(reg))[0];

            targ = targ.replace(/^\(+|\)+$/g, '');

            var rspJsonObj = JSON.parse(targ);

            if(!rspJsonObj.promotionInfoList){
                res.state = 0;
            }else{
                /* res.promotions = rspJsonObj.promotionInfoList; */

                res.sku_id = rspJsonObj.skuId;

                var promotions = rspJsonObj.promotionInfoList;

                for(var i = 0; i < promotions.length; ++ i){
                    switch(promotions[i].promoType){
                        case _PROM_TYPE_4:
                            res.promotions.push(promotion_type_4(promotions[i]));
                            break;
                        case _PROM_TYPE_10:
                            res.promotions.push(promotion_type_10(promotions[i]));
                            break;
                        case _PROM_TYPE_1:
                            res.promotions.push(promotion_type_1(promotions[i]));
                            break;
                        case _PROM_TYPE_2:
                            res.promotions.push(promotion_type_2(promotions[i]));
                            break;
                        default :
                            res.promotions.push(promotion_type_undefined(promotions[i]));
                    }
                }

                if(rspJsonObj.mpt != null && rspJsonObj.mpt != ''){
                    res.promotions.push(promotion_type_mpt(rspJsonObj));
                }

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




