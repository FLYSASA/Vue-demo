<template>
  <div id="preview">
      <h1>{{resume.profile.name || '请填写姓名'}}</h1>
      <p>{{resume.profile.city || '请填写城市' }} | {{resume.profile.birth || '请填写出生年月'}}</p>
      <hr>
      <section v-if="filter(resume.projects).length > 0">
        {{filter(resume.projects)}}
      </section>
  </div>
</template>

<script>
export default {
  props: ['resume'],
  methods: {
    //剔除数组中的空对象,用户未填的项
    filter(array){
      return array.filter(item => !this.isEmpty(item))   //如果传入的item(array的某一项)是false,即为空,剔除掉,返回新的数组.isEmpty要加this
    },
    isEmpty(object){
      let empty = true
      for(let key in object){
        if(object[key]){      //如果数组某一个对象,存在key对应的value值,不为空和undefined,则这一个对象不为空,跳出
          empty = false
          break 
        }
      }
    }
  }
}
</script>

<style>
 #preview{

 }
</style>