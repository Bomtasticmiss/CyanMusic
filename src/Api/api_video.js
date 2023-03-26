
import { get } from '@/request'

// 获取视频分类列表
export const getVideoCategoryList = () => get('/video/category/list')

// 获取视频标签列表
export const getVideoGroupList = () => get('/video/group/list')

//获取全部视频列表 
export const getAllVideo = (offset) => get('/video/timeline/all', { offset })

// 传入标签/分类id,获取到相关的视频
export const getVideoGroupById = ({ id, offset }) => get('/video/group', { id, offset })

// 获取视频详情
export const getVideoDetail = (id) => get('/video/detail', { id })

// 获取相关视频
export const getRelatedAllvideo = (id) => get('/related/allvideo', { id })


// 获取最新 mv
export const getMvFirst = (limit = 8) => get('/mv/first', { limit })

// 获取推荐mv
export const getPersonalizedMv = (limit = 8) => get('/personalized/mv', { limit })

// 获取网易出品 mv
export const getMvRcmd = (limit = 8) => get('/mv/exclusive/rcmd', { limit })

// 获取全部 mv
export const getMvAll = ({ area, type, order, offset, limit = 8 }) => get('/mv/all', { area, type, order, offset, limit })

// 获取 mv 数据
export const getMvDetail = (mvid) => get('/mv/detail', { mvid })


// 获取 mv/视频 数据
export const getAllDetail = (type,id) => {
    if(type=='video'){
        return get('/video/detail', { id })
    }
    if(type=='mv'){
        return get('/mv/detail', { mvid:id })
    }
}

// 获取视频(MV)点赞转发评论数数据
export const getAllDetailInfo = (type,id) => {
    if(type=='video'){
        return get('/video/detail/info', { vid:id })
    }
    if(type=='mv'){
        return get('/mv/detail/info', { mvid:id })
    }
}

// 获取视频(MV)播放地址
export const getAllDetailUrl = (type,id) => {
    if(type=='video'){
        return get('/video/url', { id })
    }
    if(type=='mv'){
        return get('/mv/url', { id })
    }
}