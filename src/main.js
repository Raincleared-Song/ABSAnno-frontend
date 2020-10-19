import Vue from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies'

import router from './router/router.js'
import Antd from 'ant-design-vue'// 引入Ant Design Vue组件
import 'ant-design-vue/dist/antd.css' // 引入Ant Design Vue样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(Antd) //挂载到vue中
Vue.config.productionTip = false
Vue.use(VueCookies)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
export default {

};