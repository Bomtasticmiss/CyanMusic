import { get } from '@/request'

// 热搜列表(详细)
export const getSearchHotDetail = () => get('/search/hot/detail')

// 热搜列表(简略)
export const getSearchHot = () => get('/search/hot')


export const getSearchDefault = () => get('/search/default')

// 搜索
export const search = ({ keywords,limit, offset, type }) => get('/cloudsearch',{keywords,limit, offset, type})

