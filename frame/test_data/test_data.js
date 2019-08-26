var _TASK_TYPE_CRAWLING = 1;
exports.TEST_DATA_GVIDEO_TASKS = {
    TEST_TASKS:[
        {type:_TASK_TYPE_CRAWLING, info:'', ///gvideo 首页搜索   ---  0
            taskData:{
                crawlingOptions:{
                    url:'http://97daimeng.com/index.php?m=vod-list-id-1-pg-15-order--by-hits-class-0-year-0-letter--area--lang-.html',
                    method: 'GET',
                    gzip:true,
                    headers:{
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                        'Accept-Encoding': 'gzip, deflate',
                        'Accept-Language': 'zh-CN,zh;q=0.9',
                        'Cache-Control': 'no-cache',
                        'Connection': 'keep-alive',
                        'Host': '97daimeng.com',
                        'Pragma': 'no-cache',
                        'Referer': 'http://97daimeng.com/index.php?m=vod-list-id-8-pg-1-order--by-hits-class-0-year-0-letter--area--lang-.html',
                        'Upgrade-Insecure-Requests': 1,
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
                    },
                    agent:false
                }
            }
        },
        {type:_TASK_TYPE_CRAWLING, info:'', ///gvideo 视频详情搜索   --- 1
            taskData:{
                crawlingOptions:{
                    url:'http://97daimeng.com/?m=vod-play-id-32273-src-1-num-1.html',
                    method: 'GET',
                    gzip:true,
                    headers:{
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                        'Accept-Encoding': 'gzip, deflate',
                        'Accept-Language': 'zh-CN,zh;q=0.9',
                        'Cache-Control': 'no-cache',
                        'Connection': 'keep-alive',
                        'Host': '97daimeng.com',
                        'Pragma': 'no-cache',
                        'Referer': 'http://97daimeng.com',
                        'Upgrade-Insecure-Requests': 1,
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
                    },
                    agent:false
                }
            }
        },
        {type:_TASK_TYPE_CRAWLING, info:'', //海外影视   --- 2
            taskData:{
                crawlingOptions:{
                    url:'http://www.hwmov.com/index.php?s=Showlist-show-id-26-mcid--lz--area--year--letter--order-addtime-picm-1-p-5.html',  //剧情片
                    method: 'GET',
                    gzip:true,
                    headers:{
                        'Accept': '*/*',
                        'Accept-Encoding': 'gzip, deflate',
                        'Accept-Language': 'zh-CN,zh;q=0.9',
                        'Cache-Control': 'no-cache',
                        'Connection': 'keep-alive',
                        'Host': 'www.hwmov.com',
                        'Pragma': 'no-cache',
                        'Referer': 'http://www.hwmov.com/?s=vod-show-id-26.html',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    agent:false
                }
            }
        },
        {type:_TASK_TYPE_CRAWLING, info:'', //海外影视 详情页   --- 3
            taskData:{
                crawlingOptions:{
                    url:'http://www.hwmov.com/?s=vod-play-id-20132-sid-0-pid-1.html',
                    method: 'GET',
                    gzip:true,
                    headers:{
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                        'Accept-Encoding': 'gzip, deflate',
                        'Accept-Language': 'zh-CN,zh;q=0.9',
                        'Cache-Control': 'no-cache',
                        'Connection': 'keep-alive',
                        'Host': 'www.hwmov.com',
                        'Pragma': 'no-cache',
                        'Referer': 'http://www.hwmov.com/?s=vod-read-id-20132.html',
                        'Upgrade-Insecure-Requests': 1,
                        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36'
                    },
                    agent:false
                }
            }
        },
        {type:_TASK_TYPE_CRAWLING, info:'', //好看网 首页搜索   --- 4
            taskData:{
                crawlingOptions:{
                    url:'https://www.haokan22.com/juqingpian/index.html',
                    method: 'GET',
                    gzip:true,
                    encoding:null,
                    headers:{
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                        'Accept-Encoding': 'gzip, deflate',
                        'Accept-Language': 'zh-CN,zh;q=0.9',
                        'Cache-Control': 'no-cache',
                        'Connection': 'keep-alive',
                        'Host': 'www.haokan22.com',
                        'Pragma': 'no-cache',
                        'Upgrade-Insecure-Requests': 1,
                        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36'
                    },
                    agent:false
                }
            }
        },
        {type:_TASK_TYPE_CRAWLING, info:'', //7cl 首页搜索   --- 5
            taskData:{
                crawlingOptions:{
                    url:'http://www.7clcat.com/videos/25/index.html',
                    method: 'GET',
                    gzip:true,
                    encoding:null,
                    headers:{
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                        'Accept-Encoding': 'gzip, deflate',
                        'Accept-Language': 'zh-CN,zh;q=0.9',
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Connection': 'keep-alive',
                        'Expires':0,
                        'if-none-match':'no-match-for-this',
                        'Host': 'www.7clcat.com',
                        'Pragma': 'no-cache',
                        'If-Modified-Since':'Fri, 21 Dec 2018 09:01:43 GMT',
                        'Upgrade-Insecure-Requests': 1,
                        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36'
                    },
                    agent:false
                }
            }
        },
        {
            type: _TASK_TYPE_CRAWLING, info: '', //7cl 详情搜索   --- 6
            taskData: {
                crawlingOptions: {
                    url: 'http://www.7clcat.com/ajax/get_video_url',
                    method: 'POST',
                    gzip: true,
                    encoding: null,
                    headers: {
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                        'Accept-Encoding': 'gzip, deflate',
                        'Accept-Language': 'zh-CN,zh;q=0.9',
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Connection': 'keep-alive',
                        'Expires': 0,
                        'Content-Length': 41,
                        'if-none-match': 'no-match-for-this', /*解决缓存问题*/
                        'Host': 'www.7clcat.com',
                        'Pragma': 'no-cache',
                        'Origin': 'http://www.7clcat.com',
                        'If-Modified-Since': 'Fri, 21 Dec 2018 09:01:43 GMT',
                        'Upgrade-Insecure-Requests': 1,
                        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36'
                    },
                    form: {
                        'token': '',
                        'vid': 211385,
                        'index': 0,
                        't': 1545734612000
                    },
                    agent: false
                }
            }
        },
        {type:_TASK_TYPE_CRAWLING, info:'', //云盘影视 首页搜索   --- 7
            taskData:{
                crawlingOptions:{
                    url:'http://www.yunpankk.com/mulu2015/11.html',
                    method: 'GET',
                    gzip:true,
                    encoding:null,
                    headers:{
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                        'Accept-Encoding': 'gzip, deflate',
                        'Accept-Language': 'zh-CN,zh;q=0.9',
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Connection': 'keep-alive',
                        'Expires':0,
                        'if-none-match':'no-match-for-this',
                        'Host': 'www.yunpankk.com',
                        'Pragma': 'no-cache',
                        'Referer':'http://www.yunpankk.com/mulu2015/11_540.html',
                        'If-Modified-Since':'Fri, 21 Dec 2018 09:01:43 GMT',
                        'Upgrade-Insecure-Requests': 1,
                        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36'
                    },
                    agent:false
                }
            }
        },
        {type:_TASK_TYPE_CRAWLING, info:'', //云盘影视 详情页   --- 8
            taskData:{
                crawlingOptions:{
                    url:'http://www.yunpankk.com/playdata/226/1250.js',
                    method: 'GET',
                    gzip:true,
                    encoding:null,
                    headers:{
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                        'Accept-Encoding': 'gzip, deflate',
                        'Accept-Language': 'zh-CN,zh;q=0.9',
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Connection': 'keep-alive',
                        'Expires':0,
                        'if-none-match':'no-match-for-this',
                        'Host': 'www.yunpankk.com',
                        'Pragma': 'no-cache',
                        'Referer':'http://www.yunpankk.com/mulu2015/11_540.html',
                        'If-Modified-Since':'Fri, 21 Dec 2018 09:01:43 GMT',
                        'Upgrade-Insecure-Requests': 1,
                        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36'
                    },
                    agent:false
                }
            }
        },
        {type:_TASK_TYPE_CRAWLING, info:'', //dongjing影视 首页   --- 9
            taskData:{
                crawlingOptions:{
                    url:'http://www.abc03.me/tian/index56_54.html',
                    method: 'GET',
                    gzip:true,
                    encoding:null,
                    headers:{
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                        'Accept-Encoding': 'gzip, deflate',
                        'Accept-Language': 'zh-CN,zh;q=0.9',
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Connection': 'keep-alive',
                        'Expires':0,
                        'if-none-match':'no-match-for-this',
                        'Host': 'www.abc03.me',
                        'Pragma': 'no-cache',
                        'Referer':'http://www.abc03.me/tian/index57_3.html',
                        'If-Modified-Since':'Fri, 21 Dec 2018 09:01:43 GMT',
                        'Upgrade-Insecure-Requests': 1,
                        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36'
                    },
                    agent:false
                }
            }
        },
        {type:_TASK_TYPE_CRAWLING, info:'', //dongjing影视 详情页   --- 10
            taskData:{
                crawlingOptions:{
                    url:'http://www.abc03.me/xian/index185663.html',
                    method: 'GET',
                    gzip:true,
                    encoding:null,
                    headers:{
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                        'Accept-Encoding': 'gzip, deflate',
                        'Accept-Language': 'zh-CN,zh;q=0.9',
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Connection': 'keep-alive',
                        'Host': 'www.abc03.me',
                        'Pragma': 'no-cache',
                        'Referer':'http://www.abc03.me/tian/index57_4.html',
                        'Upgrade-Insecure-Requests': 1,
                        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36'
                    },
                    agent:false
                }
            }
        }
    ]
};