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
//导入日期处理函数
import moment from 'moment'

Vue.use(ElementUI)  //挂载到vue实列上
Vue.config.productionTip = false  //是否生产环境
Vue.prototype.$http = axios
Vue.filter('filterDate',(v)=>{
  return moment(v).format('YYYY-MM-DD')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
