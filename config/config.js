var _LOG_LEVEL_NO_LOG = 0;
var _LOG_LEVEL_ERROR = 1;
var _LOG_LEVEL_WARNING = 2;
var _LOG_LEVEL_INFO = 4;
var _LOG_LEVEL_DEBUG = 8;

module.exports = {
    CRAWLER:{
        workersCount:1,   //create Worker Thread count
        workerRetryMaxCount:3,  //worker max retry count
        requestTaskTimeElapse:500, //http request timeout
        workerHeartBeatTimeElapse:1000,  //worker heart time
        maxTaskInQueue:5,  
        workerTimeout:60000,
        debug:false
    },
    WORKER:{
        waitValidatingTime:1 * 30 * 1000,
        speedControl:500,
        autoRedirectionMaxDepth:1
    },
    PARSER:{
      defParserCodeFilePath:'./frame/dynamic_parser/parsers/parser.js'   //解析器路径 (本地调试时使用)
    },
    SERVER:{
         id:'',
         port:8885, ///调试端口,
         accessControl:{
            ipWhiteList:[]
         }
    },
    DATA_CENTER:{
        accessToken:'',
        hostname:'192.168.1.4',  //服务器地址
        port:8082,               
        agent:false,
        taskReqPath:'/getTask.do',  //获取任务接口
        taskReqMethod:'GET',
        taskReqHeaders:{},
        taskRspPath:'/commitTaskResult.do',  //提交解析数据接口
        taskRspMethod:'POST',
        taskRspHeaders:{
            'Host':'127.0.0.1',
            'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Encoding':'identity',
            'Connection':'keep-alive'
        }


    },
	//日志级别
    LOG:{
        level:_LOG_LEVEL_INFO,
        _LOG_LEVEL_NO_LOG:_LOG_LEVEL_NO_LOG,
        _LOG_LEVEL_ERROR:_LOG_LEVEL_ERROR,
        _LOG_LEVEL_WARNING:_LOG_LEVEL_WARNING,
        _LOG_LEVEL_INFO:_LOG_LEVEL_INFO,
        _LOG_LEVEL_DEBUG:_LOG_LEVEL_DEBUG
    },
    updateConfig:function(configData){
        var THIS_MODULE = this;
        try{
            var crawler = configData.CRAWLER;
            var worker = configData.WORKER;
            var server = configData.SERVER;
            var data_center = configData.DATA_CENTER;
            var log = configData.LOG;
            var parser = configData.PARSER;

            if(crawler != null && crawler != undefined){
                THIS_MODULE.CRAWLER = crawler;
            }

            if(worker != null && worker != undefined){
                THIS_MODULE.WORKER = worker;
            }

            if(server != null && server != undefined){
                THIS_MODULE.SERVER = server;
            }

            if(data_center != null && data_center != undefined){
                THIS_MODULE.DATA_CENTER = data_center;
            }

            if(log != null && log != undefined){
                THIS_MODULE.LOG = log;
            }

            if(parser != null && parser != undefined){
                THIS_MODULE.PARSER = parser;
            }

        }catch(exp){

        }
    }


};