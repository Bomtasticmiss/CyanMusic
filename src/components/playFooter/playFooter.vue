<template>
  <div class="play-wrapper">
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
          <img
            v-if="playingSongInfo.album"
            class="song-img pointer"
            :src="playingSongInfo.album.picUrl"
            alt="" />
        </div>
        <div class="song-info">
          <div class="text-hidden font-14 w-150">
            <p class="pointer songInfo">
              {{ playingSongInfo.name || '未知歌曲' }}
            </p>
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
          <div
            class="time-through-btn"
            @mousedown="handleMousedown"
            @mouseup="handleMouseup"></div>
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
    <div class="right-util">
      <div class="voice pointer">
        <span class="iconfont icon-shengyin"></span>
        <div class="voice-control-wrapper">
          <input
            ref="volume"
            style="transform: rotate(270deg); background-size: 100% 100%"
            id="volume"
            type="range"
            min="0"
            max="100"
            value="100"
            @input="changeVolume" />
          <!-- <div class="voice-control">
            <div style="width: 3px; height: 50%" class="voice-througth"></div>
            <div class="voice-btn"></div>
          </div> -->
        </div>
      </div>
      <div class="playlist pointer" @click="handleShowPlaylist">
        <span class="iconfont icon-liebiao"></span>
      </div>
    </div>
    <!-- 播放列表 -->
    <el-drawer
      v-model="isShowPlaylist"
      direction="rtl"
      size="30%"
      :before-close="handlePlaylistClose">
      <template #header>
        <div class="font-14">播放列表总共{{ playlists.length }}首</div>
        <div class="font-14" v-if="playingSongInfo">
          当前正在播放{{ playingSongInfo.name }}
        </div>
        <div class="font-14" v-if="!playingSongInfo">
          当前没有正在播放的歌曲
        </div>
      </template>
      <el-table
        :data="playlists"
        stripe
        style="width: 100%"
        size="small"
        @row-dblclick="GetSong"
        :row-class-name="RowClassName"
        empty-text="当前暂无正在播放的音乐">
        <el-table-column type="index" width="50px" class-name="default" />
        <el-table-column
          prop="name"
          label="音乐"
          class-name="default"
          show-overflow-tooltip />
        <el-table-column
          label="歌手"
          :formatter="singersFormate"
          show-overflow-tooltip
          class-name="pointer" />
        <el-table-column
          label="时长"
          width="100px"
          :formatter="timeFormate"
          class-name="default" />
      </el-table>
    </el-drawer>

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
                  v-if="playingSongInfo.al"
                  :src="playingSongInfo.al.picUrl"
                  alt="" />
                <img
                  v-if="playingSongInfo.album"
                  :src="playingSongInfo.album.picUrl"
                  alt="" />
                <div class="cover_center"></div>
              </div>
            </div>
          </div>
          <lyricPage
            v-if="playingSongInfo"
            :currentTime="Number(audioCurrentTime.toFixed(3))"
            :durationTime="Number(audioDurationTime.toFixed(3))"
            :songName="playingSongInfo.name" />
        </div>
        <div style="margin: 20px 300px">
          <Comment :id="playingSongInfo.id" :type="0" />
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
  import Comment from '../comment/Comment.vue'
  const store = useStore()
  const audio = ref()
  const volume = ref()
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
    songUrl: null,
  })

  const playlists = computed(() => {
    return store.state.playlists
  })
  // const playingSongIndex=computed(()=>{
  //   return store.state.playingSongIndex
  // })
  // const { getSongUrl } = useGetSong()

  const changeSongUrl = async () => {
    // const url = await getSongUrl(playingSongInfo.value.id)
    // const url = await getSongUrl(currentSongId)
    // console.log(store.state.currentSongId)
    // console.log(url)
    // store.commit('setSongUrl', url)
    // songUrl.value = songUrl.
  }
  // 获取音乐链接
  const getSongUrl = async () => {
    const res = await getSong(playingSongInfo.value.id)
    console.log(res)
    if (res.code !== 200) return
    if (!res.data[0].url) {
      ElMessage({ message: '资源获取失败', type: 'error' })
      // songUrl.value = res.data[0].url
      // audio.value.load()
      // audio.value.play()
      // updatetime()
      return
    }
    console.log(res)
    songUrl.value = res.data[0].url
    // store.commit('setSongUrl', res.data[0].url)
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
    return useSingersFormate(playingSongInfo.value) || '未知歌手名'
    // return useSingersFormate(playingSongInfo.value)
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

  // 监听音乐连接变化
  // watch(songUrl, () => {
  //   audio.value.load()
  //   audio.value.play()
  // })

  watch(currentSongId, () => {
    // if (currentSongId.value == 0) return
    // changeSongUrl()
    getSongUrl()
    console.log(1)
    // audio.value.load()
    // audio.value.play()
  })

  // 播放上一首
  const handlePlayPre = () => {
    store.commit('HandlePlayPre')
    paused.value = true
    // changeSongUrl()
    // getSongUrl()
  }
  // 播放下一首
  const handlePlayNext = () => {
    store.commit('HandlePlayNext')
    paused.value = true
    // changeSongUrl()
    // getSongUrl()
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
    if (audio.value.duration) {
      console.log(audio.value.duration)
      audioDurationTime.value = audio.value.duration
    }
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
    if (!songUrl.value) return
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

  const isShowPlaylist = ref(false)

  const handleShowPlaylist = () => {
    isShowPlaylist.value = !isShowPlaylist.value
  }

  const handlePlaylistClose = () => {
    isShowPlaylist.value = false
  }

  // 格式化音乐演唱歌手
  const singersFormate = (row) => {
    // console.log(row)
    return useSingersFormate(row)
  }
  // 格式化时间
  const timeFormate = (row) => {
    return useTimeFormate(row.dt / 1000)
  }

  // 添加索引
  const RowClassName = ({ row, rowIndex }) => {
    row.index = rowIndex
  }

  const changeVolume = () => {
    if (!audio.value) return
    // voice.value=volume.value.value
    console.log(volume.value.value / 100)
    // console.log(value)
    audio.value.volume = volume.value.value / 100
    // console.log(audio.value.volume)
    console.log(volume.value.style.backgroundSize)
    nextTick(() => {
      volume.value.style.backgroundSize = `${volume.value.value}% 100%`
    })
  }

  // const moveDebounce = debounce(move)
  let {
    isMove,
    currentTime,
    duration,
    audioCurrentTime,
    audioDurationTime,
    songUrl,
  } = toRefs(data)
</script>

<style lang="less" scoped>
  .play-wrapper {
    height: 100%;
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
      flex-shrink: 0;
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
        transition: height 0.15s;
        transition: width 0.05s;
        &:hover {
          height: 4px;
        }
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
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 20px !important;
    .voice {
      position: relative;
      .voice-control-wrapper {
        position: absolute;
        top: -200px;
        height: 200px;
        width: 30px;
        background-color: #fffcfc;
        border-radius: 3px;
        left: -50%;
        box-shadow: 0px 7px 20px 2px #d2d2d2;
        transition: all 0.3s;
        z-index: 2000;
        opacity: 0;
        visibility: hidden;
        // visibility: visible;
        display: flex;
        align-items: center;
        justify-content: center;
        .voice-control {
          background-color: #b7b7b7;
          width: 3px;
          height: 180px;
          border-radius: 3px;
          display: flex;
          flex-direction: column-reverse;
          align-items: center;
          // margin: auto;
          .voice-througth {
            background-color: #ec4141;
          }
          .voice-btn {
            background-color: #ec4141;
            height: 10px;
            width: 10px;
            border-radius: 50%;
            transition: all 0.2s;
            &:hover {
              transform: scale(1.2);
            }
          }
        }
        input[type='range'] {
          margin-top: 8px; /*上部分的填充值*/
          outline: none;
          -webkit-appearance: none; /*清除系统默认样式*/
          // width: 100% !important;
          background: -webkit-linear-gradient(#ec4141, #b03030) no-repeat, #ddd; /*背景颜色，俩个颜色分别对应上下，自己尝试下就知道了嗯*/
          // background-size: 33% 100%; /*设置左右宽度比例*/
          height: 3px; /*横条的高度，细的真的比较好看嗯*/
        }
        /*拖动块的样式*/
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none; /*清除系统默认样式*/
          height: 14px; /*拖动块高度*/
          width: 14px; /*拖动块宽度*/
          background: #f8f9fa; /*拖动块背景*/
          border-radius: 50%; /*外观设置为圆形*/
          border: solid 1px #ddd; /*设置边框*/
        }
      }
      &:hover .voice-control-wrapper {
        opacity: 1;
        visibility: visible;
      }
    }
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

  @media screen and(max-width:768px) {
    .left-util {
      width: 180px;
    }

    .play-time {
      display: none;
    }
    .right-util {
      display: none;
    }
    .play-btn {
      width: 180px;
      li {
        &:nth-child(1) {
          display: none;
        }
      }
    }
  }
</style>
