import { get } from '@/request'

//获取音乐url
export const getSong = (id) => get('/song/url', { id })
// 获取音乐歌单评论
export const getPlayListCmd=(id,sortType,cursor,pageNo)=>get('/comment/new',{type:2,id,sortType,cursor,pageSize:20,pageNo,timestamp: Date.now()})
// 获取音乐歌词
export const getlyric=(id)=>get('/lyric',{id})


// 获取最近播放的歌曲
export const getRecentPlaySong=()=>get('/record/recent/song',{limit:100})