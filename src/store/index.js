import { createStore } from 'vuex'
import actions from './actions'
import mutations from './mutations'

const state = {
  //播放列表
  playlists: [],
  // 正在播放的音乐的索引
  playingSongIndex: null,
  // 正在播放的音乐的Id
  currentSongId: 0,
  // 播放音乐的URL
  playSongUrl: '',
  // 正在播放的音乐总时长
  // playDurationTime: 0,
  // SingersFormate: ''
  // 暂停状态(false暂停||true播放)
  paused: false,
  // 歌词页面
  isShowLyricPage: false,
  // 登录态
  isLogin: window.sessionStorage.getItem('isLogin') == 'true' ? true : false,
  // 账号信息
  account: {},
  // 用户信息
  profile: {},
  //  喜欢的音乐列表 
  likeIdList: [],
}

const getters = {
  // 正在播放歌曲的信息
  playingSongInfo(state) {
    // if (state.playingSongIndex !== null) {
    return state.playlists[state.playingSongIndex]
    // }
  }
}

const store = createStore({
  state, getters, actions, mutations
})

export default store