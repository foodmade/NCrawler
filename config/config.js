var _LOG_LEVEL_NO_LOG = 0;
var _LOG_LEVEL_ERROR = 1;
var _LOG_LEVEL_WARNING = 2;
var _LOG_LEVEL_INFO = 4;
var _LOG_LEVEL_DEBUG = 8;

module.exports = {
    CRAWLER:{
        workersCount:1,                   //Number of Workers Created. The same number of CPU cores as your server
        workerRetryMaxCount:3,            //Maximum number of retries in case of an exception to work execution
        requestTaskTimeElapse:500,        //Http Request Timeout
        workerHeartBeatTimeElapse:1000,   //Worker threads with the heartbeat of the control center
        maxTaskInQueue:5,                 //Worker's task queue
        workerTimeout:60000,              //Task execution timeout
        debug:false,                       //If it's local debugging set true
        taskIndex:0                       //The task sequence number
    },
    WORKER:{
        waitValidatingTime:1 * 30 * 1000,
        speedControl:500,
        autoRedirectionMaxDepth:1
    },
    PARSER:{
      defParserCodeFilePath:''   //Parser path (used for local debugging)
    },
    SERVER:{
         id:'',
         port:8885, //Debugging port
         accessControl:{
            ipWhiteList:[]
         }
    },
    DATA_CENTER:{
        accessToken:'',
        hostname:'127.0.0.1',              //Server address
        port:8080,
        agent:false,
        taskReqPath:'/crawler/manage/getJsTask',         //Fetch Task For Server
        taskReqMethod:'GET',               //Protocol
        taskReqHeaders:{},                 //Headers....
        taskRspPath:'/crawler/manage/commitJsTask',//Submit crawler parsed data to the server
        taskRspMethod:'POST',
        taskRspHeaders:{
            'Host':'127.0.0.1',
            'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Encoding':'identity',
            'Connection':'keep-alive',
            'Content-Type':'application/json;charset=UTF-8'
        }
    },
	//Logger Level
    LOG:{
        level:_LOG_LEVEL_INFO,
        _LOG_LEVEL_NO_LOG:_LOG_LEVEL_NO_LOG,
        _LOG_LEVEL_ERROR:_LOG_LEVEL_ERROR,
        _LOG_LEVEL_WARNING:_LOG_LEVEL_WARNING,
        _LOG_LEVEL_INFO:_LOG_LEVEL_INFO,
        _LOG_LEVEL_DEBUG:_LOG_LEVEL_DEBUG
    },
    //
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