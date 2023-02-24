import {get} from '@/request'


// 查询登录状态
export const getLoginStatus=()=>get('/login/status')
// 获取用户信息 , 歌单，收藏，mv, dj 数量
export const getsubcount=()=>get('/user/subcount',{timerstamp:Date.now()})
// 获取账号信息
export const getAcount=()=>get('/user/account',{timerstamp:Date.now()})
/* 获取用户详情 */
export const getUserDetail = (uid) => get('/user/detail', { uid, timestamp: Date.now() })
