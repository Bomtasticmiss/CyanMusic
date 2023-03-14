<template>
  
      <div class="lyric_wrapper">
        <div class="lyric_name">{{ props.songName }}</div>
        <div class="lyricAuto">
          <div class="lyric" ref="lyric" @mousedown="sliding">
            <div
              v-for="(lyric, index) in lyrics"
              :key="index"
              class="lineLyric"
              :class="{
                active: index == lyric_row,
                lyricName: index == 0,
              }">
              {{ lyric.content }}
            </div>
          </div>
        </div>
      </div>
 
</template>

<script setup>
  import {
    customRef,
    ref,
    createVNode,
    render,
    onMounted,
    computed,
    watch,
    nextTick,
  } from 'vue'
  import { getlyric } from '@/Api/api_song'

  import { useStore } from 'vuex'
  const props = defineProps(['currentTime', 'songName', 'durationTime'])

  const store = useStore()

  onMounted(() => {
    // 初始化获取歌词
    Getlyric()
  })
  const lyric = ref()
  // 歌词滑动顶部距离
  const lyric_top = ref(0)
  // 正在播放的歌词
  const lyric_row = ref(0)

  // 歌词回弹防抖
  const debounceRef = (value, time) => {
    let timer = null
    console.log(timer)
    return customRef((track, trigger) => {
      return {
        get() {
          track()
          return value
        },
        set(newValue) {
          console.log(newValue)
          clearTimeout(timer)
          timer = setTimeout(() => {
            value = newValue
            trigger()
          }, time)
        },
      }
    })
  }
  // 是否正在滑动
  // const isSlide = debounceRef(false, 3000)
  const isSlide = ref(false)
 
  watch(
    () => props.currentTime,
    (newCurrentTime) => {
      if (lyrics.value) {
        // parseInt(lyrics.value[key].t) == parseInt(props.currentTime)&&
        for (let key in lyrics.value) {
          // let lyric_row=1;
          // console.log(key)
          if (
            parseFloat(lyrics.value[key].time) <= parseFloat(newCurrentTime)
          ) {
            // console.log(1)
            lyric_row.value = key
            if (!isSlide.value) {
              if (lyric_row.value > 3) {
                lyric_top.value = 0 - 41 * (lyric_row.value - 3)
                lyric.value.style.transform = `translateY(${lyric_top.value}px)`
                // lyric_translateY.value=lyric_translateY.value-40 * (key - 6);
                // lyric_top.value=lyric_top.value-40 * (key - 6);
              } else {
                lyric.value.style.transform = `translateY(${0}px)`
              }
            }
            // break
          }
        }
        // }
      }
      // i++;
      // console.log(props.currentTime)
      // console.log(row.value)
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
    lyric_row.value = 0
  })

  // 歌词
  const lyrics = ref(null)
  // 播放歌曲 获取歌词
  const Getlyric = async () => {
    let fin_Array = []
    const res = await getlyric(playingSongInfo.value.id)
    let strLyric = res.lrc.lyric
    // let pattern=/\[\d{2}:\d{2}\.\d{2}\]/g
    let pattern = /.*\n/g
    let arrLyric = strLyric.split('\n')
    arrLyric.pop()
    let Time = []
    for (let i in arrLyric) {
      // arrLyric[i].replace(/[\\n]/g,'')
      // console.log(arrLyric[i])
      // let timePattern=/\[.*\]/g
      //  Time[i] = arrLyric[i].split(/\]/)
      //  Time[i][0]=Time[i][0].replace(/[\[\]]/g,"")
      //  Time[i][0]=Number((Time[i][0].split(":")[0]*60+parseFloat(Time[i][0].split(":")[1])).toFixed(3))

      let t = arrLyric[i].substring(
        arrLyric[i].indexOf('[') + 1,
        arrLyric[i].indexOf(']')
      )
      fin_Array.push({
        time: (t.split(':')[0] * 60 + parseFloat(t.split(':')[1])).toFixed(3),
        content: arrLyric[i].substring(
          arrLyric[i].indexOf(']') + 1,
          arrLyric[i].length
        ),
      })
    }
    // medisArray.splice(0, 0, { content: props.songName, time: '0.000' })
    fin_Array.forEach((item, i) => {
      if (i == fin_Array.length - 1) {
        item.next = null
      } else {
        item.next = fin_Array[i + 1].time
      }
      item.active = ''
      // 去除空句
      if(item.content==''){
        fin_Array.splice(i,1)
      }
    })
    console.log(props.durationTime)
    console.log(arrLyric)
    console.log(fin_Array)
    lyrics.value = fin_Array
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
      overflow: hidden;
      // overflow: scroll;
    }

    .lyricBack:hover {
      transform: rotate(-90deg);
    }
    .lyric {
      // margin: 100px auto;
      width: 100%;
      text-align: center;
      overflow: hidden;
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
