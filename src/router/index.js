import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'Login',
    component: ()=>import('../views/home/Login')
  },
  {
    path: '/adminMain',
    name: 'AdminMain',
    component:()=>import('../views/admin/AdminMain')
  }
]

const router = new VueRouter({
  routes
})

export default router
