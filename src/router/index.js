import { createRouter, createWebHashHistory } from 'vue-router'
import layout from "@/views/layout.vue"


/*首页及其他页*/
const homePage = () => import('@/views/home/homePage.vue')

const homeRmd = () => import('@/views/home/homePage/homeRmd.vue')
const playList = () => import('@/views/home/homePage/playList.vue')
const songRank = () => import('@/views/home/homePage/songRank.vue')
const singers = () => import('@/views/home/homePage/singers.vue')
const newSongRmd = () => import('@/views/home/homePage/newSongRmd.vue')

/*左侧菜单页*/
const playlistcardDetail = () => import('@/components/playList/playlistcardDetail.vue')
const dailyRmd = () => import('@/views/dailyRmd/dailyRmd.vue')
const recentPlay = () => import('@/views/recentPlay/recentPlay.vue')
const songList = () => import('@/views/songList/songList.vue')


/*登录*/
const musicLogin = () => import('@/components/login/musicLogin.vue')


const routes = [
  {
    path: '/',
    name: 'musicHome',
    redirect: '/homeRmd',
    component: layout,
    children: [
      {
        path: '/homePage',
        name: 'homePage',
        redirect: '/homeRmd',
        component: homePage,
        meta: { title: '首页' },
        children: [{
          path: '/homeRmd',
          component: homeRmd,
          meta: { title: '个性推荐' }
        },
        {
          path: '/playList',
          component: playList,
          meta: { title: '分类歌单' }
        },
        {
          path: '/songRank',
          component: songRank,
          meta: { title: '排行榜' }
        },
        {
          path: '/singers',
          component: singers,
          meta: { title: '歌手' }
        },
        {
          path: '/newSongRmd',
          component: newSongRmd,
          meta: { title: '新歌速递' }
        }]
      },
      {
        path: '/playlistcardDetail/:id',
        name: 'playlistcardDetail',
        component: playlistcardDetail
      },
      {
        path: '/dailyRmd',
        name: 'dailyRmd',
        component: dailyRmd
      },
      {
        path: '/recentPlay',
        name: 'recentPlay',
        component: recentPlay
      },
      {
        path: '/songList',
        name: 'songList',
        component: songList
      }
    ]
  },
  {
    path: '/login',
    name: 'musicLogin',
    component: musicLogin
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
