var _TASK_TYPE_CRAWLING = 1;

var taskStr = JSON.parse('{"type":1,"info":"","taskData":{"crawlingOptions":{"scheme":"http","hostname":"search.m.jd.com","port":80,"path":"/client.action?functionId=search&uuid=868256022739444-8473035a7308&clientVersion=4.4.5&build=23634&client=android&d_brand=Letv&d_model=LetvX500&osVersion=5.0.2&screen=1920*1080&partner=jingdong&area=1_72_2799_0&networkType=wifi&st=1456198679209&sign=0FfgmwDo9xA5kK6Tom8uBg&sv=2","method":"POST","headers":{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8","Charset":"UTF-8","Host":"search.m.jd.com","Connection":"close","Accept-Encoding":"gzip,deflate","User-Agent":"Dalvik/v3.3.117 Compatible (TVM xx; YunOS 3.0; Linux; U; Android 4.4.4 Compatible; Bird L6 Build/KTU84P)"},"postdata":"body=%7B%22keyword%22%3A%22%E5%9B%9B%E4%BB%B6%E5%A5%97%E7%BA%AF%E6%A3%89%22%2C%22stock%22%3A%22have%22%2C%22newVersion%22%3A%223%22%2C%22isCorrect%22%3A%221%22%2C%22page%22%3A%222%22%2C%22pagesize%22%3A%2210%22%7D&","agent":false}}}');


exports.TEST_DATA_PRICE={
    TEST_TASKS:[
        {type:_TASK_TYPE_CRAWLING, info:'', ///根据sku获取价格   ---  0
            taskData:{
                crawlingOptions:{
                    scheme:'http',
                    hostname : 'api.m.jd.com',
                    port: 80,
                    path:'/client.action?functionId=skuDyInfo&uuid=868256022739444-8473035a7308&clientVersion=5.1.0&build=31030&client=android&d_brand=Letv&d_model=LetvX500&osVersion=5.0.2&screen=1920*1080&partner=jingdong1&area=16_1332_42932_52095&networkType=wifi&st=1464834664393&sign=f82c32dcb7a9bb5a37d09f40a1a893f8&sv=110',
                    method: 'POST',
                    headers:{
                        //'If-Modified-Since': 'Tue, 29 Dec 2015 02:14:15 GMT+00:00',
                        //'Content-Length': '187',
                        'Cookie': 'pin=chenxminfocare; wskey=AAFXTGLAAEAziyhAj73BARrVotBJ4ripRUnvteRDjNk9fWE8YfhIWUIuTJAYGaTyEX-kp5Di7CW9pXGjVLVHNVjnAdW14LlO; whwswswws=eY837ueq6sm1Tu9caKiPwF8ZNp9b9JULz4LkiTcvz1uGDPVEObnP6Q%3D%3D;',
                        //'If-Modified-Since': 'Thu, 25 Feb 2016 08:56:49 GMT+00:00',
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Charset': 'UTF-8',
                        'Host':'api.m.jd.com',
                        'jdc-backup':'pin=chenxminfocare; wskey=AAFXTGLAAEAziyhAj73BARrVotBJ4ripRUnvteRDjNk9fWE8YfhIWUIuTJAYGaTyEX-kp5Di7CW9pXGjVLVHNVjnAdW14LlO; whwswswws=eY837ueq6sm1Tu9caKiPwF8ZNp9b9JULz4LkiTcvz1uGDPVEObnP6Q%3D%3D;',
                        'Connection': 'close',
                        'Accept-Encoding' : 'gzip,deflate',
                        'Content-Length':'909',
                        'User-Agent' : " Dalvik/2.1.0 (Linux; U; Android 5.0.2; Letv X500 Build/DBXCNOP5500912251S)"
                    },
                    //postdata:'body=%7B%22catelogyId%22%3A%222694%22%2C%22sort%22%3A%221%22%2C%22catelogyIdLevel1%22%3A%22670%22%2C%22fullCategoryId%22%3A%22670-671-2694%22%2C%22stock%22%3A%22have%22%2C%22newVersion%22%3A%223%22%2C%22pagesize%22%3A%2210%22%2C%22page%22%3A%221%22%7D&',
                    postdata:'body=%7B%22skuId%22%3A%2210243462096%22%2C%22adClickUrl%22%3A%22http%3A%5C%2F%5C%2F' +
                    'ccc.x.jd.local%5C%2Fdsp%5C%2Fnc%3Fext%3DY2xpY2sueC5qZC5jb20vSmRDbGljay8_eHVpZD01MjAwNyZ4c2l0ZWlkPTk3NDg0NTNfNjMzJnRvPWh0dHA6Ly9tLmpkLmNvbS9wcm9kdW' +
                    'N0LzEwMjQzNDYyMDk2Lmh0bWw%26log%3DfDNiNKsWRZvUvHpK70brNqfIdKir00SLEYRlPpCKSClPLxTDOe3NulyHK5gB5k4queNIVpJF00f_f4YkCKjDvnVJpc5vml1Zt2befJWLZuc_fZ8dSOw-IksXmcq7LDl093SA' +
                    'c_Fuv_64e-oR3b5ffWcNHYuTeCuLPvMxTb0m5D0jzfjRHz8ohalk01LT0fiR9GKefScYQaaKyD3IJvKe8p_unTmKrWakiniSyKRTsmlud8qm3wGbmedazhD5Z2fP3tY3HO7gIoVyjkBGu1Z3KnX8N4gsRlcFDG926obHOGfnE-UoqgNV1bkAiq3u02hsfD_xXOJ8xJXcnIxrrNq5Ypn_165-VRIQv9iQoQxAOMtd7kfQhYx1VjOqT3tUGyi3HFtXd8-gWuBCL7UeFSrSMNp_PfG3T13xD8ZY18E4jjTxAdnr4smQU3XAC3vU8ZhqaQ19MIALsNnu9etZdSCPF4yzuOFpuKBYRd5DFiYGGvg%26v%3D404%26' +
                    'clicktype%3D1%26%22%2C%22source_type%22%3A%22search%22%2C%22source_value%22%3A%22%E5%9B%9B%E4%BB%B6%E5%A5%97%22%2C%22pluginVersion%22%3A16%7D&',
                    //postdata:'body=%7B%22keyword%22%3A%22%E9%BB%84%E9%85%92%22%2C%22stock%22%3A%22have%22%2C%22newVersion%22%3A%223%22%2C%22isCorrect%22%3A%221%22%2C%22pagesize%22%3A%2210%22%2C%22pvid%22%3A%22%22%2C%22page%22%3A%221%22%7D&',
                    agent:false
                    /* ---------------------------- 排序方式 --------------------------------------
                     body={"pagesize":"10","newVersion":"3","stock":"have","page":"3","keyword":"皮鞋"}&            //综合
                     body={"pagesize":"10","newVersion":"3","stock":"have","sort":"1","page":"4","keyword":"皮鞋"}& //销量
                     body={"pagesize":"10","newVersion":"3","stock":"have","sort":"6","page":"4","keyword":"皮鞋"}& //评论
                     body={"pagesize":"10","newVersion":"3","stock":"have","sort":"3","page":"4","keyword":"皮鞋"}& //价格升序
                     body={"pagesize":"10","newVersion":"3","stock":"have","sort":"5","page":"3","keyword":"皮鞋"}& //新品
                     */
                }
            }
        },
        taskStr
    ]
};