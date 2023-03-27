import { get } from '@/request'

//获取音乐url
export const getSong = (id) => get('/song/url', { id })

// 获取音乐歌词
export const getlyric = (id) => get('/lyric', { id })

// 获取最近播放的歌曲
export const getRecentPlaySong = () => get('/record/recent/song', { limit: 100 })

// 喜欢音乐
export const setLike = (id,like) => get('/like', { id ,like})

// 获取每日推荐歌曲
export const getRecommendSongs = () => get('/recommend/songs')



