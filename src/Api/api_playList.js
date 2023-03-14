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

// 新歌速递
export const getTopSong = (type) => get('/top/song', { type })


// 调用此接口 , 可获取新碟上架列表
export const getTopAlbum = ({area, type}) => get('/top/album', { area, type })

// 登录后调用此接口 ,可获取全部新碟
export const getTopAlbumNew = ({area, type}) => get('/album/new',{area,type})

// 收藏歌单,t:类型,1:收藏,2:取消收藏
export const setUserSubscribe = ({t,id}) => get('/playlist/subscribe', {t,id,timestamp: Date.now() })







