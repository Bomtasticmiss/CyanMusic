import { get } from '@/request'

//获取首页精选歌单列表
export const getHomeMusicRmd = () => get('/top/playlist', { limit: 28 })
// 获取歌单详情
export const getPlaylistDetail = ({id,s}) => get('/playlist/detail', { id,s, timestamp: Date.now() })

// 获取歌单分类
export const getCatlist =()=>get('/playlist/catlist')

// 获取精品歌单标签列表
export const getHighqualityTags=()=>get('/playlist/highquality/tags')

// 获取精品歌单
export const getHighquality=()=>get('/top/playlist/highquality')

// 获取热门歌单分类
export const getHotTags=()=>get('/playlist/hot')

// 根据分类获取歌单
export const getPlayListByCatlist=({order,cat,limit,offset})=>get('/top/playlist',{order,cat,limit,offset})

//获取所有榜单数据
export const getToplist=()=>get('/toplist')





