# Welcome to NCrawler
> 此项目使用NodeJs编写,适用于针对性网页爬取。你只需要编写你喜爱网页的解析器(parser),便可以很轻松的采集到你想要的数据

- [NCrawler的优点](#NCrawler的优点)
- [目录结构](#目录结构)
- [快速入门](#快速入门)
- [采集一批美女图片](#牛刀小试)

# NCrawler的优点
- 内置Daemon Thread
- 无缝集成jquery,编写解析器(parser)方便简单
- 支持配置中心,server端动态更新NCrawler配置.
- 服务器端可动态推送爬虫最新解析器
- more...


# 目录结构
```
├─config
│      config.js           //全局配置中心
├─frame 
│  │  crawler.js           //中控中心。负责爬虫任务的调度,worker线程的管理,心跳管理等等  
│  │  request_handler.js   //请求处理器
│  │  router.js            //路由中心
│  │  server.js            //server
│  │  user_agent.js
│  │  utils.js       
│  │  uuid.js
│  │  worker.js            //工作线程
│  │  
│  ├─dynamic_parser
│  │  │  dynamic_parser.js  //解析器管理器
│  │  │  
│  │  └─parsers             //解析器目录
│  │      └─movie
│  │                  
│  └─test_data              //调试任务存放目录
│          test_data.js
│          
└─index.js                  //启动文件
└─package.json              //依赖管理
```

# 快速入门

#### 目标网站：http://97daimeng.com/index.php?m=vod-list-id-1-pg-15-order--by-hits-class-0-year-0-letter--area--lang-.html 
#### 下载NCrawler
```bash
git clone "https://github.com/foodmade/NCrawler.git"
```
#### 初始化
```
npm install
```
#### 启动 
```
node index.js
```
#### 结果 图片
![crawlerMovies](https://www.xiaomingblog.cn/upload/2019/8/crawlerMovies-9d820bdaf3d242c6a3ec3a932862a922.png)

# 牛刀小试
#### 目标网站：http://www.shu800.com/xinggan/

#### 第一步：定义网站地址
`编辑 ./frame/test_data/test_data.js 增加如下任务`
```javascript
    {type:'', info:'', ///shu800.com   ---  [0]
            taskData:{
                crawlingOptions:{
                    url:'http://www.shu800.com/xinggan/',
                    method: 'GET',
                    gzip:true,
                    headers:{
                        'Host': 'www.shu800.com',
                    },
                    agent:false
                }
            }
        }
```
#### 第二步：编写网页解析器
`./frame/dynamic_parser/parsers 目录下增加 girl_parser.js`
```javascript

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
```

#### 第三部：指派任务
`编辑 ./config/config.js 指定任务`
```javascript
module.exports = {
  CRAWLER:{
    .....,
    taskIndex:0 //这里对应TEST_DATA_TASK列表的索引,如上任务索引等于0
  },
  PARSER:{
      defParserCodeFilePath:'./frame/dynamic_parser/parsers/girl_parser.js'   //指定解析器位置
    },
}
```
#### 执行
```
node index.js
```
#### 结果

![girl](https://www.xiaomingblog.cn/upload/2019/8/girl-20c6c497cb324281b533d3d96c046efa.png)


