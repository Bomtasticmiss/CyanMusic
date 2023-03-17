import { get } from '@/request'

// 获取热门歌手
export const getTopArtists = ({ limit, offset, type, area, initial }) => get('/artist/list', { limit, offset, type, area, initial})


