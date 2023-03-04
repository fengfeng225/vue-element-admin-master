import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import * as directives from '@/directives/index.js' // 导出全部自定义指令
import * as filters from '@/filters'
import components from '@/components/'
import checkPermission from '@/mixin/checkPermission'

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
}) // 注册全局自定义指令

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
}) // 注册全局过滤器

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.use(components) // 注册所有的全局组件

Vue.mixin(checkPermission) // 全局混入

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
