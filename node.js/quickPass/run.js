const st =
  "北京腾讯、阿里巴巴、字节跳动、华为、百度、京东、美团、网易、谷歌、爱奇艺、微软、快手、金山、联想、IBM、搜狐畅游、新浪、Hulu、脉脉、小米搜狐、陌陌、知乎、优酷、牛客网、当当网、高德、微博、36氪、易车网、58集团、爱彼迎、亚马逊、用友、猿辅导、旷视、作业帮、完美世界、第四范式、果壳网、咪咕、滴滴出行、数美科技、Flow++、携程、日志易、FUNPLUS、好未来、亚信、懂球帝、美丽说、猎豹、趋势科技、便利蜂、优米网、寒武纪、乐信、顺丰科技、老虎集团、美柚、木仓科技、美图、映客直播、拼多多、intel、创新奇智、地平线机器人、搜狗、暴风影音、图森未来、创新工场、freewheel、口袋购物、聚美优品、美菜网、中企动力、墨迹天气、汽车之家、去哪儿网、楚楚街、我爱我家、印象笔记、豆瓣、奇虎360、瓜子二手车、thoughtworks、文知远行、keep、锤子科技、infoQ、宇信科技、祖龙娱乐、中软国际、乐元素、思科、中文在线、宜信、马蜂窝、竞技世界、唱吧、阿里健康、一点资讯、新东方、触控科技、祖龙娱乐、VIPKID、途牛、中文在线、广联达、像素游戏上海腾讯、阿里巴巴、字节跳动、拼多多、百度、滴滴出行、美团点评、微软、爱奇艺、思科、携程、IBM、饿了么、小红书、英特尔、海康威视、平安科技、米哈游、唯品会、银联、远景能源、依图科技、哔哩哔哩、哈哆出行、三七互娱、地平线机器人、ThoughtWorks、喜马拉雅FM、点融网、eBay、UCloud、墨鹃、沪江、友塔游戏、东方财富网、完美世界、蚂蚁金服、星环科技、paypal、谷歌、趣头条、DelIEMC、巨人网络、纽劢科技、虎扑体育、世纪天成、网宿科技、安居客、简书.、酷家乐、英语流利说、玖富、微盟、触宝、阅文集团、创新工场、微鲸科技、咪咕、盛趣游戏、汽车之家、蔚来汽车、合合科技、七牛云、百姓网、洋码头广州腾讯、阿里巴巴、华为、深信服、网易、携程、中兴、慧聪、金山、酷狗、猎豹、CVTE、4399游戏、三七互娱、魅族、科大讯飞、荔枝FM、超级课程表、21CN、多益网络、IBM、唯品会、欢聚时代、云从科技、陌陌、汇量科技、租租车、4399深圳腾讯、阿里巴巴、华为、字节跳动、百度、大疆、深信服、oppo、vivo、金蝶、追一科技、商汤科技、一加、中兴、shopee、微众银行、随手科技、尚游游戏、SHEIN、联想、招银网络科技、平安科技、吉比特、TCL、微软、迅雷、富途、货拉拉、建信金融、壹帐通杭州阿里巴巴、蚂蚁金服、华为、网易、滴滴出行、蘑菇街、微策略、浙江大华、海康威视、招银网络科技、菜鸟物流、酷家乐、51信用卡、婚礼纪、美丽说、挖财、花鹏网、美丽联合、恒生电子、贝贝网、丁香园、有赞、微店、宇视科技、顺网科技、虹软、税友、阿里云成都阿里巴巴、京东、腾讯、蚂蚁金服、携程、爱奇艺、百词斩、美团点评、咕咚、完美世界、华为研究所、Thoughtworks、Camera360、同程艺龙、移花互动、IT茶馆、陌陌、Tower、tap4fun、迅游、锦天科技文轩网、果小美、货车帮厦门美图、美团点评、美柚、4399游戏、易联众、网宿科技、站长之家、易名科技、南讯软件、点击网络、极致游戏、三五互联、淘鞋网、小鱼网、同步推、万翔商城、吉比特、名鞋库、飞鱼科技、返还网重庆腾讯、爱奇艺、猪八戒、网上解放碑、万年历、云从科技、完美世界、神指奇动、博拉网络、AA拼车、中移物联网、易宠科技、易极付、大龙网、灵狐科技武汉斗鱼、海豚浏览器/百纳信息、美团榛果民宿、WPS、石墨文档、极意网络等南京华为、中兴、趋势科技、中软、苏宁、途牛、亚信、焦点科技、扇贝网、帆软西安暴走漫画、新蛋、西安新浪游戏";
let right = [];
st.split("、").map((s) => {
  if (!right.includes(s)) {
    right.push(s);
  }
});
console.log(right);
