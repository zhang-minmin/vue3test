import { createRouter, createWebHashHistory } from 'vue-router'

const home = () => import('../views/home.vue') //懒加载
const login = () => import('../views/login.vue')
const register = () => import('../views/register.vue')

const routes = [
  {
    path: '/',
    redirect: '/login' //重定向
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/home',
    name: 'home',
    component: home
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
