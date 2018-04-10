<template>
  <div id="editor">
    <nav>
      <ol>
        <li v-bind:class="{active:currentTab === 0}" v-on:click="currentTab = 0">
          <svg class="icon">
            <use xlink:href="#icon-2shenfenzhenghaoma"></use>
          </svg>
        </li>
        <li v-bind:class="{active:currentTab === 1}" v-on:click="currentTab = 1">
          <svg class="icon">
            <use xlink:href="#icon-gongwenbao"></use>
          </svg>
        </li>
        <li v-bind:class="{active:currentTab === 2}" v-on:click="currentTab = 2">
          <svg class="icon">
            <use xlink:href="#icon-book"></use>
          </svg>
        </li>
        <li v-bind:class="{active:currentTab === 3}" v-on:click="currentTab = 3">
          <svg class="icon">
            <use xlink:href="#icon-heart"></use>
          </svg>
        </li>
        <li v-bind:class="{active:currentTab === 4}" v-on:click="currentTab = 4">
          <svg class="icon">
            <use xlink:href="#icon-iconjiangbei"></use>
          </svg>
        </li>
        <li v-bind:class="{active:currentTab === 5}" v-on:click="currentTab = 5">
          <svg class="icon">
            <use xlink:href="#icon-cc-phone-handset"></use>
          </svg>
        </li>
      </ol>
    </nav>
    <ol class="panels">
        <li v-bind:class="{active:currentTab === 0}">tab1</li>
        <li v-bind:class="{active:currentTab === 1}">tab2</li>
        <li v-bind:class="{active:currentTab === 2}">tab3</li>
        <li v-bind:class="{active:currentTab === 3}">tab4</li>
        <li v-bind:class="{active:currentTab === 4}">tab5</li>
        <li v-bind:class="{active:currentTab === 5}">tab6</li>
    </ol>
 </div>
</template>


<script>
export default {
  data() {
    //data必须是个函数,返回对象
    return {
      currentTab: 0
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



