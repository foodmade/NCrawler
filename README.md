# Welcome to NCrawler
> 此项目使用NodeJs编写,适用于针对性网页爬取。你只需要编写你喜爱网页的解析器(parser),便可以很轻松的采集到你想要的数据

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

# 快速入门 请确保已经安装了NodeJs
`=============================================================================================`
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
  
#### json文本
```json
{
    "rows": [
        {
            "videotype": "BD",
            "videoname": "十月围城",
            "figures": {
                "actor": [
                    "甄子丹",
                    "王学圻"
                ],
                "director": [
                    "陈德森"
                ]
            },
            "videoid": "27313"
        },
        {
            "videotype": "HD高清",
            "videoname": "失孤",
            "figures": {
                "actor": [
                    "刘雅瑟",
                    "刘德华",
                    "井柏然",
                    "梁家辉",
                    "吴君如"
                ],
                "director": [
                    "彭三源",
                    "王中磊"
                ]
            },
            "videoid": "25951"
        },
        {
            "videotype": "BD1280高清特效中英双字版",
            "videoname": "超能陆战队",
            "figures": {
                "actor": [
                    "斯科特·安第斯",
                    "瑞恩·波特",
                    "丹尼尔·海尼",
                    "T·J·米勒"
                ],
                "director": [
                    "唐·霍尔",
                    "克里斯·威廉姆斯"
                ]
            },
            "videoid": "23579"
        }
    ],
    "retcode": 1,
    "handler": 0
}
```

#### Hello Word完毕


