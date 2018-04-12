<template>
  <div id="app" v-bind:class="{previewMode:previewMode}">   <!-- 如果previewMode为true,则由class="previewMode" -->
    <Topbar class="topbar" v-on:preview="preview"></Topbar>   <!-- v-on监听preview传过来的事件 -->
    <main>
      <Editor v-bind:resume="resume" class="editor"></Editor>  <!-- 给Editor发送data resume -->
      <Preview v-bind:resume="resume" class="preview"></Preview>   
    </main>
    <el-button id="exitpreview" v-on:click="exitPreview">退出预览</el-button>
  </div>
</template>

<script>
import Topbar from "./components/Topbar"; //引入Topbar变量
import Editor from "./components/Editor";
import Preview from "./components/Preview";

export default {
  methods: {
    preview(){
     this.previewMode = true
    },
    exitPreview(){
      this.previewMode = false
    }
  },
  data(){
    return {
      previewMode: false,    //用到的变量一定要在data里写一遍,否则无定义
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
.previewMode > #topbar{   //当有previewMode属性,隐藏.不能用.topbar,优先级太低
  display: none;
}
.previewMode #editor{
  display: none;
}
.previewMode #preview{
  max-width: 600px;   //这里需要用max-width最大宽度,否则上面的flex-grow: 1;会自动拉伸.
  margin: 32px auto;
}
#exitpreview{
  display: none;
}
.previewMode #exitpreview{
  display: inline-block;   //不设置这个会无法定位
  position: fixed;
  right: 16px;
  bottom: 16px;
}
</style>


