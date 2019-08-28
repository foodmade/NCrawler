
function log(log, level){
    utils.log('{DParser shu800:picture_list_parser ' + log, level);
}

try{
    /**Print the target site source code**/
    log("htmlString:"+htmlString,config.LOG._LOG_LEVEL_DEBUG);

    /**Convert to jquery objects using cheerio**/
    var $ = cheerio.load(htmlString);

    /**Write custom web site parsing rules**/
    var pic_list = $('ul.detail-list li');

    for(var i=0; i<pic_list.length; i++){
        var pic_address = $(pic_list[i]).find('img').attr('src');
        var pic_name = $(pic_list[i]).find('div.dl-name a').text();

        log('pic_name:' + pic_name,config.LOG._LOG_LEVEL_INFO);
        log('pic_address:' + pic_address,config.LOG._LOG_LEVEL_INFO);
    }
}catch(exp){
    log('Parsing exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
}