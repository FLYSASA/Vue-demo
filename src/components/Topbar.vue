<template>
  <div id="topbar">
    <div class="logo">Preview</div>
    <div class="actions">
      <el-button type="primary">注册</el-button>
      <el-button>登录</el-button>
      <el-button v-on:click="preview">预览</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      preview(){
        this.$emit('preview')   //传出事件
      }
    }
  }
</script>

<style lang="scss">
#topbar {
  display: flex;
  justify-content: space-between;
  padding: 16px; //约定所有单位为8的倍数
  font-size: 20px;  
  align-items: center;     //对齐logo和按钮
}
</style>
