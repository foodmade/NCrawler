var workerFactory = require('child_process');
var path = require('path');
var config = require('../config/config');
var utils = require('./utils');
var test_data = require('./test_data/test_data');

var crawlerConf = config.CRAWLER;

var _PIPE_MSG_WORKER_RUN_REQ = 100000;

var _PIPE_MSG_WORKER_SEEKING_TASK_REQ = 100001;
var _PIPE_MSG_WORKER_SEEKING_TASK_RSP = 200001;


var _PIPE_MSG_WORKER_UPDATE_CONFIG_REQ = 100002;

var _PIPE_MSG_WORKER_UPDATE_PARSER_REQ = 100003;


var _PIPE_MSG_WORKER_HEART_BEAT_REQ = 100100;
var _PIPE_MSG_WORKER_HEART_BEAT_RSP = 200100;

var workerPath = path.join(__dirname, 'worker_custom.js');

var _WORKER_STATE_ALIVE = 1;

var _REQ_TASK_STATE_FREE = 1;
var _REQ_TASK_STATE_PENDDING = 2;

var _TASK_TYPE_UPDATE_PARSER = 2;
var _TASK_TYPE_UPDATE_CONFIG = 3;


var _TEST_TASKS = test_data.TEST_DATA_TASKS.TEST_TASKS;

var _CRAWLER_STATE_RUNNING = 1;
var _CRAWLER_STATE_STANDING = 0;


var _TASK_REQ_STATE_OK = 1;
var _TASK_REQ_STATE_ERROR = 0;



