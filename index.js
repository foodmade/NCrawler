var server = require("./frame/server");
var router = require("./frame/router");
var reqHandler = require("./frame/request_handler");
var crawler = require('./frame/crawler');


router.init();
reqHandler.init();

server.start(router, reqHandler);

crawler.crawlerStart();