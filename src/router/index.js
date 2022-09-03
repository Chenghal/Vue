import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/components/Login.vue"
import Home from '@/components/Home.vue'
import WeleCome from '@/views/weleCome.vue'
import Users from '@/views/user/users.vue'
import Rights from '@/views/power/rights.vue'
import Roles from '@/views/power/roles.vue'
import Cate from '@/views/goods/Cate.vue'
import Pamars from '@/views/goods/Pamars.vue'
import Lists from '@/views/goods/List.vue'
import Add from '@/views/goods/goodsAdd.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home', component: Home,
    redirect: '/welecom',
    children: [{ path: '/welecom', component: WeleCome },
    { path: '/users', component: Users },
    { path: '/rights', component: Rights },
    { path: '/roles', component: Roles },
    { path: '/categories', component: Cate },
    { path: '/params', component: Pamars },
    { path: '/goods', component: Lists },
    { path: '/goods/add', component: Add }
    ]
  }
]

const router = new VueRouter({
  routes
})
//拦截器
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
