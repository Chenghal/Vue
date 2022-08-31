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
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

import {
  Button, Form, FormItem, Input, Container, Header, Aside, Main, Menu, Breadcrumb,
  BreadcrumbItem, Row, Col, Table, TableColumn, Switch, Tooltip, Pagination, Dialog,
  MessageBox
} from 'element-ui'

Vue.use(ElementUI)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)

Vue.prototype.$confirm = MessageBox.confirm

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
