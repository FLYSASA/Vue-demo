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
      <!-- 个人信息panel EditorProfile组件 -->
      <li v-bind:class="{active:currentTab === 0}">
          <EditorProfile v-bind:profile="profile"></EditorProfile>   <!-- 使用v-bind绑定变量data中的profile -->
       </li>
      <!-- 工作经历panel EditorWork组件 -->
       <li v-bind:class="{active:currentTab === 1}">
         <EditorWork v-bind:workExp="workExp"></EditorWork>
       </li>
      <!-- 学习经历panel EditorStudy组件 -->
       <li v-bind:class="{active:currentTab === 2}">
         <EditorStudy v-bind:items="studyExp"></EditorStudy>
       </li>
    </ol>
  </div>
</template>



<script>
  import EditorProfile from './EditorProfile'
  import EditorWork from './EditorWork'
  import EditorStudy from './EditorStudy'
  export default {
    components: { EditorProfile,EditorWork,EditorStudy },    //注册标签
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
        workExp: [{company:'',content:''}],
        studyExp: [{school: '',duration: '',degree: ''}]
      }
    },
    methods: {

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
    .ct{
      position: relative;
      .delete-btn{
        border: none;
        background: rgb(247, 102, 102);
        padding: 5px 10px;
        position: absolute;
        right: 0;
        top: 0;
      }
    }
    >li{                    /* 注意这里的li每次点击只显示一个 */
      position: relative;
      padding: 32px;
      display: none;
      height: 100%;         /* 滚动高度和父亲一样高,overflow: auto;需要设置滚动的高度,这里是height: 100%;即在父容器高度范围类滚动 */
      overflow: auto;
      &.active{
          display: block;
      }
      .add-btn{
        padding: 10px 15px;
        margin-top: 10px;
        position: absolute;
        right: 32px;
      }
    }      
  }
}
</style>



