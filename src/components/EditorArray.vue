<template>
  <div>
    <h2>{{title}}</h2>
    <el-form>
      <div v-for="(item,index) in items" class="ct">
        <el-form-item v-for="key in keys" v-bind:label="labels[key] || key" v-bind:key="key">
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
    props: ['items','labels','title'],
    computed: {              //即返回计算的结果并赋给变量
        keys(){
            return Object.keys(this.items[0])  //取数组第一个对象的key,因为数组中的每个对象的key是一样的,取第一个即可
        }
    },
    methods: {
      addExp() {
        const empty = {} 
        this.keys.map((key)=>{   //map遍历keys(计算属性返回数组)数组,将获取到的key与空对象的[key]绑定,并赋值value空字符串
            empty[key] = ''
        }),
        this.items.push(empty)
      },
      delExp(index) {
        this.items.splice(index, 1)
      }
    }
  }

</script>

