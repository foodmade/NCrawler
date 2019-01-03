var _TASK_TYPE_CRAWLING = 1;

var taskStr = JSON.parse('{"type":1,"info":"","taskData":{"crawlingOptions":{"scheme":"http","hostname":"search.m.jd.com","port":80,"path":"/client.action?functionId=search&uuid=868256022739444-8473035a7308&clientVersion=4.4.5&build=23634&client=android&d_brand=Letv&d_model=LetvX500&osVersion=5.0.2&screen=1920*1080&partner=jingdong&area=1_72_2799_0&networkType=wifi&st=1456198679209&sign=0FfgmwDo9xA5kK6Tom8uBg&sv=2","method":"POST","headers":{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8","Charset":"UTF-8","Host":"search.m.jd.com","Connection":"close","Accept-Encoding":"gzip,deflate","User-Agent":"Dalvik/v3.3.117 Compatible (TVM xx; YunOS 3.0; Linux; U; Android 4.4.4 Compatible; Bird L6 Build/KTU84P)"},"postdata":"body=%7B%22keyword%22%3A%22%E5%9B%9B%E4%BB%B6%E5%A5%97%E7%BA%AF%E6%A3%89%22%2C%22stock%22%3A%22have%22%2C%22newVersion%22%3A%223%22%2C%22isCorrect%22%3A%221%22%2C%22page%22%3A%222%22%2C%22pagesize%22%3A%2210%22%7D&","agent":false}}}');


exports.TEST_DATA_JD_APP = {
    TEST_TASKS:[
        {type:_TASK_TYPE_CRAWLING, info:'', ///京东官方移动端APP搜索排名   ---  0
            taskData:{
                crawlingOptions:{
                    scheme:'http',
                    hostname : 'search.m.jd.com',
                    port: 80,
                    //path:'/client.action?functionId=search&uuid=868256022739444-8473035a7308&clientVersion=4.4.5&build=23634&client=android&d_brand=HUAWEI&d_model=HUAWEIH60-LO1&osVersion=5.0.2&screen=1920*1080&partner=jingdong&area=1_72_2799_0&networkType=wifi&st=1456390607890&sign=5FKaggf9sdeI5uxH4Vihyw&sv=2',
                    path:'/client.action?functionId=search&uuid=868256022739444-8473035a7308&clientVersion=4.4.5&build=23634&client=android&d_brand=HUAWEI&d_model=HUAWEIH60-LO1&osVersion=5.0.2&screen=1920*1080&partner=jingdong&area=1_72_2799_0&networkType=wifi&st=1460084064145&sign=ckw_sN7iSQGcc1jCJIvR3Q&sv=2',
                    method: 'POST',
                    headers:{
                        //'If-Modified-Since': 'Tue, 29 Dec 2015 02:14:15 GMT+00:00',
                        //'Content-Length': '187',
                        'Cookie': 'pin=chenxminfocare;',
                        'If-Modified-Since': 'Thu, 25 Feb 2016 08:56:49 GMT+00:00',
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Charset': 'UTF-8',
                        'Host':'search.m.jd.com',
                        'Connection': 'close',
                        'Accept-Encoding' : 'gzip,deflate',
                        'User-Agent' : "Dalvik/v3.3.117 Compatible (TVM xx; YunOS 3.0; Linux; U; Android 4.4.4 Compatible; Bird L6 Build/KTU84P)"
                    },
                    //postdata:'body=%7B%22keyword%22%3A%22%E5%9B%9B%E4%BB%B6%E5%A5%97%E7%BA%AF%E6%A3%89%22%2C%22stock%22%3A%22have%22%2C%22newVersion%22%3A%223%22%2C%22isCorrect%22%3A%221%22%2C%22page%22%3A%221%22%2C%22pagesize%22%3A%2210%22%7D&',
                    postdata:'body=%7B%22pagesize%22%3A%2210%22%2C%22newVersion%22%3A%223%22%2C%22isCorrect%22%3A%221%22%2C%22stock%22%3A%22have%22%2C%22page%22%3A%222%22%2C%22keyword%22%3A%22%E8%BF%9E%E8%A1%A3%E8%A3%99%E6%A3%89%E9%BA%BB%22%7D&',
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