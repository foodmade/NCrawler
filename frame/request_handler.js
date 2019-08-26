var crawler = require('./crawler');

module.exports = {
    m_crawler:null,
    m_uuid:100001,
    init:function(options){
        var THIS_MODULE = this;
        if(THIS_MODULE.m_crawler == null){
            THIS_MODULE.m_crawler = crawler;
            THIS_MODULE.m_crawler.init({uuid:THIS_MODULE.m_uuid++});
        }
    },
    start:function(pathName){
        var THIS_MODULE = this;
        return THIS_MODULE.m_crawler.crawlerStart();
    },
    stop:function(pathName){
        var THIS_MODULE = this;
    },
    state:function(pathName){
        var THIS_MODULE = this;
        return THIS_MODULE.m_crawler.crawlerState();
    },
    restart:function(pathName){
        var THIS_MODULE = this;
    }
};