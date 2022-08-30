import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import './assets/css/fonts/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import axios from 'axios'
// 配置请求的跟路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios

import { Button, Form, FormItem, Input } from 'element-ui'

Vue.use(ElementUI)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
