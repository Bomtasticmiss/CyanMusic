import { createStore } from 'vuex'

export default createStore({
  state: {
    // 歌单 ( 网友精选碟 )
    // playlists: [],
    // 播放的歌曲信息
    songRowInfo: {},
    // 播放音乐的URL
    playSongUrl: '',
    // SingersFormate: ''
    // 暂停状态(false暂停||true播放)
    paused: false,
    // 评论信息
    commentInfo: [],
    //最热评论
    hotComment: [],
    // 最新评论
    lastedComment: [],
  },
  getters: {
    // 格式化音乐演唱歌手
    SingersFormate: () =>
      (row) => {
        // console.log(row)
        return row.ar.length > 1
          ? row.ar.reduce(
            (total, item, index, self) =>
              index === self.length - 1
                ? total + item.name
                : total + item.name + '/',
            ''
          )
          : row.ar[0].name
      },
    // 格式化时间
    timeFormate: () => (time) => {
      // 补零
      const zeroPad = (num) => {
        if (num.toString().length < 2) num = `0${num}`
        return num
      }
      const seconds = Math.floor(time % 60)
      const minute = Math.floor(time / 60)
      return zeroPad(minute) + ':' + zeroPad(seconds)
    },

  },
  mutations: {
    setSongRowUrl(state, [row, songUrl]) {
      state.songRowInfo = row
      state.playSongUrl = songUrl
      state.paused = true
    },
    setPaused(state, paused) {
      state.paused = paused
    },
    setCommentInfo(state, CommentInfo) {
      state.commentInfo = CommentInfo
      state.hotComment = CommentInfo.comments.slice(0, 8)
      state.lastedComment = CommentInfo.comments.slice(8, 21)
    },
  },
  actions: {
  },
  modules: {
  }
})
