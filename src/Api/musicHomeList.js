import { get } from '@/request'

//获取首页精选歌单列表
export const getHomeMusicRmd = () => get('/top/playlist', { limit: 24 })
