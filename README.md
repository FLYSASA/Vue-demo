# vue-demo

### 1. 在github上新建仓库
- 新建好仓库名字,描述
- 勾选README(注意不要写东西,因为在vue init过程中会重置),.gitignore中勾选node(与node相关不上传),license选择none不开源.
- 创建好后,复制ssh,在本地目录下git clone.


### 2. 初始化项目
```
npm init -y  //使用默认设置,创建package.json文件

npm install -g vue-cli    //下载vue-cli命令行工具

vue init webpack .    //vue初始化,.代表当前目录,不要新建
```

在vue init过程中设置如下:
```
? Generate project in current directory? (Y/n)  //按enter即可
? Generate project in current directory? Yes  

? Project name vue-demo
? Project description (A Vue.js project)
? Project description A Vue.js project
? Author (FLYSASA <812071523@qq.com>)
? Author FLYSASA <812071523@qq.com>
? Vue build (Use arrow keys)         //Runtime + Compiler在浏览器上运行,Runtime-only在nodejs上运行,选第一个
> Runtime + Compiler: recommended for most users
  Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specific
HTML) are ONLY allowed in .vue files - render functions are required elsewhere

? Vue build standalone     
? Install vue-router? (Y/n) n
? Install vue-router? No
? Use ESLint to lint your code? (Y/n) n   //不使用ESLint规范代码
? Use ESLint to lint your code? No
? Set up unit tests (Y/n) n              //不使用单元测试
? Set up unit tests No
? Setup e2e tests with Nightwatch? (Y/n) n   //不使用端对端
? Setup e2e tests with Nightwatch? No
? Should we run `npm install` for you after the project has been created? (reco
? Should we run `npm install` for you after the project has been created? (reco
mmended) npm

```

初始化完成后:
```
npm install   //安装依赖
npm run dev   //也可以npm run start 用于开发过程不压缩节省时间,如果要部署使用npm run build.
```

`npm run dev`之后会有一个8080端口用于测试,如果想默认在浏览器自动打开这个端口,可以在:
```
config > index.js > dev: {autoOpenBrowser: false,} 将false改为true.
```

这时候打开页面: 

![1](https://i.loli.net/2018/04/10/5acc1f87dc5fa.png)

### 分析目录树:

![2](https://i.loli.net/2018/04/10/5acc1feec78f7.png)

### 解析目录结构:
```
.
├── README.md
├── build                    # build 目录用于存放构建脚本，比如 webpack 配置文件
├── config                   # config 目录用于存放一些配置信息，比如配置打包后的 bundle 文件存放在哪里
├── index.html               # 首页
├── node_modules    
├── package.json    
├── src                      # 除了首页index.html，其他的源代码都在 src 目录里
├── static                   # static 目录用于放置静态资源，比如 favicon.ico 文件等
└── test                     # 单元测试等代码放在 test 目录里
```

- 首页文件`index.html`中没有script标签,
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>vue-demo</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->    <!-- 自动注入 -->
  </body>
</html>

```

- 入口文件在src中的`main.js`
```js
import Vue from 'vue'     //引入了vue
import App from './App'   //引入主组件

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },  
  template: '<App/>'    //template就是html
})
```

> `main.js`会自动注入到`index.html`,将#app元素替换成<App/>标签,这个标签具体内容在组件App.vue里

- 引入的主组件`App.vue`
```js
//html模块,mvc里的view
<template>                           
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>
  </div>
</template>

// <script>功能:  用于引入其它组件
<script>
import HelloWorld from './components/HelloWorld' //引入其它组件,HelloWorld是变量.

export default {
  name: 'App',
  components: {   //我的组件中出现的其它组件,也是ES6语法.
    HelloWorld    //变量
  }
}
</script>


//css样式
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

> 可以得知: `App.vue`里的`template`部分就是最终页面显示的部分.`App.vue`是<App/>标签展示的具体内容.

> 综上: 一般main.js不需要更改,它会自动引入主组件App.vue,展示其内容.然后注入到index.html.所以构建页面写好主组件及各个分组件即可.


#### 定义一个组件以及引入该组件
- 在components文件夹中新建`Nie.vue`文件
- 在该文件中定义好,`template html`,以及`style`
- 在主组件中引入该组件,在script标签里引入: 
```js
<template>
    <Nie/>
</template>
<script>  
import Nie from './components/Nie'
export default {
    components: {         //这句一定不能少,在该组件中引入的其它组件
        'Nie': Nie        //局部注册,'Nie'注册<Nie/>标签,Nie 为Nie.vue中的template.
    }
}
</script> 
```

> 综上: 
> - 构建组件只需要定义好template和style,如果构建的组件中需要引入其它组件,需要使用script标签,import XXX from './components/XXX'
> - 构建好后,用App.vue引入,使用 script标签,`import XXX from './components/XXX',export default {components: {XXX}}`

