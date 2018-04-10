// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'    //引入主组件

import 'normalize.css'
import './assets/reset.scss'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },  //完整写法: components: { "App" : App },ES6中如果key和value一样,可以缩写为一个
  template: '<App/>'   //HTML
})

//上面的意思是将#app元素替换成<App/>标签,这个标签具体内容在组件App.vue里
