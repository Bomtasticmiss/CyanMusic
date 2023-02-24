import { createRouter, createWebHashHistory } from 'vue-router'
import layout from "@/views/layout.vue"
const routes = [
  {
    path: '/',
    name: 'musicHome',
    redirect: '/homeRmd',
    component: layout,
    children: [
      {
        path: '/homeRmd',
        name: 'homeRmd',
        component: () => import('@/views/home/homeRmd.vue')
      },
      {
        path: '/playlistcardDetail/:id',
        name: 'playlistcardDetail',
        component: () => import('@/views/home/playlistcardDetail.vue')
      },
      {
        path: '/dailyRmd',
        name: 'dailyRmd',
        component: () => import('@/views/dailyRmd/dailyRmd.vue')
      },
      {
        path: '/recentPlay',
        name: 'recentPlay',
        component: () => import('@/views/recentPlay/recentPlay.vue')
      },
      {
        path: '/songList',
        name: 'songList',
        component: () => import('@/views/songList/songList.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'musicLogin',
    component: () => import('@/components/login/musicLogin.vue')
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
