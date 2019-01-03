var user_agent = require('../user_agent').USER_AGENT_MGR;

var _TASK_TYPE_CRAWLING = 1;


exports.TEST_DATA_JD_WEIXIN = {
    TEST_TASKS:[
        {type:_TASK_TYPE_CRAWLING, info:'', ///移动端搜索排名 首页 --- 0
            taskData:{
                crawlingOptions:{
                    hostname: 'wq.jd.com',
                    port: 80,
                    path: '/search/search?key=%E6%B2%99%E5%8F%91%E5%BA%8A&area_ids=1,72,2799&sf=1&as=1&qp_disable=no',                                          //默认排序
                    //path: '/search/search?key=%E6%B2%99%E5%8F%91%E5%BA%8A&area_ids=1,72,2799&sort_type=sort_dredisprice_asc&sf=1&as=1&qp_disable=no ',		//价格升序
                    //path: '/search/search?key=%E6%B2%99%E5%8F%91%E5%BA%8A&area_ids=1,72,2799&sort_type=sort_commentcount_desc&sf=1&as=1&qp_disable=no',		//评论降序
                    //path: '/search/search?key=%E6%B2%99%E5%8F%91%E5%BA%8A&area_ids=1,72,2799&sort_type=sort_totalsales15_desc&sf=1&as=1&qp_disable=no',  		//销量降序
                    method: 'GET',
                    headers:{
                        'Host':'wq.jd.com',
                        'Accept':'application/javascript, */*;q=0.8',
                        'Accept-Charset':'utf-8, iso-8859-1, utf-16, *;q=0.7',
                        'Accept-Encoding':'gzip',
                        'Accept-Language':'zh-CN',
                        'Connection':'keep-alive',
                        'Cookie':'jdAddrId=1_72_2799;jdAddrName=%u5317%u4EAC_%u671D%u9633%u533A_%u4E09%u73AF%u4EE5%u5185;sAreaId=22%2C1930%2C0;network=wifi',
                        'Referer':'/search/search?key=%E6%B2%99%E5%8F%91%E5%BA%8A&sf=1&as=1',
                        'User-Agent':user_agent.randomUserAgent()
                    },
                    agent:false
                }
            }
        },
        {type:_TASK_TYPE_CRAWLING, info:'', ///移动端搜索排名 非首页 --- 1
            taskData:{
                crawlingOptions:{
                    hostname: 'wq.jd.com',
                    port: 80,
                    path: '/search/search?key=%e6%b2%99%e5%8f%91%e5%ba%8a&datatype=1&callback=jdSearchResultBkCb&page=2&pagesize=20&ext_attr=no&brand_col=no&price_col=no&color_col=no&size_col=no&ext_attr_sort=no&merge_sku=yes&multi_suppliers=yes&area_ids=1,72,2799&qp_disable=no',
                    method: 'GET',
                    headers:{
                        'Host':'wq.jd.com',
                        'Accept':'application/javascript, */*;q=0.8',
                        'Accept-Charset':'utf-8, iso-8859-1, utf-16, *;q=0.7',
                        'Accept-Encoding':'gzip',
                        'Accept-Language':'zh-CN',
                        'Connection':'keep-alive',
                        'Cookie':'jdAddrId=1_72_2799;jdAddrName=%u5317%u4EAC_%u671D%u9633%u533A_%u4E09%u73AF%u4EE5%u5185;sAreaId=22%2C1930%2C0;network=wifi',
                        'Referer':'http://wq.jd.com/search/search?key=%E6%B2%99%E5%8F%91%E5%BA%8A&sf=1&as=1',
                        'User-Agent':user_agent.randomUserAgent()
                    },
                    agent:false
                }
            }
        }
    ]
};