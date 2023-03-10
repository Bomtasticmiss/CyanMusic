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
}

const getters = {
  // // 格式化音乐演唱歌手
  // SingersFormate: () =>
  //   (row) => {
  //     // console.log(row);
  //     return row.ar.length > 1
  //       ? row.ar.reduce(
  //         (total, item, index, self) =>
  //           index === self.length - 1
  //             ? total + item.name
  //             : total + item.name + '/',
  //         ''
  //       )
  //       : row.ar[0].name
  //   },
  // // 格式化时间
  // timeFormate: () => (time) => {
  //   // 补零
  //   const zeroPad = (num) => {
  //     if (num.toString().length < 2) num = `0${num}`
  //     return num
  //   }
  //   const seconds = Math.floor(time % 60)
  //   const minute = Math.floor(time / 60)
  //   return zeroPad(minute) + ':' + zeroPad(seconds)
  // },
  // // currentSongInfo: () => () => {

  // // },
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