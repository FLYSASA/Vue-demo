# vue-demo

### 1. 在 github 上新建仓库

* 新建好仓库名字,描述
* 勾选 README(注意不要写东西,因为在 vue init 过程中会重置),.gitignore 中勾选 node(与 node 相关不上传),license 选择 none 不开源.
* 创建好后,复制 ssh,在本地目录下 git clone.

### 2. 初始化项目

```
npm init -y  //使用默认设置,创建package.json文件

npm install -g vue-cli    //下载vue-cli命令行工具

vue init webpack .    //vue初始化,.代表当前目录,不要新建
```

在 vue init 过程中设置如下:

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

`npm run dev`之后会有一个 8080 端口用于测试,如果想默认在浏览器自动打开这个端口,可以在:

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

* 首页文件`index.html`中没有 script 标签,

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

* 入口文件在 src 中的`main.js`

```js
import Vue from "vue"; //引入了vue
import App from "./App"; //引入主组件

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>" //template就是html
});
```

> `main.js`会自动注入到`index.html`,将#app 元素替换成<App/>标签,这个标签具体内容在组件 App.vue 里

* 引入的主组件`App.vue`

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

> 综上: 一般 main.js 不需要更改,它会自动引入主组件 App.vue,展示其内容.然后注入到 index.html.所以构建页面写好主组件及各个分组件即可.

#### 定义一个组件以及引入该组件

* 在 components 文件夹中新建`Nie.vue`文件
* 在该文件中定义好,`template html`,以及`style`
* 在主组件中引入该组件,在 script 标签里引入:

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
>
> * 构建组件只需要定义好 template 和 style,如果构建的组件中需要引入其它组件,需要使用 script 标签,import XXX from './components/XXX'
> * 构建好后,用 App.vue 引入,使用 script 标签,`import XXX from './components/XXX',export default {components: {XXX}}`

##### 注意全局注册和局部注册的区别:

**全局注册**:
在 main.js 中注册:

```js
Vue.component("Jack", {
  //'Jack'注册的标签名字
  template: "<div>I am Jack</div>"
});
```

然后直接在 App.vue 中引入即可:

```html
<template>
    <Jack/>   <!-- 不需用引入 -->
</template>
```

**局部注册组件**
新建组件 Jack.vue (组件的首写字母一般大写)
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

在主组件 App.vue 中引入并使用:

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

分为三大块,所以在 App.vue 中的`template`应该有三块.

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

在分组件`Topbar.vue,Editor.vue,Preview.vue`中定义好各自的 template 和 style.

> template 直接子元素只能是一个

#### 重置 css,如何引入自定义样式 scss

* 在 assets 文件夹里新建一个 reset.scss.写好样式
* 在 main.js 中引入,`import './assets/reset.scss'`,因为 css 格式是 scss,这时候提示

