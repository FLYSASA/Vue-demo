<template>
  <div id="editor">
    <nav>
      <ol>
        <li v-for="i in [0,1,2,3,4,5]" 
        v-bind:class="{active: currentTab === i}"
        v-on:click="currentTab = i">
            <svg class="icon">
                <!-- `#icon-${icons[i]}`是ES6语法, ``里面代表要插入的字符串,里面包裹的${}是占位符 -->
                <!-- ${}可以是任意的 js 表达式（函数或者运算），甚至是另一个模板字符串，会将其计算的结果作为字符串输出。如果模板中需要使用$,{等字符串，则需要进行转义。 -->
               <use v-bind:xlink:href="`#icon-${icons[i]}`"></use>  <!-- 外面的双引号是html的, 里面的``反撇号是js的(有短横线要用引号包裹)-->
            </svg>
        </li>     
      </ol>
    </nav>
    <ol class="panels">
        <li v-for="i in [0,1,2,3,4,5]" v-bind:class="{active:currentTab === i}">
            {{tabs[i]}}
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
      icons: ['2shenfenzhenghaoma','gongwenbao','book','heart','iconjiangbei','cc-phone-handset'],
      tabs: ['tab1','tab2','tab3','tab4','tab5','tab6']
    };
  }
};
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
      >li{
        display: none;
        &.active{
            display: block;
        }
      }      
  }
}
</style>



