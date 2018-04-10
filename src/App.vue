<template>
  <div id="app">
    <Topbar class="topbar"></Topbar>
    <main>
      <Editor class="editor"></Editor>
      <Preview class="preview"></Preview>   
    </main>

  </div>
</template>

<script>
import Topbar from "./components/Topbar"; //引入Topbar变量
import Editor from "./components/Editor";
import Preview from "./components/Preview";

export default {
  name: "App",
  components: {
    //我的组件中出现的其它组件.也是ES6语法.
    Topbar,
    Editor,
    Preview
  }
};
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
  overflow: hidden;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
}
main {
  display: flex;
  flex-grow: 1;
  > .editor {
    width: 20em;
  }
  > .preview {
    flex-grow: 1;
  }
}
</style>


