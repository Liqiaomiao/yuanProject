// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import filters from './libs/filters.js'



const requireComponent = require.context(
  './common',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /[\w-]+\.vue$/
)
console.log(requireComponent.keys());

requireComponent.keys().forEach(filename => {
  const componentConfig = requireComponent(filename)
  Vue.component( `yuan-${filename.replace(/^\.\/(.*)\.\w+$/, '$1')}`,  componentConfig.default || componentConfig)
})
Object.keys(filters).forEach(key=>{
  Vue.filter(key,filters[key])
});
Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
