function log(log, level){
    utils.log('{DParser shu800:picture_list_parser ' + log, level);
}

try{

    result.items = [];

    log('htmlString:'+htmlString,config.LOG._LOG_LEVEL_DEBUG);


    var $ = cheerio.load(htmlString);

    var pic_list = $('ul.detail-list li');

    for(var i=0; i<pic_list.length; i++){
        var pic_address = $(pic_list[i]).find('img').attr('src');
        var pic_name = $(pic_list[i]).find('div.dl-name a').text();

        log('pic_name:' + pic_name,config.LOG._LOG_LEVEL_INFO);
        log('pic_address:' + pic_address,config.LOG._LOG_LEVEL_INFO);
        
        result.items.push({
            pic:pic_address,
            name:pic_name
        })
    }
}catch(exp){
    log('Parsing exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
}