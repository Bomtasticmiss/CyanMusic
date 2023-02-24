import {get} from '@/request'



// 获取最近播放的歌曲
export const getRecentPlaySong=()=>get('/record/recent/song',{limit:100})