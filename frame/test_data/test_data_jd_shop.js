var _TASK_TYPE_CRAWLING = 1;

exports.TEST_DATA_JD_SHOP = {
    TEST_TASKS:[
        {type:_TASK_TYPE_CRAWLING, info:'', ///京东店铺全部商品列表分页请求接口   ---  0
            taskData:{
                crawlingOptions:{
                    scheme:'http',
                    hostname : 'module-jshop.jd.com',
                    port: 80,
                    path:'/module/getModuleHtml.html?appId=145554&orderBy=0&direction=1&categoryId=0&pageSize=24&venderId=46722&isGlobalSearch=0&domainKey=gylswine&maxPrice=0&pagePrototypeId=17&pageNo=1&shopId=43847&minPrice=0&pageInstanceId=4805398&moduleInstanceId=20020949&prototypeId=52&templateId=402645&layoutInstanceId=20020949&origin=0&callback=jshop_module_render_callback&_=1458185721340',
                    method: 'GET',
                    headers:{
                        'Host': 'module-jshop.jd.com',
                        'Connection': 'keep-alive',
                        'Accept': '*/*',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36',
                        'Referer': 'http://gylswine.jd.com/view_search-145554-46722-43847-0-0-0-0-1-1-24.html?isGlobalSearch=0',
                        'Accept-Encoding': 'gzip, deflate, sdch',
                        'Accept-Language': 'zh-CN,zh;q=0.8',
                        'Cookie': '_tp=TNFKlxmpn3roFTx4gUD9oQ%3D%3D; unick=jdjfyy00zxz; _pst=jfyy0002; TrackID=1mH7wjgIo9vyuuO3h5wQILMZHHPDrByqQM7zV7LPvOLWpRLgwaM9fEkpT3c01Bzx2p4DcNn5hs7pkcjjfHq9yng; pinId=Br5gSbAQp0-1ffsfn98I-w; pin=jfyy0002; __jdv=122270672|jdzt_refer_null|t_232310336_1|jzt-zhitou|z636ivqhaaaktigbkkka; mba_muid=1458132660666-5210f7afa07261de79; unpl=V2_ZzNtbUVSQkZzDhUEK0wPA2ILQFwSVEEVfFtGUihKDlJlAxpZclRCFXIUR1ZnGVsUZAIZWUNcRhZFCHZWfBtaDFcEFltHVC1mdX84NQV7IX4Bf3BZRVcgEwkMIWR6GFVSZwoQVEQHRx13AEVUfk4PUVcAE21KZ0MRcw1DUHocWQVXMxVtcgwWe3IBE1RzH1tWZlQVWUBnRBBzCERSfBpsBFcCIhYsVg4VcQ5DUX8YWQBnMxM%3D; mt_subsite=122%252C1458132662%7C%7C80%2C1458132642; user-key=a3ad673f-2f7a-410b-8666-1036099e117a; cn=0; ipLocation=%u5317%u4EAC; areaId=1; ipLoc-djd=1-72-2799-0; JSESSIONID=05CCD0C813454865494727532BFCA8A7.s1; __jda=122270672.1164307159.1455761935.1458182329.1458185149.117; __jdb=122270672.26.1164307159|117.1458185149; __jdc=122270672; __jdu=1164307159'
                    },
                    agent:false
                }
            }
        },
        {
            type:_TASK_TYPE_CRAWLING, info:'',
            taskData:{
                crawlingOptions:{
                    //url:'http://mall.jd.com/index-125205.html',
                    url:'http://mall.jd.com/index.html',
                    followRedirect:false,
                    gzip:true,
                    //path:'/module/getModuleHtml.html?appId=145554&orderBy=0&direction=1&categoryId=0&pageSize=24&venderId=46722&isGlobalSearch=0&domainKey=gylswine&maxPrice=0&pagePrototypeId=17&pageNo=1&shopId=43847&minPrice=0&pageInstanceId=4805398&moduleInstanceId=20020949&prototypeId=52&templateId=402645&layoutInstanceId=20020949&origin=0&callback=jshop_module_render_callback&_=1458185721340',
                    headers:{
                        
                    }
                }
            }
        }
    ]
};