module.exports = {
    _TASK_REQ_STATE:_TASK_REQ_STATE_ERROR,
    _STATE:_CRAWLER_STATE_STANDING,
    _WORKERS:[],
    _TASK_QUEUE:[],
    _UUID:-1,
    _REQUEST_TASKS_STATE:_REQ_TASK_STATE_FREE,
    _REQUEST_TASKS_TIMER:null,
    _REQUEST_TASKS_COUNTER:0,
    _WORKER_HEART_BEAT_TIMER:null,
    _CACHED_TASK_CONFIG:null,
    _CACHED_TASK_PARSERS:null,
    _DEBUG_PATTERN:false,
    init:function(options){
        var THIS_MODULE = this;
        THIS_MODULE._UUID = options.uuid;
        THIS_MODULE._DEBUG_PATTERN=config.CRAWLER.debug;

    },
    crawlerStart: function () {
        var ret = 'I am here.';
        var THIS_MODULE = this;

        if(THIS_MODULE._REQUEST_TASKS_TIMER != null){
            THIS_MODULE.log('crawlerStart(), but is running, ignore.', config.LOG._LOG_LEVEL_ERROR);
            ret = 'I am already here.';
            return ret;
        }

        THIS_MODULE.log('crawlerStart().', config.LOG._LOG_LEVEL_DEBUG);
        THIS_MODULE.activateWorkers();

        THIS_MODULE._REQUEST_TASKS_TIMER = setInterval(function(){
            THIS_MODULE.requestTasks();
            THIS_MODULE.checkWorkersState();
            THIS_MODULE.workersHeartBeat();
        },config.CRAWLER.requestTaskTimeElapse);

        THIS_MODULE._STATE = _CRAWLER_STATE_RUNNING;
        return ret;
    },
    crawlerState:function(){
        var THIS_MODULE = this;
        var ret = '';

        try{

            var wState = [];
            for(var i = 0; i < THIS_MODULE._WORKERS.length; ++i){
                var worker = THIS_MODULE._WORKERS[i];

                wState.push({
                   seeking_task_time_elapse:((new Date()).getTime() - worker.seekingTaskTimeStamp)
                });
            }

            var state = {
                task_req_state:THIS_MODULE._TASK_REQ_STATE,
                crawler_state:THIS_MODULE._STATE,
                data_center_req:1,
                task_queue_length:THIS_MODULE._TASK_QUEUE.length,
                workers:wState
            };

            ret = JSON.stringify(state);

        }catch(exp){
            ret = 'Call state exception!';
        }

        return ret;
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    workersHeartBeat:function(){

        var THIS_MODULE = this;
        for(var i in THIS_MODULE._WORKERS){
            var worker = THIS_MODULE._WORKERS[i];
            if(worker != null && worker.process != null){
                THIS_MODULE.log('Detect worker{' + worker.wid  + '} heart beat.', config.LOG._LOG_LEVEL_INFO);
                THIS_MODULE.sendWorkerMessage(worker, worker.wid, _PIPE_MSG_WORKER_HEART_BEAT_REQ, {});
            }else{
                THIS_MODULE.log('NULL worker when heart beating.', config.LOG._LOG_LEVEL_ERROR);
            }
        }
    },
    onWorkerHeartBeatRsp:function(wid){
        var THIS_MODULE = this;

        var worker = THIS_MODULE._WORKERS[wid];
        if(worker != null){
            THIS_MODULE.log('Update Worker{' + worker.wid + '} heart beat timestamp.', config.LOG._LOG_LEVEL_INFO);
            worker.heartBeatTimeStamp = (new Date()).getTime();
        }else{
            THIS_MODULE.log('Update Worker{' + worker.wid + '} heart beat timestamp ERROR.', config.LOG._LOG_LEVEL_DEBUG);
        }

    },
    checkWorkersState:function(){
        var THIS_MODULE = this;
        for(var i in THIS_MODULE._WORKERS){
            var worker = THIS_MODULE._WORKERS[i];

            var timeElapse = (new Date()).getTime() - worker.heartBeatTimeStamp;
            var timeElapseSeekingTask = (new Date()).getTime() - worker.seekingTaskTimeStamp;

            THIS_MODULE.log('Worker state check, heart beat time elapse:' + timeElapse + ', seeking task time elapse:' + timeElapseSeekingTask, config.LOG._LOG_LEVEL_INFO);


            if(timeElapseSeekingTask > config.CRAWLER.workerTimeout){
                THIS_MODULE.log('Worker{' + worker.wid + '} Seeking task timeout: ' + timeElapseSeekingTask + ', restart.', config.LOG._LOG_LEVEL_ERROR);
                worker = THIS_MODULE.reactiveSingleWorker(worker.wid);


                if(THIS_MODULE.getCachedParsers() != null){
                    THIS_MODULE.sendWorkerMessage(worker, worker.wid,
                        _PIPE_MSG_WORKER_UPDATE_PARSER_REQ,
                        {task:THIS_MODULE.getCachedParsers()});
                    THIS_MODULE.log('Cached parsers updated:' + JSON.stringify(THIS_MODULE.getCachedParsers()),
                        config.LOG._LOG_LEVEL_ERROR);

                    var timeOut = setTimeout(function(){
                        clearTimeout(timeOut);
                        timeOut = null;
                        THIS_MODULE.sendWorkerMessage(worker, worker.wid,
                            _PIPE_MSG_WORKER_UPDATE_PARSER_REQ,
                            {task:THIS_MODULE.getCachedParsers()});
                    },3000);
                }else{
                    THIS_MODULE.log('NULL Cached parsers! Using Default.',
                        config.LOG._LOG_LEVEL_ERROR);

                }

                if(THIS_MODULE.getCachedConfig() != null){
                    THIS_MODULE.sendWorkerMessage(worker, worker.wid,
                        _PIPE_MSG_WORKER_UPDATE_CONFIG_REQ,
                        {task:THIS_MODULE.getCachedConfig()});
                    THIS_MODULE.log('Cached config to updated:' + JSON.stringify(THIS_MODULE.getCachedConfig()),
                        config.LOG._LOG_LEVEL_ERROR);

                    var timeOut = setTimeout(function(){
                        clearTimeout(timeOut);
                        timeOut = null;
                        THIS_MODULE.sendWorkerMessage(worker, worker.wid,
                            _PIPE_MSG_WORKER_UPDATE_CONFIG_REQ,
                            {task:THIS_MODULE.getCachedConfig()});
                    },1000);

                }else{
                    THIS_MODULE.log('NULL Cached configs! Using Default.',
                        config.LOG._LOG_LEVEL_ERROR);
                }
            }
        }
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    requestTasks:function(){
        var THIS_MODULE = this;


        THIS_MODULE._REQUEST_TASKS_COUNTER ++;

        if(config.CRAWLER.maxTaskInQueue - THIS_MODULE._TASK_QUEUE.length < config.CRAWLER.maxTaskInQueue ){
            THIS_MODULE.log('Warning , task queue not empty, request task CANCELED, cur:' + THIS_MODULE._TASK_QUEUE.length + ', max:' + config.CRAWLER.maxTaskInQueue ,
                config.LOG._LOG_LEVEL_INFO);
            return;
        }

        if(THIS_MODULE._REQUEST_TASKS_STATE == _REQ_TASK_STATE_PENDDING){
            THIS_MODULE.log('Warning , request task pendding, request task CANCELED,cur:' + THIS_MODULE._TASK_QUEUE.length,
                config.LOG._LOG_LEVEL_INFO);
            return;
        }

        THIS_MODULE._REQUEST_TASKS_STATE = _REQ_TASK_STATE_PENDDING;

        if(THIS_MODULE._REQUEST_TASKS_COUNTER % 100 == 0){
            THIS_MODULE.log('Request for TASKS(' + THIS_MODULE._REQUEST_TASKS_COUNTER + ')...', config.LOG._LOG_LEVEL_WARNING);
        }

        THIS_MODULE.getWorkingSet(function(tasks, getTasksTimeSpent){

            if(tasks != null && tasks.length > 0){
                THIS_MODULE._TASK_REQ_STATE = _TASK_REQ_STATE_OK;
                THIS_MODULE.appendTasks(tasks, getTasksTimeSpent);
            }else{
                THIS_MODULE._TASK_REQ_STATE = _TASK_REQ_STATE_ERROR;
            }

            //Local Debugging Task
            if(THIS_MODULE._DEBUG_PATTERN){
                THIS_MODULE.appendTasks([_TEST_TASKS[config.CRAWLER.taskIndex]]);
            }

            THIS_MODULE._REQUEST_TASKS_STATE = _REQ_TASK_STATE_FREE;
        });


    },
    appendTasks:function(tasks, getTasksTimeSpent){
        var THIS_MODULE = this;
        if(tasks == null || tasks == undefined){
            THIS_MODULE.log('Append  task error, "null" tasks.', config.LOG._LOG_LEVEL_ERROR);
            return;
        }


        for(var i in tasks){
            
            if(tasks[i].type == _TASK_TYPE_UPDATE_CONFIG){
                THIS_MODULE.log('Get update CONFIG task:' + JSON.stringify(tasks[i]), config.LOG._LOG_LEVEL_WARNING);
                THIS_MODULE.setCachedConfig(tasks[i]);
                THIS_MODULE.workersUpdateConfig(tasks[i]);
                config.updateConfig(tasks[i].taskData.config);
            }else if(tasks[i].type == _TASK_TYPE_UPDATE_PARSER){
                THIS_MODULE.log('Get update PARSER task:' + JSON.stringify(tasks[i]), config.LOG._LOG_LEVEL_WARNING);
                THIS_MODULE.setCachedParsers(tasks[i]);
                THIS_MODULE.workersUpdateParser(tasks[i]);
            }else{

                if(THIS_MODULE._TASK_QUEUE.length >= config.CRAWLER.maxTaskInQueue){
                    THIS_MODULE.log('Crawler task queue FULL.drop tasks.', config.LOG._LOG_LEVEL_WARNING);
                    return;
                }

                tasks[i].get_tasks_time_spent = getTasksTimeSpent;
                THIS_MODULE._TASK_QUEUE.push(tasks[i]);
                THIS_MODULE.log('New task enqueue:' + JSON.stringify(tasks[i]), config.LOG._LOG_LEVEL_DEBUG);
            }

        }

    },
    dispatchTasks:function(wid){
        var THIS_MODULE = this;

        var targetTask = THIS_MODULE._TASK_QUEUE.shift();
        THIS_MODULE.log('-Get task json:' + JSON.stringify(targetTask),config.LOG._LOG_LEVEL_DEBUG);
        var worker = THIS_MODULE._WORKERS[wid];

        if(targetTask != null && targetTask != undefined && worker != null){

            worker.seekingTaskTimeStamp = (new Date()).getTime();
            THIS_MODULE.sendWorkerMessage(worker, wid,_PIPE_MSG_WORKER_SEEKING_TASK_RSP, {
                task:targetTask
            });

        }else{

            if(THIS_MODULE._REQUEST_TASKS_COUNTER % 100 == 0){
                var bTask = (targetTask == null || targetTask == undefined) ? false : true;
                var bWorker =  (worker == null || worker == undefined) ? false : true;
                THIS_MODULE.log('Warning, NULL task dispatched, task:' + bTask + ', worker:' + bWorker + ', task queue:' + THIS_MODULE._TASK_QUEUE.length, config.LOG._LOG_LEVEL_WARNING);
            }
            worker.seekingTaskTimeStamp = (new Date()).getTime();
            THIS_MODULE.sendWorkerMessage(worker, wid, _PIPE_MSG_WORKER_SEEKING_TASK_RSP, null);
        }
    },
    workersUpdateConfig:function(task){
        var THIS_MODULE = this;
        try{

            for(var i in THIS_MODULE._WORKERS){
                var worker = THIS_MODULE._WORKERS[i];
                var wid = worker.wid;
                THIS_MODULE.sendWorkerMessage(worker, wid, _PIPE_MSG_WORKER_UPDATE_CONFIG_REQ, {task:task});
            }

        }catch(exp){
            THIS_MODULE.log('Send worker update CONFIG task exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
            THIS_MODULE.log('Send worker update CONFIG task exception:' + exp.stack, config.LOG._LOG_LEVEL_ERROR);
        }



    },
    workersUpdateParser:function(task){
        var THIS_MODULE = this;

        try{

            for(var i in THIS_MODULE._WORKERS){
                var worker = THIS_MODULE._WORKERS[i];
                var wid = worker.wid;
                THIS_MODULE.sendWorkerMessage(worker, wid, _PIPE_MSG_WORKER_UPDATE_PARSER_REQ, {task:task});
            }

        }catch(exp){
            THIS_MODULE.log('Send worker update PARSER task exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
            THIS_MODULE.log('Send worker update PARSER task exception:' + exp.stack, config.LOG._LOG_LEVEL_ERROR);
        }

    },
    activateWorkers:function(){
        var THIS_MODULE = this;
        THIS_MODULE._WORKERS = [];
        for(var i = 0; i < crawlerConf.workersCount; ++i){
            THIS_MODULE._WORKERS.push(THIS_MODULE.activateSingleWorker(i));
        }

    },
    activateSingleWorker:function(wid){
        var THIS_MODULE = this;
        THIS_MODULE.log('Worker[' + wid + '] SPWANED ! Path:' + workerPath, config.LOG._LOG_LEVEL_ERROR);
        var worker = {
            wid:wid,
            process:new workerFactory.fork(workerPath),
            state:_WORKER_STATE_ALIVE,
            heartBeatTimeStamp:(new Date()).getTime(),
            seekingTaskTimeStamp:(new Date()).getTime()
        } ;
        worker.process.on('message', __onWorkerMsg);

        THIS_MODULE.sendWorkerMessage(worker, wid, _PIPE_MSG_WORKER_RUN_REQ, {});

        return worker;

        /////////////////////////////////////////////////
        function __onWorkerMsg(msg){
                
            var wid = msg.wid;

            switch(msg.msg){
                case _PIPE_MSG_WORKER_SEEKING_TASK_REQ  :
                    THIS_MODULE.dispatchTasks(wid);
                    break;
                case _PIPE_MSG_WORKER_HEART_BEAT_RSP:
                    THIS_MODULE.onWorkerHeartBeatRsp(wid);
                    break;
                default:
                    THIS_MODULE.log('Recv undefined IPC cmd:' + msg.msg, config.LOG._LOG_LEVEL_ERROR);
            }

        }
    },
    //////////////////////////////////////////////////////////////
    reactiveSingleWorker:function(wid){
        var THIS_MODULE = this;
        THIS_MODULE.killWorker(wid);
        THIS_MODULE._WORKERS[wid] = THIS_MODULE.activateSingleWorker(wid);
        return THIS_MODULE._WORKERS[wid];
    },
    killWorker:function(wid){
        var THIS_MODULE = this;
        var worker = THIS_MODULE._WORKERS[wid];
        if(worker != null && worker.process != null){
            worker.process.kill();
            worker.process = null;
        }

    },
    ///////////////////////////////////////////////////////////////
    getWorkingSet:function(callBack){

        var THIS_MODULE = this;
        var getOptions = {
            hostname:config.DATA_CENTER.hostname,
            port: config.DATA_CENTER.port,
            path: config.DATA_CENTER.taskReqPath,
            method: config.DATA_CENTER.taskReqMethod,
            headers:config.DATA_CENTER.taskReqHeaders,
            agent:config.DATA_CENTER.agent
        };

        if(THIS_MODULE._DEBUG_PATTERN){
            THIS_MODULE.log('debug pattren ........',config.LOG._LOG_LEVEL_DEBUG);
            callBack(null,-1);
        }

        THIS_MODULE.log('start getting remote tasks.', config.LOG._LOG_LEVEL_DEBUG);
        THIS_MODULE.log('host:' + getOptions.hostname, config.LOG._LOG_LEVEL_DEBUG);
        THIS_MODULE.log('port:' + getOptions.port, config.LOG._LOG_LEVEL_DEBUG);
        THIS_MODULE.log('path:' + getOptions.path, config.LOG._LOG_LEVEL_DEBUG);



        var getTasksTimeStartCrawling = new Date() - 0;

        utils.httpRequest_GET(getOptions,
            function(err){
                THIS_MODULE.log('Get working set err:' + err.message, config.LOG._LOG_LEVEL_ERROR);
                callBack(null);

            },
            function(rsp, rspDataBuff){

                var timeUsed = (new Date() - 0) - (getTasksTimeStartCrawling - 0);

                if (rsp.statusCode == '200') {

                    if(THIS_MODULE._REQUEST_TASKS_COUNTER % 100 == 0){
                        THIS_MODULE.log('Get working set rsp(' + THIS_MODULE._REQUEST_TASKS_COUNTER + '), state:200, data:' + rspDataBuff.toString(), config.LOG._LOG_LEVEL_WARNING);
                    }

                    var rspDataObj = null;
                    try{
                        THIS_MODULE.log('Task JSON :' + rspDataBuff.toString(), config.LOG._LOG_LEVEL_DEBUG);
                        rspDataObj = JSON.parse(rspDataBuff.toString());
                        
                    }catch(exp){
                        THIS_MODULE.log('Error, Task JSON parse FAILED:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
                        THIS_MODULE.log('Errro, Task JSON :' + rspDataBuff.toString(), config.LOG._LOG_LEVEL_ERROR);
                        rspDataObj = null;
                    }

                    callBack(rspDataObj, timeUsed);
                } else {
                    THIS_MODULE.log('Get working set rsp ERROR, state:' + rsp.statusCode, config.LOG._LOG_LEVEL_ERROR);
                    callBack(null, -1);

                }
            }
        );



    },
    sendWorkerMessage:function(worker, wid, msg, msgData){
        var THIS_MODULE = this;
        try{
            if(worker != null && worker.process != null){
                THIS_MODULE.log('Send worker{' + wid + '} message:' + msg,config.LOG._LOG_LEVEL_INFO);
                worker.process.send({wid:wid, msg:msg, msgData:msgData});
            }else{
                THIS_MODULE.log('Send worker{' + wid + '} message error, NULL worker, msg:' + msg, config.LOG._LOG_LEVEL_ERROR);
            }
        }catch(exp){
            THIS_MODULE.log('Send worker{' + wid + '} message exception:' + exp.message,config.LOG._LOG_LEVEL_ERROR);
        }

    },
    getCachedConfig:function(){
        var THIS_MODULE = this;
        return THIS_MODULE._CACHED_TASK_CONFIG;

    },
    setCachedConfig:function(configTask){
        var THIS_MODULE = this;

        THIS_MODULE._CACHED_TASK_CONFIG = configTask;

    },
    setCachedParsers:function(parsersTask){
        var THIS_MODULE = this;

        THIS_MODULE._CACHED_TASK_PARSERS = parsersTask;
    },
    getCachedParsers:function(){
        var THIS_MODULE = this;
        return THIS_MODULE._CACHED_TASK_PARSERS;

    },
    log:function(log, level){
        var THIS_MODULE = this;
        utils.log('<Crawler{' + THIS_MODULE._UUID + '}>:' + log, level);
    }
};