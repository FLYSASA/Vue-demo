<template>
  <div id="editor">
    <nav>
      <ol>
        <li v-for="i in [0,1,2,3,4,5]" v-bind:class="{active: currentTab === i}" v-on:click="currentTab = i">
          <svg class="icon">
            <!-- `#icon-${icons[i]}`是ES6语法, ``里面代表要插入的字符串,里面包裹的${}是占位符 -->
            <!-- ${}可以是任意的 js 表达式（函数或者运算），甚至是另一个模板字符串，会将其计算的结果作为字符串输出。如果模板中需要使用$,{等字符串，则需要进行转义。 -->
            <use v-bind:xlink:href="`#icon-${icons[i]}`"></use>
            <!-- 外面的双引号是html的, 里面的``反撇号是js的(有短横线要用引号包裹)-->
          </svg>
        </li>
      </ol>
    </nav>
    <ol class="panels">
      <li v-bind:class="{active:currentTab === 0}">
        <h2>个人信息</h2>
        <el-form>
          <el-form-item label="姓名">
            <el-input v-model="profile.name"></el-input>
          </el-form-item>
          <el-form-item label="城市">
            <el-input v-model="profile.city"></el-input>
          </el-form-item>
          <el-form-item label="出生年月">
            <el-input v-model="profile.birth"></el-input>
          </el-form-item>
        </el-form>
       </li>
       <li v-bind:class="{active:currentTab === 1}">
         <h2>工作经历</h2>
         <el-form>
           <div v-for="(work,index) in workExp">
             <el-form-item label="公司">
               <el-input v-model="work.company"></el-input>
             </el-form-item>
             <el-form-item label="工作内容">
               <el-input v-model="work.content"></el-input>
             </el-form-item>
             <el-button type="primary" icon="el-icon-delete" v-on:click="delWorkExp(index)"></el-button>            
             <hr>    <!-- 分割线 -->
           </div>
           <el-button type="primary" v-on:click="addWorkExp">添加</el-button>
         </el-form>
       </li>
    </ol>
  </div>
</template>



<script>
  export default {
    data() {
      //data必须是个函数,返回对象
      return {
        currentTab: 0,
        icons: ['2shenfenzhenghaoma', 'gongwenbao', 'book', 'heart', 'iconjiangbei', 'cc-phone-handset'],
        profile: {
          name: '',
          city: '',
          birth: ''
        },
        workExp: [{company:'',content:''}]
      }
    },
    methods: {
      addWorkExp(){
        this.workExp.push({company:'',content:''})
      },
      delWorkExp(index){
        this.workExp.splice(index,1)
      }
    }

  }

</script>


<style lang="scss">
#editor {
  display: flex;
  nav {
    background: #000;
    width: 80px;
    > ol > li {
      padding: 16px 0;
      text-align: center;
      > .icon {
        fill: #fff;
        width: 36px;
        height: 36px;
      }
      &.active {
        background: #fff;
        .icon {
          fill: #000;
        }
      }
    }
  }
  .panels{
    flex: 1;                  /* 因为父容器是flex,子元素panels默认会缩,设置flex: 1;即可占满剩余空间. 滚动条居最右边 */
      >li{                    /* 注意这里的li每次点击只显示一个 */
        padding: 32px;
        display: none;
        height: 100%;         /* 滚动高度和父亲一样高,overflow: auto;需要设置滚动的高度,这里是height: 100%;即在父容器高度范围类滚动 */
        overflow: auto;
        &.active{
            display: block;
        }
      }      
  }
}
</style>



