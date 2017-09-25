src 为开发文件存放
build 为打包出来的文件存放
webpack
webpack   --打包指令
webpack-dev-server  --热更新开发环境 ps：切记每次打开前和开发后都要进行一次打包///////
PS：最后一句显示  webpack: Compiled successfully.  --表示开发环境运行成功////
开发环境：loaclhost:8080

src里包含：
conponents --组件化开发 ps：有例子，请仿照例子尝试下，再进行开发////组件化和模块化都要在app.js中引入//有例子//
modules    --模块化开发 ps：有例子，请仿照例子尝试下，再进行开发////模块化不是很常用//如果不用可以删掉
router     --前端路由  ps：有例子，请仿照例子尝试下，再进行开发////
images     --存放图片，支持jpg，png，gif，jpeg
css        --存放重置浏览器的样式reset文件--勿动！--还存放有globel文件，为全局样式文件。里面的类名都可以使用。index.less-这个是设置index.html的样式的。

js         --存放js文件，包含jq和router --勿动！
index.html --可以仿照组件化写入div --其他勿动！--不是用来开发的//
app.js     --最最最重要的入口文件，可以引入组件和模块，--其他勿动！


PS：本环境是适用于jQuery的开发环境。切记一点：无论准备在哪个js里使用jq，请先用var $ = require('jq路径');引入jq！