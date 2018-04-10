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


<style lang="scss">
#topbar {
  display: flex;
  justify-content: space-between;
  padding: 16px; //约定所有单位为8的倍数
}
</style>
