import { get } from '@/request'

// 获取热门歌手
export const getTopArtists = ({ limit, offset, type, area, initial }) => get('/artist/list', { limit, offset, type, area, initial})

// 获取歌手详情
export const getArtistDetail=(id)=>get('/artist/detail',{id}) 

// 获取歌手描述
export const getArtistDesc=(id)=>get('/artist/desc',{id}) 

// 获取歌手MV
export const getArtistMv=(id)=>get('/artist/mv',{id}) 

// 获取相似歌手
export const getSimiArtist=(id)=>get('/simi/artist',{id}) 

//login 收藏的歌手 
export const getSubArtists = () => get('/artist/sublist', { timestamp: Date.now() })

// login 收藏歌手 t=1 收藏 
export const subArtist = (id, t) => get('/artist/sub', { id, t, timestamp: Date.now() })

// 歌手热门 50 首歌曲
export const getTopSong = (id) => get('/artist/top/song', { id, timestamp: Date.now() })

