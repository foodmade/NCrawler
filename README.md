# Welcome to NCrawler
> 此项目使用NodeJs编写,适用于针对性网页爬取。你只需要编写你喜爱网页的解析器(parser),便可以很轻松的采集到你想要的数据
# NCrawler的优点
- 内置Daemon Thread
- 无缝集成jquery,编写解析器(parser)方便简单
- 支持配置中心,server端动态更新NCrawler配置.
- 服务器端可动态推送爬虫最新解析器
- more...


### 目录结构
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
#### 启动服务 node index.js (默认监听端口8885) config.js中自定更改
```
node index.js
[2019-08-26 17:24:26 <lvl:1> ]-----------------Crawler(General, atom, OO) sever{} started:8885---------------------
```
#### 激活工作线程 
http://127.0.0.1:8885/start
#### 结果 图片
![crawlerMovies](https://www.xiaomingblog.cn/upload/2019/8/crawlerMovies-9d820bdaf3d242c6a3ec3a932862a922.png)


