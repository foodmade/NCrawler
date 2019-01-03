var crawler = require('./crawler');
//var dynamic_parser = require('./dynamic_parser');

module.exports = {
    m_crawler:null,
    m_uuid:100001,
    init:function(options){
        var THIS_MODULE = this;
        if(THIS_MODULE.m_crawler == null){
            THIS_MODULE.m_crawler = crawler;
            THIS_MODULE.m_crawler.init({uuid:THIS_MODULE.m_uuid++});
        }

       // dynamic_parser.init();
    },
    start:function(pathName){
        var THIS_MODULE = this;
        return THIS_MODULE.m_crawler.crawlerStart();
    },
    stop:function(pathName){
        var THIS_MODULE = this;
        //return THIS_MODULE.m_crawler.crawlerStop();
    },
    state:function(pathName){
        var THIS_MODULE = this;
        return THIS_MODULE.m_crawler.crawlerState();
    },
    restart:function(pathName){
        var THIS_MODULE = this;
        //return THIS_MODULE.m_crawler.crawlerRestart();
    }
};