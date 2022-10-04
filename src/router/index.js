import { createRouter, createWebHashHistory } from 'vue-router'
import musicHome from '@/views/musicHome.vue'
const routes = [
  {
    path: '/',
    redirect: '/home',
    // children: [
    //   {
    //     path: 'home',
    //     component: musicHome,
    //     children: [
    //       {
    //         path: '/musicRmd',
    //         name: 'musicRmd',
    //         component: () => import('@/components/home/MusicRmd.vue')
    //       }
    //     ]
    //   }
    // ]
  },
  {
    path: '/home',
    name: 'musicHome',
    component: musicHome,
    children: [
      {
        path: '/musicRmd',
        name: 'musicRmd',
        component: () => import('@/components/home/musicRmd.vue')
      },
      {
        path: '/musicRmdDetail/:id',
        name: 'musicRmdDetail',
        component: () => import('@/components/home/musicRmdDetail.vue')
      }
    ]
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
