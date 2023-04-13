
import { getAcount, getUserPlaylist, getUserLikelist } from '@/Api/api_user'
import { setLike } from '@/Api/api_song'
import { setSubscribe } from '@/Api/api_playList'
export default {
    async GetAcount({ commit, dispatch }) {
        const res = await getAcount()
        if (res.code !== 200) return
        if (res.profile) {
            commit('setProfile', res.profile)
            commit('setAccount', res.account)
            commit('setIsLogin', true)
            dispatch('getLikeList')
            dispatch('GetUserPlaylist')

        }
    },
    // 获取用户歌单
    async GetUserPlaylist({ commit, state }) {
        // if(!uid.value)return console.log('uid不存在')
        const res = await getUserPlaylist(state.account.id)
        if (res.code !== 200) return
        console.log(res)
        commit('setUserPlaylist', res.playlist)
    },
    //  获取用户喜欢的音乐列表 
    async getLikeList({ commit, state }) {
        console.log(111111111111)
        const res = await getUserLikelist(state.account.id)
        if (res.code !== 200) return
        console.log(res)
        if (res.ids instanceof Array) {
            commit('setLikeIdList', {
                type: 'get',
                data: res.ids
            })
        }
    },
    // 用户(喜欢，取消)歌曲
    async SetLike({ commit }, list) {
        if (list.type == 'unshift') {
            const res= await setLike(list.id, true)
            console.log(res,'unshift')
            if(!res)return 
            commit('setLikeIdList', list)
        }
        if (list.type == 'delete') {
            const res= await  setLike(list.id, false)
            console.log(res,'delete')
            commit('setLikeIdList', list)
        }

    },
}