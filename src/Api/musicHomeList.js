import { get } from '@/request'

//获取首页精选歌单列表
export const getHomeMusicRmd = () => get('/top/playlist', { limit: 24 })
// 获取网页精选歌单详情
export const getRmdDetail = (id) => get('/playlist/detail', { id, timestamp: Date.now() })
//获取音乐url
export const getSong = (id) => get('/song/url', { id })
// 获取音乐歌单评论
export const getPlayListCmd=(id,sortType,cursor,pageNo)=>get('/comment/new',{type:2,id,sortType,cursor,pageSize:20,pageNo,timestamp: Date.now()})
// 获取音乐歌词
export const getlyric=(id)=>get('/lyric',{id})