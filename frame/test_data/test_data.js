var user_agent = require('../user_agent').USER_AGENT_MGR;

var _TASK_TYPE_CRAWLING = 1;


///搜索 偶数页 任务（带滚动参数）
var testTObj_key = JSON.parse('{"task":{"id":1291947262,"key":"四件套","task_content":"四件套","category":"四件套","channel":"/jdjfyy00zxz_1434257791615","page":2,"is_monitor_task":0,"result_cnt":0,"query_id":573598,"task_type":0,"option":"","session_id":"937E956E3B07117A4929C268765CD2E6","compe_id":-1,"compe_sku_id":-1,"over":false,"state":1,"time_used":-1,"retry_cnt":0,"timeStamp":1434257847702},"type":1,"taskData":{"crawlingOptions":{"headers":{"Accept-Language":"zh-CN,zh;q=0.8,en;q=0.6","Cookie":"ipLoc-djd=1-72-2799-0; ipLocation=%u5317%u4EAC;","X-Requested-With":"XMLHttpRequest","Host":"search.jd.com","Referer":"http://search.jd.com/Search?keyword=%e5%9b%9b%e4%bb%b6%e5%a5%97&enc=utf-8&scrolling=y&start=30","Accept-Encoding":"gzip, deflate, sdch","User-Agent":"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36","Connection":"keep-alive","Accept":"*/*"},"port":80,"path":"/s_new.php?enc=utf-8&vt=2&qrst=1&rt=1&stop=1&sttr=1&offset=6&click=0&keyword=%E5%9B%9B%E4%BB%B6%E5%A5%97&page=14&scrolling=y&pos=30&s=39","hostname":"search.jd.com","method":"GET","agent":false}},"info":""}');
///搜索 奇数页 任务
var testTObj_key_1 = JSON.parse('{"task":{"id":1291947262,"key":"四件套","task_content":"四件套","category":"四件套","channel":"/jdjfyy00zxz_1434257791615","page":2,"is_monitor_task":0,"result_cnt":0,"query_id":573598,"task_type":0,"option":"","session_id":"937E956E3B07117A4929C268765CD2E6","compe_id":-1,"compe_sku_id":-1,"over":false,"state":1,"time_used":-1,"retry_cnt":0,"timeStamp":1434257847702},"type":1,"taskData":{"crawlingOptions":{"headers":{"Pragma":"no-cache","Accept-Language":"zh-CN,zh;q=0.8,en;q=0.6","Cookie":"ipLoc-djd=1-72-2799-0; ipLocation=%u5317%u4EAC;","X-Requested-With":"XMLHttpRequest","Host":"search.jd.com","Referer":"http://search.jd.com/Search?keyword=%e8%bf%90%e5%8a%a8%e8%a3%a4&enc=utf-8","Accept-Encoding":"identity,gzip","User-Agent":"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36","Connection":"keep-alive","Accept":"*/*"},"port":80,"path":"/s_new.php?keyword=C%e8%af%ad%e8%a8%80&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&offset=3&page=1&s=1&click=0","hostname":"search.jd.com","method":"GET","agent":false}},"info":""}');

var testTObj_key_2 = JSON.parse('{"info":"","task":{"category":"诺诺宝贝","channel":"_yun88888_1428566592583","compe_id":-1,"compe_sku_id":-1,"id":84722036,"is_monitor_task":0,"key":"诺诺宝贝","option":"","over":false,"page":4,"query_id":228,"result_cnt":0,"retry_cnt":0,"session_id":"52833316CE330E13315B54EA91ED1A42","state":1,"task_content":"诺诺宝贝","task_type":0,"timeStamp":1428566611416},"taskData":{"crawlingOptions":{"agent":false,"headers":{"Accept":"*/*","Accept-Encoding":"identity,gzip","Accept-Language":"zh-CN,zh;q=0.8,en;q=0.6","Connection":"keep-alive","Cookie":"ipLoc-djd=1-72-2799-0; ipLocation=%u5317%u4EAC;","Host":"search.jd.com","Referer":"http://search.jd.com /Search?keyword=%E8%AF%BA%E8%AF%BA%E5%AE%9D%E8%B4%9D&enc=utf-8&page=4&scrolling=y&start=30","User-Agent":"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36","X-Requested-With":"XMLHttpRequest"},"hostname":"search.jd.com","method":"GET","path":"/s_new.php?enc=utf-8&psort=&vt=2&keyword=%E8%AF%BA%E8%AF%BA%E5%AE%9D%E8%B4%9D&page=4","port":80}},"type":1}');

