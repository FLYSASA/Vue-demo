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
  components: {    //我的组件中出现的其它组件.也是ES6语法.
    Topbar,Editor,Preview
  }
}
</script>

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


