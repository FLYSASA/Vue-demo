<template>
  <div id="preview">
      <h1>{{resume.profile.name || '请填写姓名'}}</h1>
      <p>{{resume.profile.city || '请填写城市' }} | {{resume.profile.birth || '请填写出生年月'}}</p>
      <hr>
      <section v-if="filter(resume.projects).length > 0">
        <h2>项目经历</h2>
        <ul>
          <li v-for="project in filter(resume.projects)">
            {{project.name}}
            {{project.content}}
          </li>
        </ul>
      </section>
      <section v-if="filter(resume.workExp).length > 0">
        <h2>工作经历</h2>
        <ul>
          <li v-for="work in filter(resume.workExp)">
            {{work.company}}
            {{work.content}}
          </li>
        </ul>
      </section>
      <section v-if="filter(resume.studyExp).length > 0">
        <h2>学习经历</h2>
        <ul>
          <li v-for="study in filter(resume.studyExp)">
            {{study.school}}
            {{study.duration}}
            {{study.degree}}
          </li>
        </ul>
      </section>
      <section v-if="filter(resume.awards).length > 0">
        <h2>获奖情况</h2>
        <ul>
          <li v-for="award in filter(resume.awards)">
            {{award.name}}
          </li>
        </ul>
      </section>
      <section>
        <h2>个人信息</h2>
        <ul>
          <li>
            {{resume.contacts.qq || '请填写qq' }}  
            {{resume.contacts.email || '请填写邮箱' }}
            {{resume.contacts.phone || '请填写手机'}}
          </li>
        </ul>
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