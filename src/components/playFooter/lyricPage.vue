<template>
  <div class="lyric_wrapper">
    <div class="lyric_name" v-if="props.songName">{{ props.songName }}</div>
    <div class="lyric font-14" ref="lyric" :style="{ 'text-align': _type }">
      <p
        v-for="(lyric, index) in lyricsObj.formate_lyric"
        :key="index"
        class="lineLyric text-hidden"
        :class="{
          active: index == lyricsObj.current,
          lyricName: index == 0,
        }">
        {{ lyric.content }}
      </p>
    </div>
  </div>
</template>

<script setup>
  import {
    ref,
    onMounted,
    computed,
    watch,
    nextTick,
    onBeforeUnmount,
    onBeforeMount,
  } from 'vue'
  import { getlyric } from '@/Api/api_song'

  import { useStore } from 'vuex'
  import Lyric from '@/hooks/lyric'
  const props = defineProps({
    currentTime: {
      type: Number,
      require: true,
    },
    songName: {
      type: String,
      default: null,
    },
    durationTime: {
      type: Number,
      require: true,
    },
    _type: {
      type: String,
      default: 'center',
    },
  })
  const store = useStore()

  const lyric = ref(null)

  // 是否正在滑动
  const isSlide = ref(false)

  onBeforeMount(async () => {
    // 初始化获取歌词
    /* 其他页面切换到Fm页面时，currenttime没有清零，
    lyricsObj为空，将报错NaN，获取歌词时禁止监听函数执行*/
    isSlide.value = true
    await Getlyric()
    isSlide.value = false
  })
  onMounted(() => {
    // 监听鼠轮滚动
    if (lyric.value.addEventListener) {
      lyric.value.addEventListener(
        'DOMMouseScroll',
        debounce(scrollFunc, 500),
        false
      ) //火狐
    }
    lyric.value.onmousewheel = debounce(scrollFunc, 500) //IE/Opera/Chrome
  })

  onBeforeUnmount(() => {
    if (lyric.value.addEventListener) {
      lyric.value.removeEventListener(
        'DOMMouseScroll',
        debounce(scrollFunc, 500)
      )
    }
    lyric.value.onmousewheel = null
  })

  // 歌词回弹防抖
  const debounce = (fn, delay) => {
    let timer
    return function () {
      isSlide.value = true
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        fn()
      }, delay)
    }
  }
  const scrollFunc = () => {
    console.log('滑动')
    isSlide.value = false
  }

  // 正在播放的歌曲信息
  const playingSongInfo = computed(() => {
    return store.getters.playingSongInfo
  })

  // 监听获取歌词
  watch(playingSongInfo, async () => {
    // 赋值isSlide为true防止切换歌词对象时与传进lyric组件的props.currentTime发生冲突报错
    isSlide.value = true
    await Getlyric()
    isSlide.value = false
  })

  // 歌词实例对象
  const lyricsObj = ref({})
  // 播放歌曲 获取歌词
  const Getlyric = async () => {
    const res = await getlyric(playingSongInfo.value.id)
    let strLyric = res.lrc.lyric
    lyricsObj.value = new Lyric(strLyric)
  }

  watch(
    () => props.currentTime,
    (newCurrentTime) => {
      if (isSlide.value) return
      handleCurrentTime(newCurrentTime)
      // console.log(lyricsObj.value.current)
    }
  )
  // 歌词滚动
  const handleCurrentTime = (time) => {
    // console.log(lyricsObj.value, time)
    if (
      lyricsObj.value.current !== lyricsObj.value.total - 1 &&
      time + 0.1 >
        lyricsObj.value.formate_lyric[lyricsObj.value.current + 1].time
    ) {
      /* 正常播放或往前拉进度条 */
      lyricsObj.value.current++
      /* 在拉进度的时候，time只改变了一次，但需要定位到歌词进度对应的行 */
      if (
        lyricsObj.value.current !== lyricsObj.value.total - 1 &&
        time + 0.1 >
          lyricsObj.value.formate_lyric[lyricsObj.value.current + 1].time
      ) {
        handleCurrentTime(time)
      }
      lyricHanlder(lyricsObj.value.current)
    } else if (
      lyricsObj.value.current !== 0 &&
      time - 0.1 <
        lyricsObj.value.formate_lyric[lyricsObj.value.current - 1].time
    ) {
      /* 往回拉进度条 */
      lyricsObj.value.current--
      /* 在拉进度的时候，time只改变了一次，但需要定位到歌词进度对应的行 */
      if (
        lyricsObj.value.current !== 0 &&
        time - 0.1 <
          lyricsObj.value.formate_lyric[lyricsObj.value.current - 1].time
      ) {
        handleCurrentTime(time)
      }
      lyricHanlder(lyricsObj.value.current)
    }
  }

  const lyricHanlder = (activeLine) => {
    if (activeLine < 3)
      nextTick(() => {
        lyric.value.scrollTop = 0
      })
    else {
      scrollAnimation(activeLine - 3)
    }
  }

  const lyricScrollTop = ref(0)

  watch(
    lyric,
    (newvlaue) => {
      console.log('回弹', newvlaue.scrollTop)

      // if (lyricScrollTop.value !== newvlaue.value.scrollTop && isSlide.value == false) {
      //   setTimeout(() => {
      //     nextTick(() => {
      //       lyric.value.scrollTop = lyricScrollTop
      //     })
      //   }, 500)
      // }
    },
    { deep: true }
  )
  const scrollAnimation = (num) => {
    let count = 0

    let animationTop = (timestamp) => {
      // console.log(lyric.value.scrollTop)
      count++
      nextTick(() => {
        lyric.value.scrollTop = (num - 1) * 40 + count + 1
      })
      // console.log(timestamp)
      if (count < 40) {
        window.requestAnimationFrame(animationTop)
      }
    }
    // let start
    // const animationTop = (timestamp) => {
    //   if (start === undefined) start = timestamp
    //   const elapsed = timestamp - start
    //   console.log(elapsed)
    //   nextTick(() => {
    //     lyric.value.scrollTop = Math.min(
    //       0.16 * elapsed + (num - 1) * 40,
    //       num * 40
    //     )
    //   })
    //   if (elapsed < 250) {
    //     // 在.25秒后停止动画
    //     window.requestAnimationFrame(animationTop)
    //   }
    // }

    // console.log(lyric.value.scrollTop)
    window.requestAnimationFrame(animationTop)
    lyricScrollTop.value = num * 40
  }
  // 取消歌词页面
  const cnacel = () => {
    isShowLyricPage.value = false
  }
  //展示歌词页面
  const isShowLyricPage = computed({
    get() {
      return store.state.isShowLyricPage
    },
    set() {
      store.commit('changeLyricShow')
    },
  })

  // 歌词拖拽
  const sliding = (e) => {
    isSlide.value = true
    // 拖拽时禁止鼠标在滑块时的默认行为
    e.preventDefault && e.preventDefault()
    let head = e.pageY
    let tail = null

    let slide = (e) => {
      tail = e.pageY
      let UpDown = head - tail
      head = tail
      //鼠标上移
      if (UpDown > 0) {
        if (lyric_top.value <= -(lyrics.value.length - 3) * 41) return
        // console.log('上移', UpDown)
        lyric_top.value -= 4
        nextTick(() => {
          lyric.value.style.transform = `translateY(${lyric_top.value}px)`
        })
      }
      // 鼠标下移
      if (UpDown < 0) {
        if (lyric_top.value >= 0) {
          return
        }
        // console.log('下移', UpDown)
        lyric_top.value += 4
        nextTick(() => {
          lyric.value.style.transform = `translateY(${lyric_top.value}px)`
        })
      }
      // console.log(e.pageY)
    }
    requestAnimationFrame(slide)

    // 鼠标弹起
    const Mouseup = () => {
      console.log(1)
      isSlide.value = false
      document.removeEventListener('mousemove', slide)
    }
    document.addEventListener('mousemove', slide)
    // 拖拽完鼠标弹起事件
    document.addEventListener(
      'mouseup',
      () => {
        Mouseup()
      },
      { once: true }
    )
  }
</script>
<style lang="less">
  .active {
    color: #ec4141;
    // font-size: 18px;
    font-weight: bold;
  }

  .lyric_wrapper {
    margin: auto;
    // margin-left: 100px;
    .lyric_name {
      margin: 20px;
      text-align: center;
      font-size: 26px;
      padding: 10px;
    }
  }

  .lyricBack:hover {
    transform: rotate(-90deg);
  }
  .lyric {
    width: 400px;
    height: 440px;
    overflow-y: scroll;

    transition: all 0.5s;
    position: relative;
    // .lyricName {
    //   font-size: 28px;
    // }
    .lineLyric {
      transition: all 0.4s;
      // width: fit-content;
      // margin: 0 auto;
      box-sizing: border-box;
      height: 40px;
    }
  }
  .lyric:hover {
    // transform: scale(1.01);
    cursor: grab;
  }
</style>
