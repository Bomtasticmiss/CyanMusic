import { get } from '@/request'

// 热搜列表(详细)
export const getSearchHotDetail = () => get('/search/hot/detail')

// 热搜列表(简略)
export const getSearchHot = () => get('/search/hot')

