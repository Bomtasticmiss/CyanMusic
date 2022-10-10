<template>
  <div class="footer">
    <div class="left-util">
      <img
        v-if="songRowInfo.al"
        class="song-img pointer"
        :src="songRowInfo.al.picUrl"
        alt="" />
      <div class="song-info">
        <div class="text-hidden font-14 w-150">{{ songRowInfo.name }}</div>
        <div class="text-hidden font-12 w-100" v-if="SingersFormate">
          {{ SingersFormate }}
        </div>
      </div>
    </div>
    <div class="center-util">
      <ul class="play-btn">
        <li>
          <i class="fa fa-random" aria-hidden="true"></i>
        </li>
        <li>
          <i class="fa fa-step-backward" aria-hidden="true"></i>
        </li>
        <li @click="handlePauseOrPlay">
          <i class="fa fa-play" aria-hidden="true" v-show="!paused"></i>
          <i class="fa fa-pause" aria-hidden="true" v-show="paused"></i>
        </li>
        <li>
          <i class="fa fa-step-forward" aria-hidden="true"></i>
        </li>
        <li>
          <i class="fa fa-heart-o" aria-hidden="true"></i>
        </li>
      </ul>
      <div class="play-time">
        <span class="font-14">{{ currentTime }}</span>
        <div class="time-process pointer" style="width: 460px" ref="fullTime">
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
    <div class="right-util"></div>
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
  } from 'vue'
  import { useStore } from 'vuex'
  const store = useStore()
  const audio = ref()
  const fullTime = ref()
  const progress = ref()
  const data = reactive({
    // 进度条是否移动
    isMove: false,
    SingersFormate: '',
    currentTime: '00:00',
    duration: '00:00',
  })

  onMounted(() => {})

  const songUrl = computed(() => {
    return store.state.playSongUrl
  })
  // 一首歌曲信息
  const songRowInfo = computed(() => {
    return store.state.songRowInfo
  })

  // 暂停，播放
  const paused = computed({
    get() {
      return store.state.paused
    },
    set(newValue) {
      store.commit('setPaused', newValue)
    },
  })

  watch(songUrl, () => {
    // console.log(newAudio)
    // songRowInfo.value = store.state.songRowInfo
    SingersFormate.value = store.getters.SingersFormate(songRowInfo.value)
    console.log(songRowInfo.value)
    audio.value.load()
    audio.value.play()
  })
  // 暂停，播放
  const handlePauseOrPlay = () => {
    if (!songUrl.value) return
    audio.value.paused ? (paused.value = true) : (paused.value = false)
    audio.value.paused ? audio.value.play() : audio.value.pause()
  }
  // 更新进度条
  const updatetime = () => {
    // console.log(audio.value.currentTime)
    // console.log(audio.value.duration)
    currentTime.value = store.getters.timeFormate(audio.value.currentTime)
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
    duration.value = store.getters.timeFormate(audio.value.duration)
    console.log(audio.value.duration)
  }

  // 更新时间
  const updateProgress = (per) => {
    audio.value.currentTime = per * audio.value.duration
  }

  // 鼠标按下圆标按钮
  const handleMousedown = () => {
    isMove.value = true
    let moved
    // const moveMax =progress.value.offsetParent.offsetLeft + fullTime.value.offsetWidth
    // 进度条拖拽
    let move = (e) => {
      const moveMin = progress.value.offsetParent.offsetLeft
      moved = Math.floor(
        (100 * (e.pageX - moveMin)) / fullTime.value.offsetWidth
      )
      if (moved > 100) return
      if (moved < 0) return
      console.log(1)
      nextTick(() => {
        progress.value.style.width = moved + '%'
      })
    }
    // 鼠标弹起
    const Mouseup = (moved) => {
      isMove.value = false
      updateProgress(moved)
      document.removeEventListener('mousemove', move)
      document.onselectstart = function () {
        return true
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
    // 拖拽禁用选择文本
    document.onselectstart = function () {
      return false
    }
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

  // const moveDebounce = debounce(move)
  let { isMove, SingersFormate, currentTime, duration } = toRefs(data)
</script>

<style lang="less" scoped>
  .footer {
    height: 70px;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #d8d8d8;
  }
  .left-util {
    display: flex;
    align-items: center;
    width: 225px;
  }
  .song-img {
    margin: 0 10px;
    width: 50px;
    height: 50px;
    border-radius: 5px;
    //background-color: #ec4141;
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
      }
    }
  }

  .right-util {
    width: 200px;
    border: solid 1px;
  }
</style>