##### 注意全局注册和局部注册的区别:
**全局注册**: 
在main.js中注册:
```js
Vue.component('Jack',{    //'Jack'注册的标签名字
    template: '<div>I am Jack</div>'
})
```
然后直接在App.vue中引入即可:
```html
<template>
    <Jack/>   <!-- 不需用引入 -->
</template>
```
**局部注册组件**
新建组件Jack.vue  (组件的首写字母一般大写)
在组件中定义:
```js
<template>
  <div class="he">Jack</div>
</template>

<style>
  .he{
      color: red;
  }
</style>
```
在主组件App.vue中引入并使用:
```html
<template>
  <Jack/>
</template>
```
```js
<script>
import Jack from './components/Jack'
export default {
    components: {
        'Jack': Jack
    }
}
</script>
```

> 尽量少用全局注册组件



### 需求解析
![分区](https://i.loli.net/2018/04/05/5ac5de86bf2c4.png)

分为三大块,所以在App.vue中的`template`应该有三块.

```html
<template>
  <div id="app">
    <Topbar></Topbar>
    <Editor></Editor>
    <Preview></Preview>   
  </div>
</template>

<script>
import Topbar from './components/Topbar'   //引入Topbar变量
import Editor from './components/Editor'
import Preview from './components/Preview'

export default {
  name: 'App',
  components: {    //注册标签名
    Topbar,Editor,Preview
  }
}
</script>
```

在分组件`Topbar.vue,Editor.vue,Preview.vue`中定义好各自的template和style.
> template 直接子元素只能是一个

#### 重置css,如何引入自定义样式scss
- 在assets文件夹里新建一个reset.scss.写好样式
- 在main.js中引入,`import './assets/reset.scss'`,因为css格式是scss,这时候提示

![3](https://i.loli.net/2018/04/10/5acc6215a0680.png)

- `npm install -d sass-loader node-sass`

- 下载好后重新运行`npm run dev` 就可以使用scss了.


#### reset.css和normalize.css的区别:
- normalize.css:
用于统一默认样式,让页面默认页面在不同浏览器上一样.
- reset.css
篡改默认样式,更暴力

使用: 
- 一般normalize引入在reset前面
- `npm i -s normalize.css`     下载normalize.css
- 然后在main.js中,直接 `import 'normalize.css'`


### 布局三大块,样式修改
在App.vue中: 
```js
<template>
  <div id="app">
    <Topbar class="topbar"></Topbar>
    <main>
      <Editor class="editor"></Editor>
      <Preview class="preview"></Preview>   
    </main>

  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.topbar{
  background: red;
}
main{
  flex-grow: 1;
  background: green;
}
main{                         //左右布局,父容器display: flex;左边固定宽度,右边flex-grow: 1;随宽度自动伸缩
  display: flex;
}
main > .editor{                     
  width: 20em;
}
main > .preview{
  flex-grow: 1;
}
</style>
```

**布局问题**: 
- 左右布局,父容器`display: flex;`,子元素左边写死宽度,右边的子元素 `flex-grow: 1;`自动伸缩
<br/>
- main占满窗口剩余的高度.两种方法
方法1: 使用vh
父容器:  `height: 100vh; display: flex;  flex-direction: column;`
子元素main: `flex-grow: 1;`

方法2: 使用height: 100%;(兼容性好些)
给父,爷爷,祖先全部都要height: 100%;
`#app,body,html{height: 100%; overflow: hidden;}`
父容器:  ` display: flex;  flex-direction: column;`
子元素main: `flex-grow: 1;`

> 总结: 
- 组件名首写字母大写.
- 外部的css,写在assets文件夹里.
- 引入normalize.css,直接`npm i -s normalize.css`,然后在App.vue中直接`import`引入.

## 3 按设计稿开发功能样式
设计稿:

![分区](https://i.loli.net/2018/04/05/5ac5de86bf2c4.png)

App.vue是主组件,其样式只是总体布局,每个分区的具体样式需要在各个分组件中实现.

- Topbar样式
引入ele组件: http://element.eleme.io/#/zh-CN/component/radio

下载:
`npm i element-ui -s`

引入Element: 

![4](https://i.loli.net/2018/04/10/5acc90bfe59cb.png)

按文档,复制代码,在 main.js 中写入以下内容：

![5](https://i.loli.net/2018/04/10/5acc91790b01e.png)

如何使用?
参照文档,组件button,复制代码至Topbar.vue

```
<template>
  <div id="topbar">
    <div class="logo">Preview</div>
    <div class="actions">
      <button>注册</button>
      <button>登录</button>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
    </div>
  </div>
</template>
```

效果如下: 

![6](https://i.loli.net/2018/04/10/5acc94fe60b4d.png)
