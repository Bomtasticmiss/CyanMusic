import {get} from '@/request'

// 获取音乐歌单评论
export const getComment = (id, type,sortType, cursor, pageNo) => get('/comment/new', { type, id, sortType, cursor, pageSize: 20, pageNo, timestamp: Date.now() })


