

export default {
    setPlaylists(state, value) {
        state.playlists = value
    }, 
    setPlayingSongIndex(state, index) {
        state.playingSongIndex = index
        state.paused = true
    },
    setSongUrl(state, songUrl) {
        state.playSongUrl = songUrl
    },
    setCurrentSongId(state) {
        // state.currentSongId = songId
        state.currentSongId = state.playlists[state.playingSongIndex].id
    },
    setPaused(state, paused) {
        state.paused = paused
    },
    setProfile(state, profile) {
        state.profile = profile
    },
    setAccount(state, account) {
        state.account = account
    },
    setIsLogin(state, isLogin) {
        state.isLogin = isLogin
        if (state.isLogin) {
            window.sessionStorage.setItem('isLogin', true)
        }
    },
    // setPlayDurationTime(state, DurationTime) {
    //   state.playDurationTime = DurationTime
    // },
    // 播放上一首
    HandlePlayPre(state) {
        state.playingSongIndex -= 1;

        if (state.playingSongIndex < 0) {
            state.playingSongIndex = state.playlists.length - 1;
        }
        state.currentSongId = state.playlists[state.playingSongIndex].id
    },
    // 播放下一首
    HandlePlayNext(state) {
        state.playingSongIndex += 1;

        if (state.playingSongIndex > state.playlists.length - 1) {
            state.playingSongIndex = 0;
        }
        state.currentSongId = state.playlists[state.playingSongIndex].id

    },
    changeLyricShow(state) {
        state.isShowLyricPage = !state.isShowLyricPage
    }
}