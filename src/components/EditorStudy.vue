<template>
  <div>
    <h2>工作经历</h2>
    <el-form>
      <div v-for="(study,index) in studyExp" class="ct">
        <el-form-item label="学校">
          <el-input v-model="study.school"></el-input>
        </el-form-item>
        <el-form-item label="学习时间">
          <el-input v-model="study.duration"></el-input>
        </el-form-item>
        <el-form-item label="学位">
          <el-input v-model="study.degree"></el-input>
        </el-form-item>
        <el-button class="delete-btn" type="primary" icon="el-icon-delete" v-on:click="delstudyExp(index)"></el-button>
        <hr> <!-- 分割线 -->
      </div>
      <el-button class="add-btn" type="primary" v-on:click="addStudyExp">添加</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['studyExp'],
  methods: {
      addStudyExp(){
          this.studyExp.push({
              school: '',
              duration: '',
              degree: ''
          })
      },
      delstudyExp(index){
          this.studyExp.splice(index,1)
      }
  }
}
</script>

