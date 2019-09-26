var config = require('../config/config');
var utils = require('./utils');
var zlib = require('zlib');
var dynamic_parser = require('./dynamic_parser/dynamic_parser');
var request = require('request');

var _PIPE_MSG_WORKER_RUN_REQ = 100000;
var _PIPE_MSG_WORKER_RUN_RSP = 200000;

var _PIPE_MSG_WORKER_SEEKING_TASK_REQ = 100001;
var _PIPE_MSG_WORKER_SEEKING_TASK_RSP = 200001;


var _PIPE_MSG_WORKER_UPDATE_CONFIG_REQ = 100002;

var _PIPE_MSG_WORKER_UPDATE_PARSER_REQ = 100003;


var _PIPE_MSG_WORKER_HEART_BEAT_REQ = 100100;
var _PIPE_MSG_WORKER_HEART_BEAT_RSP = 200100;


var _TASK_TYPE_CRAWLING = 1;
var _TASK_TYPE_UPDATE_PARSER = 2;
var _TASK_TYPE_UPDATE_CONFIG = 3;


dynamic_parser.init();


var _WORKER = module.exports = {
    _CUR_TASK_INFO:null,
    _WID:null,
    _SEEKING_TASK_PENDDING:false,
    api_run:function(msg){
        var THIS_MODULE = this;
        THIS_MODULE._WID = msg.wid;
        THIS_MODULE.log('start to RUN.', config.LOG._LOG_LEVEL_ERROR);
        THIS_MODULE.doStartWorker();

    },
    api_onTaskSeekingRsp:function(msg){
        var THIS_MODULE = this;

        THIS_MODULE.log('-Got Task:' + JSON.stringify(msg), config.LOG._LOG_LEVEL_INFO);

        THIS_MODULE.log('-Seeking task End.', config.LOG._LOG_LEVEL_INFO);

        THIS_MODULE.seekingTaskPendding(false);


        THIS_MODULE.log('/***** Do Task Start.', config.LOG._LOG_LEVEL_INFO);

        if(msg.msgData != null){
            THIS_MODULE.doResetTask();
            THIS_MODULE._CUR_TASK_INFO = msg.msgData;
            THIS_MODULE._CUR_TASK_INFO.autoRedirectionDepth = 0;
            THIS_MODULE.log('Task msg check:' + JSON.stringify(msg), config.LOG._LOG_LEVEL_INFO);
            THIS_MODULE.doCurTask();
        }else{
           // _WORKER.log('api_onTaskSeekingRsp() call doTaskOver()', config.LOG._LOG_LEVEL_WARNING);
            THIS_MODULE.doTaskOver();
        }

    },
    ////////////////////////////////////////////////////////////////////////
    seekingTaskPendding:function(pendding){
        var THIS_MODULE = this;
        if(pendding == true || pendding == false){
            THIS_MODULE._SEEKING_TASK_PENDDING  = pendding;
            THIS_MODULE.log('---Seeking Task State changed:' + pendding, config.LOG._LOG_LEVEL_INFO);
        }else{
            return THIS_MODULE._SEEKING_TASK_PENDDING;
        }
    },
    ////////////////////////////////////////////////////////////////////////
    api_doHeartBeat:function(){
        var THIS_MODULE = this;
        process.send({wid:THIS_MODULE._WID, msg:_PIPE_MSG_WORKER_HEART_BEAT_RSP, msgData:{}});
        THIS_MODULE.log('Do heart beat Response.', config.LOG._LOG_LEVEL_INFO);
    },
    ////////////////////////////////////////////////////////////////////////
    doResetTask:function(){
        var THIS_MODULE = this;
        THIS_MODULE._CUR_TASK_INFO = null;
    },
    doStartWorker:function(){
        var THIS_MODULE = this;
        THIS_MODULE.doSeekingTask();
    },
    doSeekingTask:function(){
        var THIS_MODULE = this;
        if(THIS_MODULE.seekingTaskPendding() == true){
            THIS_MODULE.log('Seeking task pendding, cancel seeking.' , config.LOG._LOG_LEVEL_WARNING);
            return;
        }
        //THIS_MODULE.log('doSeekingTask()', config.LOG._LOG_LEVEL_WARNING);
        THIS_MODULE.seekingTaskPendding(true);
        var seekTaskTimer = setTimeout(function(){
            clearTimeout(seekTaskTimer);
            seekTaskTimer = null;
            THIS_MODULE.log('-Seeking task Start.', config.LOG._LOG_LEVEL_INFO);
            process.send({wid:THIS_MODULE._WID, msg:_PIPE_MSG_WORKER_SEEKING_TASK_REQ, msgData:{}});
        },config.WORKER.speedControl);

    },
    doCurTask:function(){
        var THIS_MODULE = this;

        THIS_MODULE.log('Do Task:' + JSON.stringify(THIS_MODULE._CUR_TASK_INFO.task), config.LOG._LOG_LEVEL_WARNING);

        var taskType = THIS_MODULE._CUR_TASK_INFO.task.type;

        if(taskType == _TASK_TYPE_CRAWLING){
            THIS_MODULE.doCrawling();
        }else if(taskType == _TASK_TYPE_UPDATE_PARSER ){
            // THIS_MODULE.doUpdateParser();
        }else if(taskType == _TASK_TYPE_UPDATE_CONFIG){
            //THIS_MODULE.doUpateConfig();
        }else{
            THIS_MODULE.log('Undefined task type:' + taskType + ', task over!', config.LOG._LOG_LEVEL_ERROR);
            THIS_MODULE.doTaskOver();
        }


    },
    api_doUpdateParser:function(msg){
        var THIS_MODULE = this;
        try{
            THIS_MODULE.log('Do update parser.', config.LOG._LOG_LEVEL_WARNING);
            dynamic_parser.updateParsers(msg.msgData.task.taskData.parsers);
        }catch(exp){
            THIS_MODULE.log('Update parser code exception:' + exp.message);
        }
    },
    api_doUpateConfig:function(msg){
        var THIS_MODULE = this;
        try{
            THIS_MODULE.log('Do update CONFIG.', config.LOG._LOG_LEVEL_WARNING);
            config.updateConfig(msg.msgData.task.taskData.config);
        }catch(exp){
            THIS_MODULE.log('Update CONFIG code exception:' + exp.message);
        }
    },
    doCrawling:function(){
        var THIS_MODULE = this;
        THIS_MODULE.log('Start DoCrawling......', config.LOG._LOG_LEVEL_INFO);
        THIS_MODULE.log('Start Task Options :' + JSON.stringify(THIS_MODULE._CUR_TASK_INFO.task), config.LOG._LOG_LEVEL_INFO);
        var taskData = THIS_MODULE._CUR_TASK_INFO.task;
        var reqOptions = taskData.crawlingOptions;
        var parserCode = taskData.code;
        THIS_MODULE.log('Crawling options check, HEADERS:' + JSON.stringify(reqOptions.headers), config.LOG._LOG_LEVEL_INFO);
        THIS_MODULE.log('Crawling options check, OPTIONS:' + JSON.stringify(reqOptions), config.LOG._LOG_LEVEL_INFO);
        THIS_MODULE.log('Crawling options check, PARSERS:' + JSON.stringify(taskData.code), config.LOG._LOG_LEVEL_INFO);

        taskData.timeStartCrawling = new Date();

        //Update using request module
        request(reqOptions, (error, rsp, body)=>{
            if(error){
                __OnHttpReqError(error);
                return;
            }else{
                __onHttpRsp(rsp, body,taskData);

            }
        });

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        function __onHttpRsp(rsp, body,taskData){

            if(rsp.statusCode == '200'){

                THIS_MODULE.log('HTTP 200 header:' + JSON.stringify(rsp.headers), config.LOG._LOG_LEVEL_DEBUG);
                THIS_MODULE.log('Handle rsp data buffer with encoding', config.LOG._LOG_LEVEL_DEBUG);
                THIS_MODULE.doParsingEx(rsp.headers, body, Buffer.from(body),taskData);

            }else if(rsp.statusCode == '302' || rsp.statusCode == '301'){

                THIS_MODULE.log('Do crawling encounter HTTP ' + rsp.statusCode + ', header:' + JSON.stringify(rsp.headers), config.LOG._LOG_LEVEL_WARNING);
                var location = rsp.headers['location'];
                THIS_MODULE.doRedirection(rsp, location);
            }else{
                THIS_MODULE.log('Do crawling HTTP error, state:' + rsp.statusCode, config.LOG._LOG_LEVEL_ERROR);
                THIS_MODULE.doCommitTaskResult({httpState:rsp.statusCode});
                THIS_MODULE.doCrawlingError();
            }
        }

        function __OnHttpReqError(e){
            try{
                if(typeof e == 'object'){
                    THIS_MODULE.log('Do crawling HTTP error:' + e.message +', DROP mission:' + JSON.stringify(THIS_MODULE._CUR_TASK_INFO) + ', stack:' + e.stack, config.LOG._LOG_LEVEL_ERROR);
                }else{
                    THIS_MODULE.log('Do crawling HTTP error, null error object, DROP mission:' + + JSON.stringify(THIS_MODULE._CUR_TASK_INFO), config.LOG._LOG_LEVEL_ERROR);
                }
            }catch(exp){

            }
            THIS_MODULE.doCrawlingError();
        }
    },
    doParsingEx:function(headers,htmlString, dataBuff,taskData){

        var THIS_MODULE = this;
        var result = dynamic_parser.doCustomParser(htmlString, dataBuff,taskData.code);
        
        //Set task seqId
        result.taskSeq = taskData.seqId;

        THIS_MODULE.doCommitTaskResult(result);
        THIS_MODULE.doTaskOver();

        _checkResutl();

        ///////////////////////////
        function _checkResutl(){
            utils.log('@{Check parse result} task: ' + JSON.stringify(result), config.LOG._LOG_LEVEL_INFO);
        }
    },
    doCommitTaskResult:function(result, callbak){
        var THIS_MODULE = this;

        var taskData = THIS_MODULE._CUR_TASK_INFO.task;

        if(typeof callbak != 'function'){
            callbak = function () {};
        }

        var timeUsed = (new Date() - 0) - (taskData.timeStartCrawling - 0);

        if(result){

            var options = {
                hostname: config.DATA_CENTER.hostname,
                port: config.DATA_CENTER.port,
                path:config.DATA_CENTER.taskRspPath,
                method:config.DATA_CENTER.taskRspMethod,
                headers:config.DATA_CENTER.taskRspHeaders
            };


           THIS_MODULE.log('Do commit task result:' + JSON.stringify(result), config.LOG._LOG_LEVEL_INFO);
           THIS_MODULE.log('Do commit task options:' + JSON.stringify(options), config.LOG._LOG_LEVEL_INFO);

            utils.httpRequest_POST(options,result,
                function(err){
                    THIS_MODULE.log('Do commit crwaling result data error:' + err.message, config.LOG._LOG_LEVEL_ERROR);
                    callbak();
                },
                function(rsp, rspDataBuff){
                    if(rsp.statusCode !== 200){
                        THIS_MODULE.log('Do commit crwaling result data error, HTTP state:' + rsp.statusCode, config.LOG._LOG_LEVEL_ERROR);
                        THIS_MODULE.log('Do commit crwaling result data error, rsp headers:' + JSON.stringify(rsp.headers), config.LOG._LOG_LEVEL_ERROR);
                    }else{
                        THIS_MODULE.log('Do commit crwaling result data SUCCESS, HTTP state:' + rsp.statusCode, config.LOG._LOG_LEVEL_INFO);
                        THIS_MODULE.log('Do commit crwaling result data SUCCESS, rsp headers:' + JSON.stringify(rsp.headers), config.LOG._LOG_LEVEL_INFO);
                    }

                    callbak();
                }
            );

        }
    },
    doRedirection:function(rsp, location){
        var THIS_MODULE = this;

        var parsedLocationUrl = utils.urlParse(location);

        if(THIS_MODULE._CUR_TASK_INFO.autoRedirectionDepth < config.WORKER.autoRedirectionMaxDepth){
            THIS_MODULE.log('Do auto redirection, path:' + location + ', cur depth:' + THIS_MODULE._CUR_TASK_INFO.autoRedirectionDepth,
                config.LOG._LOG_LEVEL_WARNING);

            var targetHostname = null;

            if(parsedLocationUrl.hostname == '' || parsedLocationUrl.hostname == null || parsedLocationUrl.hostname == undefined){
                targetHostname = THIS_MODULE._CUR_TASK_INFO.task.taskData.crawlingOptions.hostname;
            }else{
                targetHostname = parsedLocationUrl.hostname;
            }

            THIS_MODULE._CUR_TASK_INFO.autoRedirectionDepth++;
            THIS_MODULE._CUR_TASK_INFO.task.taskData.crawlingOptions.hostname = targetHostname;
            THIS_MODULE._CUR_TASK_INFO.task.taskData.crawlingOptions.headers['Host'] = parsedLocationUrl.hostname;
            THIS_MODULE._CUR_TASK_INFO.task.taskData.crawlingOptions.path = parsedLocationUrl.path;
            THIS_MODULE.doCrawling();
            THIS_MODULE.log('Do auto redirection, options:' + JSON.stringify(THIS_MODULE._CUR_TASK_INFO.task.taskData.crawlingOptions),
                config.LOG._LOG_LEVEL_WARNING);
        }else{
            THIS_MODULE.log('Redirection overflow,commit result.',
                config.LOG._LOG_LEVEL_WARNING);
            THIS_MODULE._CUR_TASK_INFO.autoRedirectionDepth = 0;
            THIS_MODULE.doCommitTaskResult({httpState:302, location:location});
            THIS_MODULE.doCrawlingError();
        }


    },
    doEncounterValidatingPage:function(){
        var THIS_MODULE = this;
        THIS_MODULE.doCrawlingError();
    },
    doCrawlingError:function(){
        var THIS_MODULE = this;
        THIS_MODULE.doTaskOver();
    },
    doTaskOver:function(){
        var THIS_MODULE = this;
        THIS_MODULE.log('*****/ Do Task Over', config.LOG._LOG_LEVEL_INFO);
        THIS_MODULE.doSeekingTask();
    },

    log:function(log,level){
        var THIS_MODULE = this;
        utils.log('<Worker{' + THIS_MODULE._WID + '}>:' + log, level);
    }
};



