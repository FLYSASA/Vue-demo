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