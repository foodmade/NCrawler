var _TASK_TYPE_CRAWLING = 1;

exports.TEST_DATA = {

    TEST_TASKS:[
        {type:_TASK_TYPE_CRAWLING, info:'', ///天猫关键字搜索任务 --- 0
            taskData:{
                crawlingOptions:{
                    hostname : "list.tmall.com",
                    scheme:'https',
                    path : "/search_product.htm?s=360&q=%BB%C6%BE%C6&sort=s&style=g&from=mallfp..pc_1_searchbutton&tmhkmain=0&type=pc",
                    method: 'GET',
                    headers:{
                        'Host':'list.tmall.com',
                        'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                        'Cache-Control':'no-cache',
                        'Connection' : "keep-alive",
                        'Upgrade-Insecure-Requests': 1,
                        'Cookie':'_tb_token_=XO99OZSPg5Ou; cookie2=2cc5344e5de202ec653e0e1e1f23264f; t=f2f12f5d66a4387a2ce96d4df843c8fa; cna=/gDDDlGIkR0CAXDBg2S1yQfP; tt=tmall-main; pnm_cku822=101UW5TcyMNYQwiAiwZTXFIdUh1SHJOe0BuOG4%3D%7CUm5OcktySXNJc0h3SX1IfCo%3D%7CU2xMHDJ7G2AHYg8hAS8WLgAgDlIzVTleIFp0InQ%3D%7CVGhXd1llXGVeZF5kX2Beal9rXGFDfkJ8Q39KdkJ%2FRX1Ddkh3TnVbDQ%3D%3D%7CVWldfS0RMQ0xDTgYJBw8EmALYhh1UXVIOQdqXyoXKwVTBQ%3D%3D%7CVmhIGCUFOBgkHCkXNwwyDjoaJh0gHT0JNAkpFS4TLg47ATxqPA%3D%3D%7CV25Tbk5zU2xMcEl1VWtTaUlwJg%3D%3D; res=scroll%3A1583*6319-client%3A1583*229-offset%3A1583*6319-screen%3A1600*900; isg=44B6BF9778491201E271791DBE464845; cq=ccp%3D1; _m_h5_tk=06d81b2b1be68e4ea32180432df576cb_1446781945954; _m_h5_tk_enc=3e0685eea0de38ae0bad8ee40f60cb58; l=AjAwZqnLh1sD1Zg32nF6Rx3OgPCCPxTG',
                        'User-Agent' : "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36"
                    },
                    agent:false
                }
            }
        }
    ]

};