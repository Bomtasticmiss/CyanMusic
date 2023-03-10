
import { getAcount } from '@/Api/api_user'



export default  {
    async GetAcount({commit}) {
        const res = await getAcount()
        if (res.code !== 200) return
        if (res.profile) {
            commit('setProfile', res.profile)
            commit('setAccount', res.account)
            commit('setIsLogin', true)
        }
    }
}