///类目任务解析
var testTObj3 = JSON.parse('{"task":{"id":1118474134,"key":"1315,1342,9736","task_content":"1315,1342,9736","category":"1315,1342,9736","channel":"/jd_tzsgxl_1438849889910","page":57,"is_monitor_task":0,"is_mobile_task":0,"result_cnt":0,"query_id":195768,"task_type":1,"option":"","session_id":"935793CAA6CE1F0D1579948D17C17B4D","compe_id":-1,"compe_sku_id":-1,"over":false,"state":1,"time_used":-1,"host":"item.jd.com","retry_cnt":0,"timeStamp":1438851618250},"type":1,"taskData":{"crawlingOptions":{"headers":{"Accept-Language":"zh-CN,zh;q=0.8,en;q=0.6","Cookie":"ipLoc-djd=1-72-2799-0;","X-Requested-With":"XMLHttpRequest","Host":"list.jd.com","Referer":"http://search.jd.com/Search?keyword=1315%2C1342%2C9736&enc=utf-8&page=57","Accept-Encoding":"identity,gzip","User-Agent":"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143Safari/537.36","Connection":"keep-alive","Accept":"*/*"},"port":80,"path":"list.jd.com/list.html?cat=%E5%AE%B6%E5%B1%85%E5%AE%B6%E8%A3%85-%E5%AE%B6%E7%BA%BA-%E5%87%89%E5%B8%AD&page=4","hostname":"list.jd.com","method":"GET","agent":false}},"info":""}');