![3](https://i.loli.net/2018/04/10/5acc6215a0680.png)

* `npm install -d sass-loader node-sass`

* 下载好后重新运行`npm run dev` 就可以使用 scss 了.

#### reset.css 和 normalize.css 的区别:

* normalize.css:
  用于统一默认样式,让页面默认页面在不同浏览器上一样.
* reset.css
  篡改默认样式,更暴力

使用:

* 一般 normalize 引入在 reset 前面
* `npm i -s normalize.css` 下载 normalize.css
* 然后在 main.js 中,直接 `import 'normalize.css'`

### 布局三大块,样式修改

在 App.vue 中:

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

* 左右布局,父容器`display: flex;`,子元素左边写死宽度,右边的子元素 `flex-grow: 1;`自动伸缩
  <br/>
* main 占满窗口剩余的高度.两种方法方法 1: 使用 vh
  父容器: `height: 100vh; display: flex; flex-direction: column;`
  子元素 main: `flex-grow: 1;`

方法 2: 使用 height: 100%;(兼容性好些)
给父,爷爷,祖先全部都要 height: 100%;
`#app,body,html{height: 100%; overflow: hidden;}`
父容器: `display: flex; flex-direction: column;`
子元素 main: `flex-grow: 1;`

> 总结:

* 组件名首写字母大写.
* 外部的 css,写在 assets 文件夹里.
* 引入 normalize.css,直接`npm i -s normalize.css`,然后在 App.vue 中直接`import`引入.

## 3 按设计稿开发功能样式

设计稿:

![分区](https://i.loli.net/2018/04/05/5ac5de86bf2c4.png)

App.vue 是主组件,其样式只是总体布局,每个分区的具体样式需要在各个分组件中实现.

* Topbar 样式引入 ele 组件: http://element.eleme.io/#/zh-CN/component/radio

下载:
`npm i element-ui -s`

引入 Element:

![4](https://i.loli.net/2018/04/10/5acc90bfe59cb.png)

按文档,复制代码,在 main.js 中写入以下内容：

![5](https://i.loli.net/2018/04/10/5acc91790b01e.png)

如何使用?
参照文档,组件 button,复制代码至 Topbar.vue

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

去除不需要的按钮:

```
<template>
  <div id="topbar">
    <div class="logo">Preview</div>
    <div class="actions">
      <el-button type="primary">注册</el-button>
      <el-button>登录</el-button>
    </div>
  </div>
</template>
```

![7](https://i.loli.net/2018/04/10/5acc993f2c6c8.png)

```css
/* 对齐LOGO和按钮 */
#topbar {
  display: flex;
  justify-content: space-between;
  padding: 16px; //约定所有单位为8的倍数
  font-size: 20px;
  align-items: center; //对齐logo和按钮
}
```

#### Editor 和 Preview 分区样式

在 App.vue 里初步布局:

```css
.topbar {
  position: relative; //必须设置位置,z-index才有效
  z-index: 1; //盖住editor
  box-shadow: 0 0 3px hsla(0, 0, 0, 0.5);
}
main {
  display: flex;
  flex-grow: 1;
  background: #ddd;
  > .editor {
    width: 40em;
    margin: 16px 8px 16px 16px;
    background: white;
    box-shadow: 0 0 3px hsla(0, 0, 0, 0.5);
    border-radius: 3px;
    overflow: hidden; //因为有圆角,不设置这个的话,会溢出四个角
  }
  > .preview {
    flex-grow: 1;
    margin: 16px 16px 16px 8px;
    background: white;
    box-shadow: 0 0 3px hsla(0, 0, 0, 0.5);
    border-radius: 3px;
    overflow: hidden; //因为有圆角,不设置这个的话,会溢出四个角
  }
}
```

编辑 Editor 样式:

```html
<template>
  <div id="editor">
      <nav>
          <ol>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
          </ol>
      </nav>
      <div class="panels"></div>
  </div>
</template>
```

六个图标 ol>li,使用 iconfont symbol. http://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=623227

使用 iconfont symbol 步骤:

1.  将选好的图标添加至项目
2.  点击 symbol 生成在线链接 复制代码
3.  在 index.html 中加入 script:src 复制代码链接
4.  在 App.vue 加入通用 css 代码（引入一次就行）

```css
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
```

5.  挑选相应图标并获取类名，应用于页面：

```html
<svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-xxx"></use>
</svg>
```

在 editor.vue 中,

```
<template>
  <div id="editor">
    <nav>
      <ol>
        <li class="active">
          <svg class="icon">
            <use xlink:href="#icon-2shenfenzhenghaoma"></use>
          </svg>
        </li>
        <li>
          <svg class="icon">
            <use xlink:href="#icon-gongwenbao"></use>
          </svg>
        </li>
        <li>
          <svg class="icon">
            <use xlink:href="#icon-book"></use>
          </svg>
        </li>
        <li>
          <svg class="icon">
            <use xlink:href="#icon-heart"></use>
          </svg>
        </li>
        <li>
          <svg class="icon">
            <use xlink:href="#icon-iconjiangbei"></use>
          </svg>
        </li>
        <li>
          <svg class="icon">
            <use xlink:href="#icon-cc-phone-handset"></use>
          </svg>
        </li>

      </ol>
    </nav>
    <div class="panels"></div>
  </div>
</template>

<style lang="scss">
  #editor {
    display: flex;
    nav {
      background: #000;
      width: 80px;
      > ol > li {
          padding: 8px 0;
          text-align: center;
          > .icon{
              fill: #fff;
              width: 24px;
              height: 24px;
          }
          &.active{
              background: #fff;
              .icon{
                  fill: #000;
              }
          }
      }
    }
  }
```

设置好样式,然后写交互代码 js.

```html
<li v-bind:class="{active:true}"></li>   <!-- v-bind:类名="{属性:判断语句true or false}" 不要随便加空格!!!-->
```

根据上面衍生出

```html
<template>
<li v-bind:class="{active: currentTab === 0}" v-on:click="{currentTab === 0}">
</template>
```

```js
export default {
  data() {
    return {
      currentTap: 0 //data的currentTab与li绑定,初始值
    };
  }
};
```

```
//Editor.vue完整代码
<template>
  <div id="editor">
    <nav>
      <ol>
        <li v-bind:class="{active:currentTab === 0}" v-on:click="currentTab = 0">
          <svg class="icon">
            <use xlink:href="#icon-2shenfenzhenghaoma"></use>
          </svg>
        </li>
        <li v-bind:class="{active:currentTab === 1}" v-on:click="currentTab = 1">
          <svg class="icon">
            <use xlink:href="#icon-gongwenbao"></use>
          </svg>
        </li>
        <li v-bind:class="{active:currentTab === 2}" v-on:click="currentTab = 2">
          <svg class="icon">
            <use xlink:href="#icon-book"></use>
          </svg>
        </li>
        <li v-bind:class="{active:currentTab === 3}" v-on:click="currentTab = 3">
          <svg class="icon">
            <use xlink:href="#icon-heart"></use>
          </svg>
        </li>
        <li v-bind:class="{active:currentTab === 4}" v-on:click="currentTab = 4">
          <svg class="icon">
            <use xlink:href="#icon-iconjiangbei"></use>
          </svg>
        </li>
        <li v-bind:class="{active:currentTab === 5}" v-on:click="currentTab = 5">
          <svg class="icon">
            <use xlink:href="#icon-cc-phone-handset"></use>
          </svg>
        </li>
      </ol>
    </nav>
    <ol class="panels">
        <li v-bind:class="{active:currentTab === 0}">tab1</li>
        <li v-bind:class="{active:currentTab === 1}">tab2</li>
        <li v-bind:class="{active:currentTab === 2}">tab3</li>
        <li v-bind:class="{active:currentTab === 3}">tab4</li>
        <li v-bind:class="{active:currentTab === 4}">tab5</li>
        <li v-bind:class="{active:currentTab === 5}">tab6</li>
    </ol>
 </div>
</template>


<script>
export default {
  data() {
    //data必须是个函数,返回对象
    return {
      currentTab: 0
    };
  }
};
</script>

<style lang="scss">
#editor {
  display: flex;
  nav {
    background: #000;
    width: 80px;
    > ol > li {
      padding: 16px 0;
      text-align: center;
      > .icon {
        fill: #fff;
        width: 36px;
        height: 36px;
      }
      &.active {
        background: #fff;
        .icon {
          fill: #000;
        }
      }
    }
  }
  .panels{
      >li{
        display: none;
        &.active{
            display: block;
        }
      }
  }
}
</style>
```

> 利用 data 里面的 currentTab 数据,完成样式转换

##### 优化上面代码

```HTML
<!-- Editor.vue -->
    <nav>
      <ol>
        <li v-for="i in [0,1,2,3,4,5]"
        v-bind:class="{active: currentTab === i}"
        v-on:click="currentTab = i">
            <svg class="icon">
               <use v-bind:xlink:href="`#icon-${icons[i]}`"></use>
            </svg>
        </li>
      </ol>
    </nav>
```

> 使用 v-for 遍历将会大大节省代码量,引入 i, 在引入 svg 的时候,使用
> `` v-bind:xlink:href="`#icon-${icons[i]}`" ``

解析:

* `#icon-${icons[i]}`是 ES6 新语法,使用反撇号包裹**字符串**
* `${icons[i]}` ${}是占位符,里面是函数或者是运算式,会自动返回运算结果.
* 因为存在短横线所以需要用引号包裹

```js
export default {
  data() {
    return {
      currentTab: 0,
      icons: [
        "2shenfenzhenghaoma",
        "gongwenbao",
        "book",
        "heart",
        "iconjiangbei",
        "cc-phone-handset"
      ]
    };
  }
};
```

> 解析: 引入数组 icons['XXX']

#### 继续优化下面的

```html
<ol class="panels">
    <li v-for="i in [0,1,2,3,4,5]" v-bind:class="{active:currentTab === i}">
        {{tabs[i]}}
    </li>
</ol>
```

```js
export default {
  data() {
    return {
      currentTab: 0,
      icons: ["xxx"]
    };
  }
};
```

> 总结:

* 套路 1: 刚开始不熟悉的话,可以用最丑的代码实现基本的功能,比如写 6 个 li,每个 li 都绑定 v-bind.

1.  常用的 v-bind 的绑定格式: `v-bind:class="{active:保尔值或者表达式运算返回保尔值}"`,前提在 scss 中定义好 active 的样式.这样当为真时候就能显示 active 样式.
2.  常用的`v-on:click="currenTab = 1"`(点击赋值) 与`v-bind:class="{active:currentTab===1}"` 搭配使用,这样点击就能激活 active 属性.

* 套路 2: 当优化 li 的时候,常使用`v-for="i in [0,1,2,3,4,5]"`,然后将上面的 li 只写一个,将数字都改成`i`.
* 套路 3: symbol 字体图标引入使用:

```html
<svg class="icon">
    <use v-bind:xlink:href="`#icon-${icons[i]}`"></use>
</svg>
```

> 注意:

1.  在属性中引入 js 需要用引号, "`#icon-${icons[i]}`" 外面的双引号是 html 自备的,里面的反撇号是 js 带的引号,代表字符串.因为当短横线出现在属性中,需要用字符串格式.
2.  反撇号常与占位符`${}`一起使用,占位符里面是一个函数或者运算,会将其计算的结果作为字符串输出.

* 一般可以使用 v-bind 与 active 属性控制元素的显隐

#### 构建 panels

> 需要明确的是 jquery 的思维方式: 以 DOM 为中心

1.  DOM 获取 input value
2.  ajax 发送数据

> Vue 的 MVVM 模式的思维方式: 以数据为中心

1.  首先在 data 里面构建好需要的数据对象
2.  MVVM 会帮你将数据映射出 DOM(如: input name; input city;input birth),当用户修改数据,会自动映射到数据对象.我们只需要关心数据对象内容.
3.  因此构建页面,首先应该是在 data 中构建好内容.

##### 个人信息栏

```html
<ol class="panels">
      <li v-for="i in [0,1,2,3,4,5]" v-bind:class="{active:currentTab === i}">
        <h2>个人信息</h2>
        <el-form v-bind:submit="onSubmit">    <!-- 监听submit事件,触发后回调onSubmit -->
          <el-form-item label="姓名">
            <el-input v-model="profile.name"></el-input>
          </el-form-item>
          <el-form-item label="城市">
            <el-input v-model="profile.city"></el-input>
          </el-form-item>
          <el-form-item label="出生年月">
            <el-input v-model="profile.birth"></el-input>
          </el-form-item>
        </el-form>
      </li>
</ol>
```

为了获取到提交内容,刚开始我们在<el-form>使用`v-bind:submit="onSubmit"`,当监听到 submit 事件时触发 onSubmit 函数

```js
export default {
  data(){
    return{
      currentTab: 0,
      icons: ['2shenfenzhenghaoma', 'gongwenbao', 'book', 'heart', 'iconjiangbei', 'cc-phone-handset'],
      profile: {
        name: '',
        city: '',
        birth: ''
      }
    }
  },
  methods: {
    onSubmit(){
      console.log(this.profile)
    }
  }
}
```

> 但是发现,因为没有提交按钮所以根本无法触发submit事件. 如何获取到用户输入的this.profile呢?我们换种方式:

```html
<ol class="panels">
      <li v-for="i in [0,1,2,3,4,5]" v-bind:class="{active:currentTab === i}">
        <h2>个人信息</h2>
        <el-form>    
          <el-form-item label="姓名">
            <el-input v-model="profile.name"></el-input>
          </el-form-item>
          <el-form-item label="城市">
            <el-input v-model="profile.city"></el-input>
          </el-form-item>
          <el-form-item label="出生年月">
            <el-input v-model="profile.birth"></el-input>
          </el-form-item>
        </el-form>
      </li>
</ol>
```
html去掉监听

```js
export default {
  data(){
    return {
      currentTab: 0,
      icons: ['2shenfenzhenghaoma', 'gongwenbao', 'book', 'heart', 'iconjiangbei', 'cc-phone-handset'],
      profile: {
        name: '',
        city: '',
        birth: ''
      }
    }
  },
  created(){     //组件被创建时的回调函数
    console.log(this.profile)
    setTimeout(()=>{           //此处使用箭头函数是因为,防止this变为window
      console.log(this.profile)    
    },5000)
  }
}
```

> 注意methods对应的是一个对象,里面有很多函数方法,格式是:
```js
methods: {
  f1(){

  },
  f2(){

  }
}
```
> 而created是一个钩子函数(当组件创建时的回调函数),格式是:
```js
created(){
  f1(){}
}

或者

created: function(){
  f1(){}
}
```

改完效果如下: 

![8](https://i.loli.net/2018/04/11/5acd656437513.png)


获取到信息后得知,用户输入的信息是和data里面的profile双向绑定的.

##### 修改panels样式 工作经历
```html
  <li v-bind:class="{active:currentTab === 1}">
    <h2>工作经历</h2>
    <el-form>
      <div v-for="(work,index) in workExp">
        <el-form-item label="公司">
          <el-input v-model="work.company"></el-input>
        </el-form-item>
        <el-form-item label="工作内容">
          <el-input v-model="work.content"></el-input>
        </el-form-item>
        <el-button type="primary" icon="el-icon-delete" v-on:click="delWorkExp(index)"></el-button>
        <hr>    <!-- 分割线 -->
      </div>
      <el-button type="primary" v-on:click="addWorkExp">添加</el-button>
    </el-form>
  </li>
```

```js
export default {
  data(){
    currentTab: 0,
    icons:['2shenfenzhenghaoma', 'gongwenbao', 'book', 'heart', 'iconjiangbei', 'cc-phone-handset'],
    profile: {
        name: '',
        city: '',
        birth: ''
    },
    //工作经历数据,因为有多段经历,所以是数组
    workExp: [{company:'',content:''}]
  },
  methods: {
    addWorkExp(){
      this.workExp.push({company:'',content:''})
    },
    delWorkExp(index){
      this.workExp.splice(index,1)
    }
  }
}
```

> 解析:
- 使用`<el-form-item>`组件,在其里面使用`<div v-for=""></div>` 
- 绑定的之前使用`div v-for`遍历 数组`workExp`, `v-for="(work,index) in workExp"`,这样就能将数组中的每一个对象添加至页面. index是当前遍历的work的索引值. vue语法`v-for="(item,index) in items"`
- v-for遍历写好后,就可以写`<el-form-item>`和`<el-input>`.
`<el-form-item>`: 负责标签标题, 加入`label="标题名字"`即可
`<el-input>`: 在标题内部,输入框. 需要绑定数据 使用`v-model="work.company"` 因为此时遍历项是work.所以用`work.company`的形式.
- 写 删除按钮,使用`<el-button>`
需要注意的是,因为删除按钮是随着添加内容也同步增加,所以需要写在`div v-for`遍历里面:
`<el-button type="primary" icon="el-icon-delete" v-on:click="delWorkExp(index)"></el-button>`
绑定`v-on:click="事件"`,这里需要传入index,保证传入参数给`delWorkExp(index)`函数.
- 因为 添加按钮只有一个,所以不需要写在`v-for`里面,写在div外面即可.
`<el-button type="primary" v-on:click="addWorkExp">添加</el-button>`
同样绑定点击事件`addWorkExp`,直接给`workExp`push数据即可.

#### 调整panels样式
> commit: [调整panels样式](https://github.com/FLYSASA/Vue-demo/commit/3ba5bb6495755472d39e605ea39a9407a2f1559a)

> 解析: 
- 当左右布局,父容器display: flex;左边宽度固定,右边宽度自动压缩. 可以设置右边元素flex:1,拉满整个剩余空间.
- 父容器高度固定,内部子元素如果想滚动,可以设置子元素高度 `height: 100%;` 最大高度为父容器的高度,设置`overflow: auto;`出现滚动条,在父容器高度内滚动.



> 知识点:
在原生js,html中: 给button绑定事件 `<button onclick="fn()">`  ,onclick需要等于一个函数调用.否则无法执行.
如例:
http://js.jirengu.com/qejusekoda/1/edit

在vue中,为了体现对新手的友好,不管用`v-on:click="fn"`还是`v-on:click="fn()"`都是可以的,vue会自动帮助调用.


#### 将panel组件化
> commit: [个人信息panel组件化](https://github.com/FLYSASA/Vue-demo/commit/8fbe52765f83aa4d9e449c08f82cf239f760975c)
> commit: [工作经历panel组件化](https://github.com/FLYSASA/Vue-demo/commit/a6bd60e633f907a1f347933bda2e9ff28ec652ce)
> commit: [学习经历panel组件化](https://github.com/FLYSASA/Vue-demo/commit/3fef3979f909aa275fe310e4bd0fc8abdbaeef8f)

> 组件化要点:
1. 新建组件`EditorProfile.vue`文件,首写字母大写.
2. 写上`<template>`标签,然后将需要组件化的div,剪切过来.
3. 写`<script>`标签,然后引入需要的变量:
```js
export default{
  props: ['profile']   //profile是需要的变量
} 
```
4. 在原组件中,引入该分离组件.
```html
<EditorProfile v-bind:profile="profile"></EditorProfile>
```
```js
import EditorProfile from './EditorProfile'
export default {
  components: { EditorProfile },       //组件标签注册
  data(){
    ...
  }
}
```

#### panel工作经历组件重构优化
> commit: [工作经历重构优化](https://github.com/FLYSASA/Vue-demo/commit/5f8011b7f8feee83a25fca951f44a89f05d7a337)

> 优化解析: 
总结: 如何构建页面? 实则从data里面拿数据items,然后发送给组件去部署.
```html
<!-- Editor.vue -->
 <EditorWork v-bind:items="workExp" v-bind:labels="{company:'公司',content:'工作内容'}"></EditorWork>  
 <!-- items和labels都是要传给组件的内容 -->
```




```html
<!-- EditorWork.vue 分组件修改-->
    <div v-for="(item,index) in items" class="ct">
      <el-form-item v-for="key in keys" v-bind:label="labels[key] || key">
        <el-input v-model="item[key]"></el-input>
      </el-form-item>
      ...
    </div>
```
```js
// EditorWork.vue 分组件js修改
export default {
  props: ['items','labels'],
  computed: {
    keys(){
      return Object.keys(this.items[0])
    }
  },
  methods: {
    addExp(){
      this.items.push({
        company: '',
        content: ''
      })
    },
    delExp(){
      this.items.splice(index,1)
    }
  }
}
```

#### 修改目的: 不写死页面构建内容,如label="公司"等等
重构步骤: 
1. 首先明确的是,构建工作经历页面,首先在data添加页面数据,如这里的: `workExp: [{company:'',content:''}],`
2. data构建好后,将`data workExp`发送给分组件, 在该组件中部署的分组件标签 
`<EditorWork v-bind:items="workExp"/>`发送data给分组件.  **通过v-bind发送数据变量**,同时还需要发送标题
`v-bind:labels="{company:'公司',content:'工作内容'}`

```html
<EditorWork v-bind:items="workExp" v-bind:labels="{company:'公司',content:'工作内容'}"></EditorWork>  
```

3. 分组件中接收发送的变量items和labels.
使用: 
```js
//EditorWork.vue
export default { 
  props: ['items','labels'],      //允许使用传过来的变量items和labels.
  computed: {           //computed用于计算返回结果给变量
    keys(){
      return Object.keys(this.items[0])             //这里借用Object的keys属性获取到数组items的第一个对象的key属性. (这里是company和content,因为其它对象都key一样所以获取到第一项[0]即可)
    }
  }
}
```
4. 将获取到的items和items数据中的keys对象(属性集合)部署到页面上
```html
<!-- EditorWork.vue -->
<div v-for="(item,index) in items">
  <el-form-item v-for="key in keys" v-bind:label="labels[key] || key">  <!-- 设置标题如:公司,通过遍历获取到的属性集合,这里是{company,content},首先是company,给label设置label="labels[company]即传过来的'公司',||key为保底值,如果没有传labels直接使用company-->
    <el-input v-model="item[key]"></el-input>
  </el-form-item>
</div>  
```

5. 完.


#### 重构总结:
- Vue以数据为中心,所以首先写上页面data数据.
- 将数据在引入的分组件标签中,通过 `v-bind:items="workExp"` 和 `v-bind:labels="{company: '公司',content:'工作内容'}"`将数据发送给分组件部署.
- 构建 
```js
export default {}
```
- 使用发送过来的items和labels. 需要通过props(**数组,里面是变量字符串**)引入这两个变量`props: ['items','labels']`
- 获取items中的属性. 引入之后使用 computed(**对象,里面是函数**)计算获取 items中对象的属性. 借用`Object.keys`方法获取
```js
computed: {
  keys(){
    return Object.keys(this.items[0])
  }
}
``` 
- 部署.
1. 首先遍历数组items.
2. 在label标签中遍历keys,通过v-bind绑定label
3. 通过v-model给 input绑定itemp[key]
```html
<div v-for="(item,index) in items">
    <el-form-item v-for="key in keys" v-bind:label="labels[key] || key">
      <el-input v-model="item[key]"></el-input>
    </el-form-item>
</div>  
```

#### addExp函数微调
> commit: [addExp](https://github.com/FLYSASA/Vue-demo/commit/4f65a736cfe27cb399f263a52cf777ddd314fb41)
> 注意`el-form-item v-for="key in keys" v-bind:label="labels[key] || key" v-bind:key="key">`中,
`v-bind:key="key"`不写的话,会警告,这里是引入计算属性数组中的key

#### 完善panel
> commit: [完善panel](https://github.com/FLYSASA/Vue-demo/commit/3f79f55b91549f41fff73201cf7738b0556ec345)

> 注意细节: 组件的title
如: `<EditorArray v-bind:items="awards" v-bind:labels="{name: '奖励详情'}" title="获奖情况"></EditorArray>`
或者 `v-bind:title="`获奖情况`"`   //使用v-bind引入即js引入,需要在双引号里使用单引号引入字符串.外面双引号是html的,里面的单引号代表js的字符串,如果是变量则不需要单引号.

在EditorArray.vue中,
```html
<template>
  <div>
    <h2>
      {{title}}
    </h2>
  </div>
</template>
export default {
  props: ['title']    //引入变量
}
```

### 构建preview页面

首先: 
将变量储存至App.vue,并传入Editor,Preview
#### 
> commit: [变量存储,传入Editor和Preview](https://github.com/FLYSASA/Vue-demo/commit/0f2bdcdd10857f9055d8701b7392cde0f99b76d4)

> commit: [不展示用户未填写项](https://github.com/FLYSASA/Vue-demo/commit/123162573b45af256beb72bcfc7815bbe087b0d4)

> commit: [展示preview](https://github.com/FLYSASA/Vue-demo/commit/d4ef91712671644b00de1459bbbbd93e6bbb8aaf)

> commit: [添加预览按钮展示](https://github.com/FLYSASA/Vue-demo/commit/28b2445eb5fecdaeaa80c760fc01cb606110bf55)

> commit: [取消预览](https://github.com/FLYSASA/Vue-demo/commit/7bbe5f0885244fd931ae5791599724afdc7e65af)

### 总结:
预览按钮绑定事件流程: 
1. 在Tobar.vue分组件里,绑定preview事件
```html 
<el-button v-on:click="preview"></el-button> 
```
2. 将绑定的事件传出到主组件
```js
export default {
  methods: {
    preview(){
      this.$emit('preview')  //将事件变量传出
    }
  }
}
```

3. 主组件接收事件变量
```html
<Topbar v-on:preview="preview"></Topbar>
```
4. 主组件定义preview事件
```js
export default {
  methods: {
    preview(){
      previewMode = true
    }
  }
}
```

### 归纳: 
data传递和事件传递的区别:
- data传递 使用v-bind
1. data数据最后写在主组件里面,这样分组件才能方便调用.如果定义在分组件内,其他分组件无法获取到.
2. data传递使用 `v-bind:变量名="传给到分组件的名字"`,哪个组件需要变量,就写在主组件内的分组件标签里面.
3. 分组件接收data数据,需要定义 `props(数组): ['变量名']`
4. 最后在需要的html标签内使用该变量: `v-bind:自定义变量名字="传入的变量"`或直接使用 {{变量名}}

- 分组件事件传递 使用v-on
1. 分组件中的某个按钮绑定事件 `v-on:click="事件名"`
2. 分组件定义这个事件并传出事件: 
```js
export default {
  methods: {
    事件名(){
      this.$emit('事件名')
    }
  }
}
```
3. 主组件获取到事件, 在对应的分组件标签内 `v-on:自定义事件名2="事件名"`   双引号里面是获取到的事件.

4. 主组件定义事件:
```js
methods: {
  事件名2(){
    触发的事件
  }
}
```


### 如何设计某个组件显示,其它组件隐藏?
步骤:
1. 在分组件中某个按钮绑定事件,触发隐藏
2. 将该事件发送给主组件,主组件接收事件并定义事件.
```js
methods: {
  事件(){
    变量 = true
  }
}
```
3. 在data中声明该变量
```js
export default {
  data(){
    return{
      this.变量: false     //默认为false,即不存在.不声明会defined报错
    }
  }
}
```
4. 给主组件的父容器绑定 `class为变量的属性`
```html
<!-- 变量为保尔值,'变量名是字符串' -->
<div id="app" v-bind:class="{'变量名' : 变量}">   
```

5. 当点击分组件的按钮时, #app拥有class="变量名".
然后设置css属性:
```css
.变量名 #topbar{
  display: none;
}
.变量名 #editor{
  display: none;
}
```

6. 完.

### 如何恢复隐藏组件的显示?
接上:
7. 在主组件中定义一个按钮,绑定 `v-on:click="exitPreview"`

8. 定义事件
```js
methods: {
  exitPreview(){
    this.变量: false     //#app  不存在class="变量"
  }
}
```

9. 这样父容器不存在该属性,因此该属性下的子属性也无效化,重新显示.


#### 修复bug
> commit: [修复删除最后的内容再添加bug,preview展示完善](https://github.com/FLYSASA/Vue-demo/commit/8534692a7cc973bb319399ff1ea9838d553d6f05)



## github上预览
1. 运行: 
`npm run build`

1. 在.gitignore里面删除`/dist/`

3. 上传至github

4. 如果链接无法预览,找到config/index.js中的 assetsPubulicPath 改为 assetPubulickPath: ''.即可

5. 重新`npm run build`