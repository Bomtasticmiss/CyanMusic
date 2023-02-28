<template>
  <div class="footer">
    <!-- playfooter左侧 -->
    <div class="left-util">
      <div v-if="playingSongInfo" class="left-util">
        <div
          class="songWrapper"
          @mouseover="showTopIcon"
          @mouseout="hiddeTopIcon"
          @click="enterlyricPage">
          <i
            ref="topIcon"
            class="fa fa-chevron-circle-up fa-lg topIcon pointer"
            aria-hidden="true"
            style="opacity: 0"></i>
          <img
            v-if="playingSongInfo.al"
            class="song-img pointer"
            :src="playingSongInfo.al.picUrl"
            alt="" />
        </div>
        <div class="song-info">
          <div class="text-hidden font-14 w-150">
            <p class="pointer songInfo">{{ playingSongInfo.name }}</p>
          </div>
          <div class="text-hidden font-12 w-100" v-if="SingersFormate">
            <p class="pointer songInfo">{{ SingersFormate }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- playfooter中间 -->
    <div class="center-util">
      <ul class="play-btn">
        <li class="pointer">
          <i class="fa fa-random" aria-hidden="true"></i>
        </li>
        <li @click="handlePlayPre" class="pointer">
          <i class="fa fa-step-backward" aria-hidden="true"></i>
        </li>
        <li @click="handlePauseOrPlay" class="pointer">
          <i
            class="fa fa-play-circle-o fa-lg"
            aria-hidden="true"
            v-show="!paused"></i>
          <i
            class="fa fa-pause-circle-o fa-lg"
            aria-hidden="true"
            v-show="paused"></i>
        </li>
        <li @click="handlePlayNext" class="pointer">
          <i class="fa fa-step-forward" aria-hidden="true"></i>
        </li>
        <li class="pointer">
          <i class="fa fa-heart-o" aria-hidden="true"></i>
        </li>
      </ul>
      <!-- 进度条 -->
      <div class="play-time">
        <span class="font-14">{{ currentTime }}</span>
        <div
          class="time-process pointer"
          style="width: 460px"
          ref="fullTime"
          @click="clickProgress">
          <div
            class="time-through"
            style="width: 0%; left: 0%"
            ref="progress"></div>
          <!-- <div
            class="time-through-btn-border"
            -->
          <div
            class="time-through-btn"
            @mousedown="handleMousedown"
            @mouseup="handleMouseup"></div>

          <!-- </div> -->
        </div>
        <span class="font-14">{{ duration }}</span>
      </div>
      <audio
        autoplay
        ref="audio"
        @timeupdate="updatetime"
        @canplay="getDuration">
        <source v-if="songUrl" :src="songUrl" type="audio/mpeg" />
      </audio>
    </div>
    <div class="right-util"></div>

    <el-drawer
      v-model="isShowlyricPage"
      direction="btt"
      size="100%"
      :before-close="handleClose">
      <div class="lyricWrapper">
        <div class="lyric-container">
          <!-- <div class="lyricBack pointer" @click="cnacel">
            <i class="fa fa-times fa-lg" aria-hidden="true"></i>
          </div> -->
          <div class="lyriCoverPage">
            <div style="position: relative">
              <div class="cover_bg"></div>
              <div class="cover_bg_1"></div>
              <div class="cover_bg_2"></div>
              <div class="cover">
                <img
                  v-if="playingSongInfo"
                  :src="playingSongInfo.al.picUrl"
                  alt="" />
                <div class="cover_center"></div>
              </div>
            </div>
          </div>
          <lyricPage
            v-if="playingSongInfo"
            :currentTime="audioCurrentTime.toFixed(3)"
            :durationTime="audioDurationTime.toFixed(3)"
            :songName="playingSongInfo.name" />
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
  import {
    onMounted,
    ref,
    reactive,
    toRefs,
    computed,
    watch,
    nextTick,
    createVNode,
    render,
  } from 'vue'
  import { useStore } from 'vuex'
  import lyricPage from './lyricPage.vue'
  import useGetSong from '@/hooks/useGetSong'
  import { useTimeFormate, useSingersFormate } from '@/hooks/useFormate'
  import { getSong } from '@/Api/api_song'
  const store = useStore()
  const audio = ref()
  const fullTime = ref()
  const progress = ref()
  const data = reactive({
    // 进度条是否移动
    isMove: false,
    audioCurrentTime: 0,
    audioDurationTime: 0,
    // 当前时间
    currentTime: '00:00',
    // 总时间
    duration: '00:00',
    // 歌曲链接
    songUrl:null
  })

  // const { getSongUrl } = useGetSong()

  const changeSongUrl = async () => {
    const url = await getSongUrl(playingSongInfo.value.id)
    // const url = await getSongUrl(currentSongId)
    // console.log(store.state.currentSongId)
    console.log(url)
    // store.commit('setSongUrl', url)
    songUrl.value = url
  }
// 获取音乐链接
  const getSongUrl = async () => {
    const res = await getSong(playingSongInfo.value.id)
    if(res.code!==200)return 
    if(!res.data[0].url)return ElMessage({ message: '资源获取失败', type: 'error' })
    console.log(res)
    songUrl.value = res.data[0].url
    audio.value.load()
    audio.value.play()
  }
  // 歌曲链接
  // const songUrl = computed(() => {
  //   return store.state.playSongUrl
  // })
  // 一首歌曲信息
  const playingSongInfo = computed(() => {
    return store.getters.playingSongInfo
  })
  // 格式化歌手信息
  const SingersFormate = computed(() => {
    return useSingersFormate(playingSongInfo.value)
    // return useSingersFormate(playingSongInfo.value)
  })

  const isShowLyricPage = computed(() => {
    return store.state.isShowLyricPage
  })

  const currentSongId = computed(() => {
    return store.state.currentSongId
  })
  // const GetSong
  // 暂停，播放
  const paused = computed({
    get() {
      return store.state.paused
    },
    set(newValue) {
      store.commit('setPaused', newValue)
    },
  })

  //监听音乐连接变化
  // watch(
  //   () => songUrl,
  //   () => {
  //     // if(data.songUrl==='')return
  //     console.log(1111111111111)
  //     audio.value.load()
  //     audio.value.play()
  //     console.log(11111)
  //   }
  // )

  watch(currentSongId, () => {
    if (currentSongId.value == 0) return
    // changeSongUrl()
    getSongUrl()
    // audio.value.load()
    // audio.value.play()
  })

  // 播放上一首
  const handlePlayPre = () => {
    store.commit('HandlePlayPre')
    // changeSongUrl()
    getSongUrl()

  }
  // 播放下一首
  const handlePlayNext = () => {
    store.commit('HandlePlayNext')
    // changeSongUrl()
    getSongUrl()

  }

  // 暂停，播放
  const handlePauseOrPlay = () => {
    if (!songUrl.value) return
    audio.value.paused ? (paused.value = true) : (paused.value = false)
    audio.value.paused ? audio.value.play() : audio.value.pause()
  }
  // 更新进度条
  const updatetime = () => {
    // 播放完自动下一首
    if (audio.value.currentTime === audio.value.duration) {
      handlePlayNext()
    }
    // console.log(audio.value.currentTime)
    // console.log(audio.value.duration)
    audioCurrentTime.value = audio.value.currentTime
    currentTime.value = useTimeFormate(audio.value.currentTime)
    if (isMove.value || audio.value.paused) return
    const moveX = Math.trunc(
      (100 * audio.value.currentTime) / audio.value.duration
    )
    nextTick(() => {
      progress.value.style.width = moveX + '%'
    })
  }
  // 播放开始时时暂停获取总时间
  const getDuration = () => {
    // if(audio.value.duration){
    //   console.log(audio.value.duration)
    // audioDurationTime.value=audio.value.duration;
    // }
    // store.commit('setPlayDurationTime',audio.value.duration)
    duration.value = useTimeFormate(audio.value.duration)
  }
  // 更新时间
  const updateProgress = (per) => {
    audio.value.currentTime = per * audio.value.duration
  }
  //点击更新时间
  const clickProgress = (e) => {
    // 点击时禁止鼠标在滑块时的默认行为
    e.preventDefault && e.preventDefault()
    const moveMin = progress.value.offsetParent.offsetLeft
    let moved = Math.floor(
      (100 * (e.pageX - moveMin)) / fullTime.value.offsetWidth
    )
    updateProgress(moved / 100)
    if (!paused.value) {
      handlePauseOrPlay()
    }
  }
  // 鼠标按下圆标按钮.滑动进度条
  const handleMousedown = (e) => {
    // 拖拽时禁止鼠标在滑块时的默认行为
    e.preventDefault && e.preventDefault()
    if (!songUrl.value) return
    isMove.value = true
    let moved = null
    // const moveMax =progress.value.offsetParent.offsetLeft + fullTime.value.offsetWidth
    // 进度条拖拽
    let move = (e) => {
      // console.log(11)

      const moveMin = progress.value.offsetParent.offsetLeft
      moved = Math.floor(
        (100 * (e.pageX - moveMin)) / fullTime.value.offsetWidth
      )
      if (moved > 100) return
      if (moved < 0) return
      nextTick(() => {
        progress.value.style.width = moved + '%'
      })
    }
    requestAnimationFrame(move)
    // 鼠标弹起
    const Mouseup = (moved) => {
      isMove.value = false
      document.removeEventListener('mousemove', move)
      // 按钮只按下没有移动
      if (!moved) return
      updateProgress(moved)
      if (!paused.value) {
        handlePauseOrPlay()
      }
    }
    document.addEventListener('mousemove', move)

    // 拖拽完鼠标弹起事件
    document.addEventListener(
      'mouseup',
      () => {
        Mouseup(moved / 100)
      },
      { once: true }
    )
  }

  const debounce = (fun, delay = 500) => {
    let timer = null
    return function (args) {
      const _this = this
      let _args = args
      if (timer) clearTimeout(timer)
      timer = setTimeout(function () {
        fun.call(_this, _args)
      }, delay)
    }
  }

  const topIcon = ref()

  const showTopIcon = () => {
    nextTick(() => {
      topIcon.value.style.opacity = 1
    })
    // console.log(topIcon.value.style.opacity)
  }

  const hiddeTopIcon = () => {
    nextTick(() => {
      topIcon.value.style.opacity = 0
    })
  }

  const isShowlyricPage = ref(false)
  const enterlyricPage = () => {
    // const div = document.createElement('div')
    // // 添加类名
    // div.setAttribute('class', 'lyricWrapper')
    // // 添加到body上
    // document.body.appendChild(div)
    // lyricPage()
    isShowlyricPage.value = !isShowlyricPage.value
    store.commit('changeLyricShow')
  }

  const handleClose = () => {
    isShowlyricPage.value = false
  }

  // const moveDebounce = debounce(move)
  let { isMove, currentTime, duration, audioCurrentTime, audioDurationTime,songUrl } =
    toRefs(data)
</script>

<style lang="less" scoped>
  .footer {
    height: 100px;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #d8d8d8;
  }
  .left-util {
    display: flex;
    align-items: center;
    width: 225px;
    .songWrapper {
      // width: fit-content;
      margin: 0 10px;
      // z-index: 1000;
      position: relative;
      .topIcon {
        color: white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        // opacity: 0;
        transition: all 0.5s;
      }
      .topIcon:hover {
        // opacity: 1;
      }
    }
    .song-img {
      // margin: 0 10px;
      width: 50px;
      height: 50px;
      border-radius: 5px;
      //background-color: #ec4141;
    }
  }

  .song-info {
    .songInfo {
      width: fit-content;
    }
    .songInfo:hover {
      color: #ec4141;
    }
  }
  .center-util {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 600px;
  }
  ul {
    list-style: none;
  }
  .play-btn {
    width: 300px;
    display: flex;
    margin: 0 auto;
    justify-content: space-around;
    align-items: center;
    li:hover {
      color: #ec4141;
    }
  }
  .is-disabled {
    cursor: not-allowed;
  }
  .play-time {
    display: flex;
    justify-content: center;
    margin: 5px 10px;
    .time-process {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      height: 3px;
      background-color: #e4e7ed;
      margin: 10px 10px;
      .time-through {
        height: 3px;
        background-color: #ec4141;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
        // position: absolute;
      }
      // .time-through-btn-border{
      //   width: 36px;
      //   height: 36px;
      // }
      .time-through-btn {
        border-radius: 50%;
        background-color: #ec4141;
        border: 0;
        vertical-align: middle;
        display: inline-block;
        width: 9px;
        height: 9px;
        transition: 0.2s;
      }
      .time-through-btn:hover {
        transform: scale(1.2);
        cursor: grab;
      }
      // -moz-user-select: none; /*火狐*/
      //   -webkit-user-select: none;  /*webkit浏览器*/
      //   -ms-user-select: none;   /*IE10*/
      //   -khtml-user-select: none; /*早期浏览器*/
      //   user-select: none;
    }
  }
  .right-util {
    width: 200px;
    border: solid 1px;
  }

  .lyricWrapper {
    // position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    height: 86%;
    // z-index: 1000;
    // background-color: #e1e1e1;
    .lyric-container {
      position: relative;
      display: flex;
      height: 100%;
      .lyricBack {
        position: absolute;
        right: 110px;
        top: 20px;
        transition: all 0.5s;
        z-index: 1000;
      }
    }
    .lyriCoverPage {
      display: flex;
      position: relative;
      // border: 1px solid black;
      // width: 200px;
      // height: 700px;
      flex-basis: 35%;
      justify-content: flex-end;
      align-items: center;
      .cover_bg {
        width: 310px;
        height: 310px;
        position: absolute;
        background-color: #d7d7d7ad;
        // border: 1px solid black;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 42%;
        animation: cover_rotate 10s linear infinite;
      }
      .cover_bg_1 {
        width: 310px;
        height: 310px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
        background-color: #c8c8c8ad;
        // border: 1px solid black;
        border-radius: 46%;
        animation: cover_rotate 8s linear infinite;
      }
      .cover_bg_2 {
        width: 310px;
        height: 310px;
        position: absolute;
        background-color: #bdbdbdad;
        // border: 1px solid black;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 49%;
        animation: cover_rotate 6s linear infinite;
      }
      .cover {
        position: relative;
        border-radius: 50%;
        overflow: hidden;
        width: 300px;
        height: 300px;
        // margin: 50px;
        // border: 2px black solid;
        animation: cover_rotate1 20s linear infinite;
        img {
          width: 100%;
          height: 100%;
        }
        // .cover_center {
        //   position: absolute;
        //   transform: translate(-50%, -50%);
        //   background-color: #e1e1e1;
        //   top: 50%;
        //   left: 50%;
        //   width: 100px;
        //   height: 100px;
        //   border-radius: 50%;
        //   border: 2px black solid;
        // }
      }
      // .cover::after {
      //   content: '';
      //   position: absolute;
      //   left: 9px;
      //   top: 0;
      //   width: 201px;
      //   height: 180px;
      //   background: url(../../assets/pic/album_cover_player.png)
      //     0 0 no-repeat;
      // }
      @keyframes cover_rotate {
        0% {
          transform: translate(-50%, -50%) rotate(0deg);
        }
        50% {
          transform: translate(-50%, -50%) rotate(180deg);
        }
        100% {
          transform: translate(-50%, -50%) rotate(360deg);
        }
      }
      @keyframes cover_rotate1 {
        0% {
          transform: rotate(0deg);
        }
        50% {
          transform: rotate(180deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
</style>
