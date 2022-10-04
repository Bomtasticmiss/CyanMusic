import { get } from '@/request'

//获取首页精选歌单列表
export const getHomeMusicRmd = () => get('/top/playlist', { limit: 24 })
// 获取网页精选歌单详情
export const getRmdDetail = (id) => get('/playlist/detail', { id, timestamp: Date.now() })