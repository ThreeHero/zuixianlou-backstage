import Vue from 'vue'
import VueRouter from 'vue-router'
import employee from '@/views/employee'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/employee',
    name: 'employee',
    component: employee
  },
  {
    path: '/employee',
    name: 'employee',
    component: employee
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '@/views/login')
  },
  {
    path: '/404',
    name: '/404'
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  routes
})

export default router