process.on('message', function(msg){
    _WORKER.log('Check  recv cmd:' + JSON.stringify(msg), config.LOG._LOG_LEVEL_INFO);
    switch(msg.msg){
        case _PIPE_MSG_WORKER_RUN_REQ:
            _WORKER.api_run(msg);
            break;
        case _PIPE_MSG_WORKER_UPDATE_CONFIG_REQ:

            _WORKER.log('Recv update CONFIG message.', config.LOG._LOG_LEVEL_WARNING);
            _WORKER.api_doUpateConfig(msg);
            break;
        case _PIPE_MSG_WORKER_UPDATE_PARSER_REQ:
            _WORKER.log('Recv update PARSER message.', config.LOG._LOG_LEVEL_WARNING);
            _WORKER.api_doUpdateParser(msg);
            break;
        case _PIPE_MSG_WORKER_SEEKING_TASK_RSP:
            _WORKER.api_onTaskSeekingRsp(msg);
            break;
        case _PIPE_MSG_WORKER_HEART_BEAT_REQ:
            _WORKER.api_doHeartBeat(msg);
            break;
        default:
            _WORKER.log('Error: recv undefined cmd:' + msg.msg, config.LOG._LOG_LEVEL_ERROR);
    }

});

process.on('exit', function(){
    _WORKER.log('Worker Exit!');
});


////////////////////////////////////////////////

function _defCallback(){}
