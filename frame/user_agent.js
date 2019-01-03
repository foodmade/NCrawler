var lineReader = require('line-reader');
var config = require('../config/config');
var utils = require('./utils');

var FILE_PATH = './config/user_agent.txt';
var DEF_USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36';
var USER_AGENT = [];



lineReader.eachLine(FILE_PATH, function(line, last) {

    line = line.replace(/<\/?.+?>/g, '');
    line = line.replace(/[\r\n]/g, '');
    line = line.replace(/(^\s*)|(\s*$)/g, '');
    USER_AGENT.push((line));
});

var _USER_AGENT_MGR = {
    randomUserAgent: function () {
        var choice = DEF_USER_AGENT;

        if(USER_AGENT.length > 0){
            var index = Math.floor(Math.random()*USER_AGENT.length);
            choice = USER_AGENT[index];
            utils.log('User agent index:' + index + ', content:' + choice, config.LOG._LOG_LEVEL_DEBUG);
        }

        return choice;
    }
};




exports.USER_AGENT_MGR = _USER_AGENT_MGR;
