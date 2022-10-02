import { createRouter, createWebHashHistory } from 'vue-router'
import musicHome from '@/views/musicHome.vue'
const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'musicHome',
    component: musicHome
  },
  {
    path: '/login',
    name: 'musicLogin',
    component: () => import('@/views/musicLogin.vue')
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
