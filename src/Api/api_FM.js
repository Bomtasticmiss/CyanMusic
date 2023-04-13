import {get} from '@/request'

// 私人FM(需要登录)
export const getPersonal_fm = () => get('/personal_fm')

// 垃圾桶
export const rubbish  = (id) => get('/fm_trash',{id})