exports.TEST_DATA = {
  TEST_TASKS:[
      {type:_TASK_TYPE_CRAWLING, info:'', ///SKU基本信息 --- 0
          taskData:{
              crawlingOptions:{
                  hostname : "d.jd.com",
                  port: 80,
                  path : "/fittingInfo/get?callback=jQuery7652003&skuId=1594294192",
                  method: 'GET',
                  headers:{
                      'Host':'d.jd.com',
                      'Accept':'*/*',
                      'Accept-Encoding' : 'gzip,deflate,sdch',
                      'Cache-Control':'no-cache',
                      'Connection' : "keep-alive",
                      'X-Requested-With' : "XMLHttpRequest",
                      'Cookie':'ipLoc-djd=1-72-2799-0; ipLocation=%u5317%u4EAC;',
                      'User-Agent' : "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36"
                  },
                  agent:false
              }
          }
      },
      {type:_TASK_TYPE_CRAWLING, info:'', ///促销活动 --- 1
          taskData:{
              crawlingOptions:{
                  hostname : "pi.3.cn",
                  port: 80,
                  path : "/promoinfo/get?id=1640700&area=1_72_2799_0&origin=1&callback=Promotions.set",
                  method: 'GET',
                  headers:{
                      'Host':'pi.3.cn',
                      'Accept':'*/*',
                      'Accept-Encoding' : 'gzip, deflate, sdch',
                      'Pragma':'no-cache',
                      'Cache-Control':'no-cache',
                      'Connection' : "keep-alive",
                      'Referer' : "http://item.jd.com/1281407852.html",
                      'User-Agent' : "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36"
                  },
                  agent:false
              }
          }
      },
      {type:_TASK_TYPE_CRAWLING, info:'', ///评论评分 --- 2
          taskData:{
              crawlingOptions:{
                  hostname : "club.jd.com",
                  port: 80,
                  path : "/clubservice.aspx?method=GetCommentsCount&referenceIds=1222028578&callback=jQuery5318568",
                  method: 'GET',
                  headers:{
                      'Host':'club.jd.com',
                      'Accept':'*/*',
                      'Accept-Encoding' : 'gzip, deflate, sdch',
                      'Pragma':'no-cache',
                      'Cache-Control':'no-cache',
                      'Connection' : "keep-alive",
                      'Referer' : "http://item.jd.com/1222028578.html",
                      'User-Agent' : "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36"
                  },
                  agent:false
              }
          }
      },
      {type:_TASK_TYPE_CRAWLING, info:'', ///店铺信息 --- 3
          taskData:{
              crawlingOptions:{
                  hostname : "st.3.cn",
                  port: 80,
                  path : "/gvi.html?callback=setPopInfo&skuid=1535559947&type=popdeliver",
                  method: 'GET',
                  headers:{
                      'Host':'st.3.cn',
                      'Accept':'*/*',
                      'Accept-Encoding' : 'gzip, deflate, sdch',
                      'Pragma':'no-cache',
                      'Cache-Control':'no-cache',
                      'Connection' : "keep-alive",
                      'Referer' : "http://item.jd.com/232410.html",
                      'User-Agent' : "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36"
                  },
                  agent:false
              }
          }
      },
      {type:_TASK_TYPE_CRAWLING, info:'', ///颜色尺码 --- 4
          taskData:{
              crawlingOptions:{
                  hostname : "item.jd.com",
                  port: 80,
                  path : "/10164816800.html",
                  method: 'GET',
                  headers:{
                      'Host':'item.jd.com',
                      'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                      'Accept-Encoding' : 'gzip, deflate, sdch',
                      'Accept-Language':'zh-CN,zh;q=0.8',
                      'Pragma':'no-cache',
                      'Cache-Control':'no-cache',
                      'Connection' : "keep-alive",
                      'Cookie':'areaId=1;ipLoc-djd=1-72-4137-0;ipLocation=%u5317%u4EAC;',
                      'Referer' : "http://www.jd.com",
                      'User-Agent' : "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36"
                  },
                  agent:false
              }
          }
      },
      {type:_TASK_TYPE_CRAWLING, info:'', ///评论评分2 --- 5
          taskData:{
              crawlingOptions:{
                  hostname : "club.jd.com",
                  port: 80,
                  path : "/ProductPageService.aspx?method=GetCommentSummaryBySkuId&referenceId=1089978523&callback=getCommentCount",
                  method: 'GET',
                  headers:{
                      'Host':'club.jd.com',
                      'Accept':'*/*',
                      'Accept-Language':'zh-CN,zh;q=0.8',
                      'Accept-Encoding' : 'gzip, deflate, sdch',
                      'Pragma':'no-cache',
                      'Cache-Control':'no-cache',
                      'Connection' : "keep-alive",
                      'Referer' : "http://item.jd.com/1089978523.html",
                      'User-Agent' : "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36"
                  },
                  agent:false
              }
          }
      },
      {type:_TASK_TYPE_CRAWLING, info:'', ///普通任务 --- 6
          taskData:{
              crawlingOptions:{
                  hostname : "search.jd.com",
                  port: 80,
                  path : "/s.php?enc=utf-8&psort=&vt=2&keyword=%E5%A4%AA%E9%98%B3%E9%95%9C%E5%A5%B3%E6%AC%BE&page=2",
                  method: 'GET',
                  headers:{
                      'Host':'search.jd.com',
                      'Accept':'*/*',
                      'Accept-Encoding' : "identity,gzip",
                      'Connection' : "keep-alive",
                      'X-Requested-With' : "XMLHttpRequest",
                      'Cookie':'ipLoc-djd=1-72-2799-0; ipLocation=%u5317%u4EAC;',
                      'Referer' : "http://search.jd.com/Search?keyword=%E5%9B%9B%E4%BB%B6%E5%A5%97&enc=utf-8&page=2",
                      'User-Agent' : "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36"
                  },
                  agent:false
              }
          }},

      {type:_TASK_TYPE_CRAWLING, info:'', ///普通任务 PC类目 --- 7   BY REQUEST
          taskData:{
              crawlingOptions:{
                  url:'https://list.jd.com//list.html?cat=1315%2C1342%2C12089&page=1&go=0',
                  gzip:true,
                  followRedirect:false,
                  hostname: 'list.jd.com',
                  port: 80,
                  path: '/list.html?cat=1315%2C1342%2C12089&page=1&go=0',
                  method: 'GET',
                  headers:{
                      'Host':'list.jd.com',
                      'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                      'Accept-Encoding':'identity,gzip',
                      'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6',
                      'Connection':'keep-alive',
                      'X-Requested-With':'XMLHttpRequest',
                      'Cookie':'ipLoc-djd=1-72-2799-0;',
                      'Referer':'http://list.jd.com/list.html?cat=1620,1621,1627',
                      'User-Agent':user_agent.randomUserAgent()
                  },
                  agent:false
              }
          }
      },
      testTObj_key,                   /// --- 8
      testTObj_key_2,                 /// --- 9
      testTObj_key_1,                 /// --- 10
      {type:_TASK_TYPE_CRAWLING, info:'', ///移动端搜索排名 --- 11
          taskData:{
              crawlingOptions:{
                  hostname: 'wq.jd.com',
                  port: 80,
                  path: '/search/search?key=%E9%BB%84%E9%85%92&datatype=2&callback=jdSearchFilterCb&page=1&pagesize=1&ext_attr=yes&brand_col=yes&price_col=yes&color_col=yes&size_col=yes&ext_attr_sort=yes&merge_sku=yes&multi_suppliers=yes&new_brand_val=yes',
                  method: 'GET',
                  headers:{
                      'Host':'wq.jd.com',
                      'Accept':'application/javascript, */*;q=0.8',
                      'Accept-Encoding':'gzip',
                      'Accept-Language':'zh-CN',
                      'Connection':'keep-alive',
                      'Cookie':'ipLoc-djd=1-72-2799-0',
                      'Referer':'http://search.jd.com/Search?keyword=%E7%9F%AD%E5%A4%96%E5%A5%97%E5%A5%B3&enc=utf-8',
                      'User-Agent':user_agent.randomUserAgent()
                  },
                  agent:false
              }
          }
      },
      {type:_TASK_TYPE_CRAWLING, info:'', ///SKU扫描：库存状态 --- 12
          taskData:{
              crawlingOptions:{
                  hostname : "st.3.cn",
                  //hostname : "kiss.sojoyoo.com",
                  port: 80,
                  path : "/gds.html?skuid=D9D093774D8653DF9B31AF6074AA9684&provinceid=1&cityid=72&areaid=2799&townid=0&sortid1=6233&sortid2=6279&sortid3=6287&extraParam={%22originid%22:%221%22}&isNew=1&ch=1&callback=getStockCallback",
                  method: 'GET',
                  headers:{
                      'Host':'st.3.cn',
                      'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                      'Accept-Language':'zh-CN,zh;q=0.8',
                      'Accept-Encoding' : 'gzip, deflate, sdch',
                      'Pragma':'no-cache',
                      'Proxy-Connection':'keep-alive',
                      'Cache-Control':'no-cache',
                      'Upgrade-Insecure-Requests':'1',
                      'User-Agent' : "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36"
                  },
                  agent:false
              }
          }
      },
      testTObj3,                         ///类目解析 --- 13,
      {type:_TASK_TYPE_CRAWLING, info:'', ///京东快车 关键字 TYPE1 推广商品任务   ---  14
          taskData:{
              crawlingOptions:{
                  hostname : "x.jd.com",
                  port: 80,
                  path : "/Search?ad_type=7&ad_ids=291:12,292:4&keyword=%E9%BB%84%E9%85%92&page=3&urlcid3=&callback=jQuery8011708",
                  method: 'GET',
                  headers:{
                      'Host':'x.jd.com',
                      'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                      'Accept-Language':'zh-CN,zh;q=0.8',
                      'Accept-Encoding' : 'gzip, deflate, sdch',
                      'User-Agent' : "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36"
                  },
                  agent:false
              }
          }
      },
      {type:_TASK_TYPE_CRAWLING, info:'', ///京东官方移动端APP排名   ---  15
          taskData:{
              crawlingOptions:{
                  hostname : "search.m.jd.com",
                  port: 80,
                  path : "/client.action?functionId=search&uuid=867461020105090-000ce7117e62&clientVersion=4.3.1&area=1_72_2799_0&sign=v65Y2p5StUcOJdo7AYEdkg&sv=1&st=1444892125686",
                  method: 'POST',
                  headers:{
                      'Charset': 'UTF-8',
                      'Host':'search.m.jd.com',
                      'Connection': 'close',
                      'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                      'Accept-Language':'zh-CN,zh;q=0.8',
                      'Accept-Encoding' : 'gzip, deflate, sdch',
                      'User-Agent' : "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36"
                  },
                  postdata:{
                      body:{pagesize:10,newVersion:3,isCorrect:1,stock:'have',page:1,keyword:'黄酒'}
                  },
                  agent:false
              }
          }
      },
      {type:_TASK_TYPE_CRAWLING, info:'', ///京东微信移动端排名 2015.10.20   ---  16
          taskData:{
              crawlingOptions:{
                  hostname : "api.search.360buy.com",
                  port: 80,
                  path : "/?key=%e7%88%b1%e8%8c%89%e8%8e%89%e6%8a%a4%e5%8f%91%e7%b2%be%e6%b2%b9&callback=jdSearchResultCb&page=2&pagesize=20&ext_attr=yes&brand_col=yes&price_col=yes&color_col=yes&size_col=yes&ext_attr_sort=yes&merge_sku=yes&multi_suppliers=yes&qp_disable=no&area_ids=1,72,4139&g_ty=ls",
                  method: 'GET',
                  headers:{
                      'Host':'api.search.360buy.com',
                      'Accept': 'application/javascript, */*;q=0.8',
                      'Accept-Charset':'utf-8, iso-8859-1, utf-16, *;q=0.7',
                      'Accept-Encoding' : 'gzip',
                      'Connection': 'keep-alive',
                      'User-Agent' : "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36"
                  },
                  agent:false
              }
          }
      },
      {type:_TASK_TYPE_CRAWLING, info:'', ///京东搜索页快车位置排名 - 左侧推广 2015.10.20   ---  17
          taskData:{
              crawlingOptions:{
                  hostname : "x.jd.com",
                  port: 80,
                  path : "/Search?callback=call5554&ad_ids=291%3A18&ad_type=7&area=1&enc=utf-8&keyword=%E9%BB%84%E9%85%92&xtest=new_search&page=1&_=1447656023210",
                  method: 'GET',
                  headers:{
                      'Host':'x.jd.com',
                      'Accept': '*/*',
                      'Accept-Encoding': 'gzip, deflate, sdch',
                      'Accept-Language': 'zh-CN,zh;q=0.8',
                      'User-Agent' : "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36",
                      'Cookie':'areaId=1;ipLoc-djd=1-72-4137-0;ipLocation=%u5317%u4EAC;'
                  },
                  agent:false
              }
          }
      },
      {type:_TASK_TYPE_CRAWLING, info:'', ///京东搜索页快车位置排名 - 底部精选 2015.10.20   ---  18
          taskData:{
              crawlingOptions:{
                  hostname : "x.jd.com",
                  port: 80,
                  path : "/Search?callback=call24522&ad_ids=292%3A5&ad_type=7&area=1&enc=utf-8&keyword=%E9%BB%84%E9%85%92&xtest=new_search&page=1&_=1447656023211",
                  method: 'GET',
                  headers:{
                      'Host':'x.jd.com',
                      'Accept': '*/*',
                      'Accept-Encoding': 'gzip, deflate, sdch',
                      'Accept-Language': 'zh-CN,zh;q=0.8',
                      'User-Agent' : "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36",
                      'Cookie':'areaId=1;ipLoc-djd=1-72-4137-0;ipLocation=%u5317%u4EAC;'
                  },
                  agent:false
              }
          }
      },
      {type:_TASK_TYPE_CRAWLING, info:'', ///京东类目页快车位置排名 - 热卖推荐 2015.10.20   ---  19
          taskData:{
              crawlingOptions:{
                  hostname : "x.jd.com",
                  port: 80,
                  path : "/ShowInterface?callback=jQuery6173591&ad_ids=46%3A3&ad_type=7&spread_type=1&cai_type=1&cid=1315-1342-12089&new_list=1&page=2",
                  method: 'GET',
                  headers:{
                      'Host':'x.jd.com',
                      'Accept': '*/*',
                      'Accept-Encoding': 'gzip, deflate, sdch',
                      'Accept-Language': 'zh-CN,zh;q=0.8',
                      'User-Agent' : "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36",
                      'Cookie':'areaId=1;ipLoc-djd=1-72-4137-0;ipLocation=%u5317%u4EAC;'
                  },
                  agent:false
              }
          }
      },
      {type:_TASK_TYPE_CRAWLING, info:'', ///京东类目页快车位置排名 - 左侧推广 2015.10.20   ---  20
          taskData:{
              crawlingOptions:{
                  hostname : "x.jd.com",
                  port: 80,
                  path : "/ShowInterface?callback=jQuery6656429&ad_ids=47%3A8&ad_type=7&spread_type=1&cai_type=1&cid=1315-1342-12089&new_list=1&page=2",
                  method: 'GET',
                  headers:{
                      'Host':'x.jd.com',
                      'Accept': '*/*',
                      'Accept-Encoding': 'gzip, deflate, sdch',
                      'Accept-Language': 'zh-CN,zh;q=0.8',
                      'User-Agent' : "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36",
                      'Cookie':'areaId=1;ipLoc-djd=1-72-4137-0;ipLocation=%u5317%u4EAC;'
                  },
                  agent:false
              }
          }
      },
      {type:_TASK_TYPE_CRAWLING, info:'', ///京东类目页快车位置排名 - 底部精选 2015.10.20   ---  21
          taskData:{
              crawlingOptions:{
                  hostname : "x.jd.com",
                  port: 80,
                  path : "/ShowInterface?callback=jQuery2362152&ad_ids=48%3A5&ad_type=7&spread_type=1&cai_type=1&cid=1315-1342-12089&new_list=1&template=0&page=2",
                  method: 'GET',
                  headers:{
                      'Host':'x.jd.com',
                      'Accept': '*/*',
                      'Accept-Encoding': 'gzip, deflate, sdch',
                      'Accept-Language': 'zh-CN,zh;q=0.8',
                      'User-Agent' : "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36",
                      'Cookie':'areaId=1;ipLoc-djd=1-72-4137-0;ipLocation=%u5317%u4EAC;'
                  },
                  agent:false
              }
          }
      },
      {type:_TASK_TYPE_CRAWLING, info:'', ///京东 PC端，竞品爬虫，获取SKU价格任务   ---  22
          taskData:{
              crawlingOptions:{
                  hostname : "p.3.cn",
                  port: 80,
                  //path : '/prices/get?skuid=J_1004231398&type=1&area=1_72_2799&callback=cnp&pdtk=&pduid=1754396578&pdpin=&pdbp=0',
                  path : '/prices/get?skuid=J_1004231398',
                  method: 'GET',
                  headers:{
                      'Host':'p.3.cn',
                      'Accept':'*/*',
                      'Connection': 'keep-alive',
                      //'Pragma': 'no-cache',
                      'Cache-Control': 'no-cache',
                      'Accept-Language':'zh-CN,zh;q=0.8',
                      'Accept-Encoding' : 'gzip, deflate, sdch',
                      'Referer':'http://item.jd.com/1042070405.html',
                      'User-Agent' : "* Baiduspider+(+http://www.baidu.com/search/spider.htm”) "
                  },
                  agent:false
              }
          }
      },
      {type:_TASK_TYPE_CRAWLING, info:'', ///普通任务 --- 23
          taskData:{
              crawlingOptions:{
                  url : "https://search.jd.com/s_new.php?keyword=%E7%94%B7%E9%9E%8B&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&cid2=11730&page=2&s=27&scrolling=y&log_id=1530260248.58890&tpl=3_M",
                  method: 'GET',
                  gzip:true,
                  headers:{
                      'Host':'search.jd.com',
                      'Accept':'*/*',
                      'Accept-Encoding' : "identity,gzip",
                      'Connection' : "keep-alive",
                      'X-Requested-With' : "XMLHttpRequest",
                      'Cookie':'ipLoc-djd=1-72-2799-0; ipLocation=%u5317%u4EAC;',
                      'Referer' : "http://search.jd.com/Search?keyword=%E5%9B%9B%E4%BB%B6%E5%A5%97&enc=utf-8&page=2",
                      'User-Agent' : "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36"
                  },
                  agent:false
              }
          }
      },
      {type:_TASK_TYPE_CRAWLING, info:'', ///起点 首页 排行榜 --- 24
          taskData:{
              crawlingOptions:{
                  url : "https://www.qidian.com/",
                  method: 'GET',
                  gzip:true,
                  headers:{
                      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
                        'Cache-Control': 'max-age=0',
                        'Connection': 'keep-alive',
                        'Cookie': '',
                        'Host': 'www.qidian.com',
                        'If-Modified-Since': 'Thu, 01 Nov 2018 11:00:24 GMT',
                        'If-None-Match': "5bdadcc8-2d49f",
                        'Referer': 'http://www.hao123.com/link/v3/?key=pZwYTjCEQLILIz4kpywGmy38mvqVQs%3D%3D&pageid=hao123-pcbdhz-book&monkey=m-pcbdhz-book&title=qidian',
                        'Upgrade-Insecure-Requests': 1,
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
                  },
                  agent:false
              }
          }
      }
  ]
};