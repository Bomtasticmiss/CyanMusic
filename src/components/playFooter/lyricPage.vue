<template>
      <div class="lyric_wrapper">
        <div class="lyric_name">{{ props.songName }}</div>
          <div class="lyric" ref="lyric">
            <div
              v-for="(lyric, index) in lyricsObj.formate_lyric"
              :key="index"
              class="lineLyric"
              :class="{
                // active: index == lyric_row,
                lyricName: index == 0,
              }">
              {{ lyric.content }}
            </div>
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
  } from 'vue'
  import { getlyric } from '@/Api/api_song'

  import { useStore } from 'vuex'
  import Lyric from '@/hooks/lyric'
  const props = defineProps(['currentTime', 'songName', 'durationTime'])

  const store = useStore()

  onMounted(() => {
    // 初始化获取歌词
    Getlyric()
  })

  const lyric = ref(null)

  // 是否正在滑动
  const isSlide = ref(false)
 
  watch(
    () => props.currentTime,
    (newCurrentTime) => {

    }
  )
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
  // 正在播放的歌曲信息
  const playingSongInfo = computed(() => {
    return store.getters.playingSongInfo
  })
  // 监听获取歌词
  watch(playingSongInfo, () => {
    Getlyric()
    // 歌曲回弹
    // lyric_row.value = 0
  })

  // 歌词实例对象
  const lyricsObj=ref({})
  // 播放歌曲 获取歌词
  const Getlyric = async () => {
    const res = await getlyric(playingSongInfo.value.id)
    let strLyric = res.lrc.lyric
    lyricsObj.value=new Lyric(strLyric)
  }

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
    requestAnimationFrame(slide);

    // 鼠标弹起
    const Mouseup = () => {
      console.log(1)
      // a.value++;
      // isSlide.value = false
      // debounce(() => {
        isSlide.value = false
      // }, 3000)
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

  function debounce(fn, delay) {
    // if(isSlide.value)
    let timer
    return function () {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        fn()
      }, delay)
    }
  }
</script>
<style lang="less">
  .active {
    color: #ec4141;
    font-size: 20px;
  }
 
    .lyric_wrapper {
      margin: auto;
      margin-left: 100px;
      .lyric_name {
        margin: 20px;
        text-align: center;
        font-size: 26px;
        padding: 10px;
      }
    }
    .lyricAuto {
      width: 600px;
      // flex-basis: 60%;
      height: 300px;
      overflow-y: scroll;
    }

    .lyricBack:hover {
      transform: rotate(-90deg);
    }
    .lyric {
      // margin: 100px auto;
      // width: 100%;
      width: 600px;
      // flex-basis: 60%;
      height: 300px;
      overflow-y: scroll;
      text-align: center;
      transition: all 0.5s;
      position: relative;
      // .lyricName {
      //   font-size: 28px;
      // }
      .lineLyric {
        padding: 10px 0;
        transition: all 0.4s;
        width: fit-content;
        margin: 0 auto;
      }
    }
    .lyric:hover {
      // transform: scale(1.01);
      cursor: grab;
    }
  
</style>
