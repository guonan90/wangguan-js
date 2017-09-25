
require('./../js/router.js');

//引入路由页面html
var lysz = require('./html/lysz.html');
var kfzgl = require('./html/kfzgl.html');
var dzcj = require('./html/dzcj.html');
var tcdz = require('./html/tcdz.html');
var zygl = require('./html/zygl.html');
var sqfw = require('./html/sqfw.html');
var clgl = require('./html/clgl.html');

//引入路由页面less
require('./less/lysz.less');
require('./less/kfzgl.less');
require('./less/dzcj.less');
require('./less/tcdz.less');
require('./less/zygl.less');
require('./less/sqfw.less');
require('./less/clgl.less');

//引入路由页面js
require('./js/common.js');

//配置路由
spaRouters.map('/lysz',function(transition){
    spaRouters.syncFun(function(transition){
      document.getElementById("content").innerHTML = lysz;
    },transition);
});
spaRouters.map('/kfzgl',function(transition){
    spaRouters.syncFun(function(transition){
      document.getElementById("content").innerHTML = kfzgl;
    },transition);
});
spaRouters.map('/dzcj',function(transition){
    spaRouters.syncFun(function(transition){
      document.getElementById("content").innerHTML = dzcj;
    },transition);
});
spaRouters.map('/tcdz',function(transition){
    spaRouters.syncFun(function(transition){
      document.getElementById("content").innerHTML = tcdz;
    },transition);
});
spaRouters.map('/zygl',function(transition){
    spaRouters.syncFun(function(transition){
      document.getElementById("content").innerHTML = zygl;
    },transition);
});
spaRouters.map('/sqfw',function(transition){
    spaRouters.syncFun(function(transition){
      document.getElementById("content").innerHTML = sqfw;
    },transition);
});
spaRouters.map('/clgl',function(transition){
    spaRouters.syncFun(function(transition){
      document.getElementById("content").innerHTML = clgl;
    },transition);
});

//路由回调函数
spaRouters.beforeEach(function(transition){
    transition.next();//路由显示函数
    //路由跳转前回调函数
});
spaRouters.afterEach(function(transition){
    //路由跳转后回调函数
});
spaRouters.init();