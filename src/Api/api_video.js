
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


// 获取视频视频播放地址
export const getVideoUrl = (id) => get('/video/url', { id })

// 获取相关视频
export const getRelatedAllvideo = (id) => get('/related/allvideo', { id })

