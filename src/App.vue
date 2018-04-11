<template>
  <div id="app">
    <Topbar class="topbar"></Topbar>
    <main>
      <Editor v-bind:resume="resume" class="editor"></Editor>  <!-- 给Editor发送data resume -->
      <Preview v-bind:resume="resume" class="preview"></Preview>   
    </main>

  </div>
</template>

<script>
import Topbar from "./components/Topbar"; //引入Topbar变量
import Editor from "./components/Editor";
import Preview from "./components/Preview";

export default {
  data(){
    return {
      resume: {
        profile: {
          name: '',
          city: '',
          birth: ''
        },
        workExp: [{company:'',content:''}],
        studyExp: [{school: '',duration: '',degree: ''}],
        projects: [{name:'',content:''}],
        awards: [{name:''}],
        contacts: {
          qq: '',
          email: '',
          phone: '',
        }
      }
    }
  },
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
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
}
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
    overflow: hidden;   //因为有圆角,不设置这个的话,会溢出四个角
  }
  > .preview {
    flex-grow: 1;
    margin: 16px 16px 16px 8px;
    background: white;
    box-shadow: 0 0 3px hsla(0, 0, 0, 0.5);
    border-radius: 3px;
    overflow: hidden;
  }
}
</style>


