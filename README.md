# 写在前面

由于最近公司业务不是很忙，空闲时间比较多，于是就在纠结Vue.js（之前就学习过）和Node.js先专研哪个比较好，最终选择了先玩玩Node.js。经过一段时间的学习，就有了教程 [Node+Koa2+Mysql 搭建简易博客](http://www.wclimb.site/2017/07/12/Node-Koa2-Mysql-%E6%90%AD%E5%BB%BA%E7%AE%80%E6%98%93%E5%8D%9A%E5%AE%A2/)  [GitHub地址](https://github.com/wclimb/Koa2-blog)，想要了解的可以先看看，个人水平有限，希望可以帮到你。
大概过来一个多月，我决定两路开工。使用Node.js给前端写接口，配备后台管理功能，先把后台搭建好。大概几天过后，后台一些简单的功能实现后，就开始用Vue.js开始搭建前台，也一直在想做点什么比较好，于是就做了个豆瓣评分类似的项目。

## 技术栈

> 由于页面不是很多，vuex用的不多，关键掌握怎么实现就好了

`vue2` + `vuex` + `vue-router` + `webpack` + `fetch` + `sass` + `flex` + `svg` + `阿里字体图标`

## 运行

```
git clone https://github.com/wclimb/vue-video.git

cd vue-video

npm install  建议使用淘宝镜像(https://npm.taobao.org/) =>  cnpm i

npm run dev (运行项目)

npm run build (打包项目)
```
## 功能

* 1. 注册登录登出 + 验证码 密码检测，如果用户不存在则自动创建
* 2. 检测是否登录，如果没有登录则不允许评论和评价
* 3. 可以上传影片到后台，进行前台展示
* 4. 评分功能，初始化评分可以自由设置，如果没有人like则默认显示原始评分，如果有则计算当前vide的评分
* 5. 修改用户名，检测用户名是否跟其他人重复
* 6. 上传头像，默认没有头像
* 7. 评论功能，评论之后可以在个人中心展示，并且可以删除
* 8. 搜索功能，可以搜索存在的影片，如果没有则显示无结果
* 9. 自己喜欢的video和评论的内容会在个人中心显示


综上：`注册` + `登录` + `登出` + `评分` + `修改用户名` + `上传头像` + `评论` + `搜索` 


如果觉得对你有帮助还望关注一下，有问题可以即使提哟，觉得不错的话`star`一下也是可以的哟

## 前端线上地址

项目是手机端的，请使用谷歌浏览器手机预览模式

预览：[vue-video](http://video.wclimb.site)

手机扫描图下二维码预览

![](http://oswpupqu5.bkt.clouddn.com/1504574571.png)

## 后端线上地址

技术栈：`node` + `koa2` + `mysql` 
预览：[video-admin](http://vue.wclimb.site)
GitHub: [管理后台](https://github.com/wclimb/video-admin)
## 前端演示

![](http://oswpupqu5.bkt.clouddn.com/vue1.gif)

### 主页

![](http://oswpupqu5.bkt.clouddn.com/home.png) ![](http://oswpupqu5.bkt.clouddn.com/search.png)

### 登录页

![](http://oswpupqu5.bkt.clouddn.com/login.png)

### 个人中心页

![](http://oswpupqu5.bkt.clouddn.com/personal.png) ![](http://oswpupqu5.bkt.clouddn.com/personal1.png)


### 详情页

![](http://oswpupqu5.bkt.clouddn.com/detail.png)


## 后台演示

![](http://oswpupqu5.bkt.clouddn.com/admin.gif)

## 目录结构

```
|-- build                            // webpack配置文件
|-- config                           // 项目打包路径
|-- src                              // 源码目录
|   |-- assets                       // 图片文件
|   |-- base                   		 // 移动端适配
|   |-- components                   // 组件
|   |-- data                         // 接口
|   |-- router						 // 路由配置
|   |-- store                        // 状态管理
|   |-- style                        // 样式
|    	App.vue                      // 页面入口文件
|    	main.js                      // 程序入口文件
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 代码编写规格
|-- .gitignore                       // git忽略的文件
|-- .postcssrc.js                    // post-loader的插件配置文件
|-- index.html                       // 入口html文件
|-- package.json                     // 项目及工具的依赖配置文件
```
