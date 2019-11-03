import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import axios from './util/http'
// 导入 字体图标的样式表
import './assets/fonts/iconfont.css'


Vue.use(ElementUI)  //挂载到vue实列上
Vue.config.productionTip = false  //是否生产环境
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
