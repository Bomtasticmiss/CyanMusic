
import layout from "@/views/layout.vue"


/*首页及其他页*/
const homePage = () => import('@/views/home/homePage.vue')

const homeRmd = () => import('@/views/home/homePage/homeRmd.vue')
const playList = () => import('@/views/home/homePage/playList.vue')
const songRank = () => import('@/views/home/homePage/songRank.vue')
const artistPage = () => import('@/views/home/homePage/artistPage.vue')
const newSongRmd = () => import('@/views/home/homePage/newSongRmd.vue')

/*搜索页*/
const search = () => import('@/views/search/searchHomePage.vue')

/*左侧菜单页*/
const playlistDetail = () => import('@/components/playList/playlistDetail.vue')
const dailyRmd = () => import('@/views/dailyRmd/dailyRmd.vue')
const recentPlay = () => import('@/views/recentPlay/recentPlay.vue')
const songList = () => import('@/views/songList/songList.vue')
const albumDetail = () => import('@/views/album/albumDetail.vue')

/*视频页*/
const videoHomePage = () => import('@/views/video/videoHomePage.vue')
const videoHome = () => import('@/views/video/videoPage/videoHome.vue')
const videoDetial = () => import('@/views/video/videoPage/videoDetial.vue')

const mvHome = () => import('@/views/video/mv/mvHome.vue')
const allMv = () => import('@/views/video/mv/allMv.vue')

/*FM页面*/
const fmPage = () => import('@/views/FM/fmPage.vue')
/*登录*/
const musicLogin = () => import('@/views/login/musicLogin.vue')

// 用户页面
const userDetail = () => import('@/views/user/userDetail.vue')

// 歌手详情页
const artistDetail = () => import('@/views/artist/artistDetail.vue')

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
                    component: artistPage,
                    meta: { title: '歌手' }
                },
                {
                    path: '/newSongRmd',
                    component: newSongRmd,
                    meta: { title: '新歌速递' }
                }]
            },
            {
                path: '/playlistDetail/:id',
                name: 'playlistDetail',
                component: playlistDetail,
                meta: { title: '歌单详情页' }
            },
            { path: '/albumDetail/:id', name: 'albumDetail', component: albumDetail, meta: { title: '专辑详情页' } },
            { path: '/dailyRmd', name: 'dailyRmd', component: dailyRmd, meta: { isCheck: true, title: '每日推荐' } },
            {
                path: '/recentPlay',
                name: 'recentPlay',
                component: recentPlay,
                meta: { isCheck: false, title: '最近播放' }

            },
            {
                path: '/songList',
                name: 'songList',
                component: songList
            },
            {
                path: '/userDetail/:id',
                name: 'userDetail',
                component: userDetail,
                meta: { isCheck: true, title: '用户详情页' }
            },
            {
                path: '/videoHomePage',
                name: 'videoHomePage',
                component: videoHomePage,
                redirect: '/videoHome',
                meta: { isCheck: true,title: '视频' },
                children: [
                    {
                        path: '/videoHome',
                        name: 'videoHome',
                        component: videoHome,
                        meta: { isCheck: true,title: '视频主页' },
                    },
                    {
                        path: '/mvHome',
                        name: 'mvHome',
                        component: mvHome,
                        meta: {isCheck: true, title: 'MV' }
                    }
                ]
            },
            {
                path: '/fmPage',
                name: 'fmPage',
                component: fmPage,
                meta: { isCheck: true,title: 'FM' },
            },
            {
                path: '/allMv',
                name: 'allMv',
                component: allMv,
                meta: { isCheck: true,title: '全部MV' },
            },
            {
                path: '/videoDetial/:id/:type',
                name: 'videoDetial',
                component: videoDetial,
                meta: { isCheck: true,title: '视频内容页' },
            },
            {
                path: '/search/:keywords',
                name: 'search',
                component: search,
                meta: { title: '搜索内容页' },
            },
            {
                path: '/artistDetail/:id',
                name: 'artistDetail',
                component: artistDetail,
                meta: { title: '歌手详情页' },
            }
        ]
    },
    {
        path: '/login',
        name: 'musicLogin',
        component: musicLogin
    },

]

export default routes