import { createStore } from 'vuex'

export default createStore({
  state: {
    // 歌单 ( 网友精选碟 )
    playlists: [],
  },
  getters: {
  },
  mutations: {
    setPlayList(state, value) {
      state.playlists = value;
      // console.log(state.playlist)
    },
  },
  actions: {
  },
  modules: {
  }
})
