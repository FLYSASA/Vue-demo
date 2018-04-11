<template>
  <div>
    <h2>学习经历</h2>
    <el-form>
      <div v-for="(item,index) in items" class="ct">
        <el-form-item v-for="key in keys" v-bind:label="labels[key] || key">
          <el-input v-model="item[key]"></el-input>
        </el-form-item>
        <el-button class="delete-btn" type="primary" icon="el-icon-delete" v-on:click="delExp(index)"></el-button>
        <hr> <!-- 分割线 -->
      </div>
      <el-button class="add-btn" type="primary" v-on:click="addExp">添加</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  computed: {
      keys(){
          return Object.keys(this.items[0])
      }
  },
  props: ['items','labels'],
  methods: {
      addExp(){
          this.items.push({
              school: '',
              duration: '',
              degree: ''
          })
      },
      delExp(index){
          this.items.splice(index,1)
      }
  }
}
</script>

