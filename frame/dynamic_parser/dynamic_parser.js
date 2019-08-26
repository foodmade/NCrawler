var cheerio = require('cheerio');
var urlencode = require('urlencode');
var config = require('../../config/config');
var utils = require('../utils');
var vm = require('vm');
var lineReader = require('line-reader');
var iconv = require('iconv-lite');

var _RETCODE_SUCCESS = 1;
var _RETCODE_VALIDATING = -1;
var _RETCODE_UNPARSEABLE = -2;
var _RETCODE_ALL_HANDLER_FAILED = - 10000;

module.exports = {
    _PARSERS:[],
    init:function() {
        var THIS_MODULE = this;
        THIS_MODULE.loadDefaultParsers();
    },
    loadDefaultParsers:function(){
        var THIS_MODULE = this;

        try{

            var path = config.PARSER.defParserCodeFilePath;

            if(!path || path == ''){
                THIS_MODULE.log('Load default parser error:' + path, config.LOG._LOG_LEVEL_ERROR);
                return;
            }

            var parser = {
                parserCode:''
            };

            THIS_MODULE._PARSERS.push(parser);
            lineReader.eachLine(path, function(line, last) {
                line = line.replace(/<\/?.+?>/g, '');
                line = line.replace(/[\r\n]/g, '');
                line = line.replace(/(^\s*)|(\s*$)/g, '');
                parser.parserCode += line;
                if(last == true){
                    THIS_MODULE.log('Default parser check:' + JSON.stringify(THIS_MODULE._PARSERS), config.LOG._LOG_LEVEL_WARNING);
                }
            });


        }catch(exp){
            THIS_MODULE.log('Load default parser exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
        }

    },
    updateParsers:function(parsers){
        var THIS_MODULE = this;
        THIS_MODULE._PARSERS = parsers;

        THIS_MODULE.log('Updating parser OK, parsers:' + JSON.stringify(THIS_MODULE._PARSERS),
            config.LOG._LOG_LEVEL_WARNING);
    },
    doParse:function(htmlString, dataBuff){
        var THIS_MODULE = this;
        var result = {};

        if(THIS_MODULE._PARSERS.length <= 0){
            THIS_MODULE.log('No Data Parsers !!!', config.LOG._LOG_LEVEL_ERROR);
        }

        for(var i = 0; i < THIS_MODULE._PARSERS.length; ++i){
            try{
                var dParser = THIS_MODULE._PARSERS[i];
                var sharedParam = {
                    vm:vm,
                    Buffer:Buffer,
                    iconv:iconv,
                    urlencode:urlencode,
                    htmlString:htmlString,
                    dataBuff:dataBuff,
                    utils:utils,
                    cheerio:cheerio,
                    config:config,
                    parserInfo:{},
                    result:{}
                };

                vm.runInNewContext(dParser.parserCode, sharedParam);
                result = sharedParam.result;
                var parserInfo = sharedParam.parserInfo;
                if(result.retcode == _RETCODE_SUCCESS){
                    THIS_MODULE.log('DParser ' + parserInfo.index + '(ver ' + parserInfo.ver +  ') parse OK, retcode:' + result.retcode,
                        config.LOG._LOG_LEVEL_INFO);
                    return result;
                }else{
                    THIS_MODULE.log('DParser ' + parserInfo.index + '(ver ' + parserInfo.ver +  ') parse Failed, retcodes:' + result.retcode,
                        config.LOG._LOG_LEVEL_WARNING);
                }

            }catch(exp){
                THIS_MODULE.log('DParser ' + i + ' do parsing exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
                THIS_MODULE.log('DParser ' + i + ' do parsing exception:' + exp.stack, config.LOG._LOG_LEVEL_ERROR);
            }
        }
        result.retcode = _RETCODE_ALL_HANDLER_FAILED;
        return result;
    },
    log:function(log, level){
        utils.log('<Dynamic parser> ' + log, level);
    }
};