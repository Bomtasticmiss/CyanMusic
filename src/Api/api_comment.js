import {get} from '@/request'

// 获取音乐歌单评论
export const getComment = (id, type,sortType, cursor, pageNo) => get('/comment/new', { type, id, sortType, cursor, pageSize: 20, pageNo, timestamp: Date.now() })

// 发送/删除评论
export const userComment = ({t, type,id, content , commentId} ) => get('/comment', { t, type,id, content , commentId, timestamp: Date.now() })


export const likeComment = ({id,cid,t, type} ) => get('/comment/like', {id,cid,t, type,timestamp: Date.now() })

export const commentFloor = ({parentCommentId,id, type,limit} ) => get('/comment/floor', {parentCommentId,id, type,limit })
