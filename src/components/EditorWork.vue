<template>
  <div>
    <h2>工作经历</h2>
    <el-form>
      <div v-for="(work,index) in workExp" class="ct">
        <el-form-item label="公司">
          <el-input v-model="work.company"></el-input>
        </el-form-item>
        <el-form-item label="工作内容">
          <el-input v-model="work.content"></el-input>
        </el-form-item>
        <el-button class="delete-btn" type="primary" icon="el-icon-delete" v-on:click="delWorkExp(index)"></el-button>
        <hr> <!-- 分割线 -->
      </div>
      <el-button class="add-btn" type="primary" v-on:click="addWorkExp">添加</el-button>
    </el-form>
  </div>
</template>


<script>
  export default {
    props: ['workExp'],
    methods: {
      addWorkExp() {
        this.workExp.push({
          company: '',
          content: ''
        })
      },
      delWorkExp(index) {
        this.workExp.splice(index, 1)
      }
    }
  }

</script>

