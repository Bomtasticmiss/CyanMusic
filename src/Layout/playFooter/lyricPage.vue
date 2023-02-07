<template>
  <div class="lyricWrapper" v-show="lyricShow">
    <div class="lyric-container">
      <div class="lyricBack pointer" @click="cnacel">
        <i class="fa fa-times fa-lg" aria-hidden="true"></i>
      </div>
      <div class="lyriCoverPage">
        <div class="cover">
          <img v-if="playingSongInfo" :src="playingSongInfo.al.picUrl" alt="" />
        </div>
      </div>
      <div class="lyricAuto">
        <div class="lyric" ref="lyric" @mousedown="sliding">
          <div
            v-for="(lyric, index) in lyrics"
            :key="index"
            class="lineLyric"
            :class="{ active: isActivefn(index), lyricName: index == 0 }">
            {{ lyric.c }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {
    reactive,
    toRefs,
    ref,
    createVNode,
    render,
    onMounted,
    computed,
    watch,
    nextTick,
  } from 'vue'
  import { getlyric } from '@/Api/musicHomeList'

  import { useStore } from 'vuex'
  const props = defineProps(['currentTime', 'songName'])

  const store = useStore()

  //   const lyricShow=ref(true)

  // 活动歌词
  const isActivefn = (index) => {
    if(!lyrics.value[index-1])return;
    return (
      Number(lyrics.value[index-1].t) <= Number(props.currentTime) &&
      Number(props.currentTime) < Number(lyrics.value[index].t)
    )
  }
  const lyric = ref()
  const lyricIndex = ref(0)
  // 歌词滑动顶部距离
  const lyric_top = ref(0)
  // 是否正在滑动
  const isSlide = ref(false)
  watch(
    () => props.currentTime,
    () => {
      // if (row.value === lyrics.value.length - 1) return
      // if(props.currentTime===lyrics.value[row.value+1].t){
      //   moveLyric()
      // }
      // let i=0
      if(props.currentTime==0){
        nextTick(()=>{
          lyric.value.style.transform = `translateY(${0}px)`
        })
      }
      for (let key in lyrics.value) {
        // console.log(lyrics.value[key].t)
        // if (key === lyrics.value.length - 1) break;
        if (
          parseInt(lyrics.value[key].t) == parseInt(props.currentTime) &&
          isSlide.value == false
        ) {
          // moveLyric()
          lyricIndex.value = key
          // console.log(lyrics.value[key].t)
          if (key > 6) {
           
              lyric_top.value = 0 - 40 * (key - 6)
              lyric.value.style.transform = `translateY(${lyric_top.value}px)`
           

            // lyric_translateY.value=lyric_translateY.value-40 * (key - 6);
            // lyric_top.value=lyric_top.value-40 * (key - 6);
          }
        }
      }
      // i++;

      // console.log(props.currentTime)
      // console.log(row.value)
    }
  )
  const cnacel = () => {
    lyricShow.value = false
  }
  const lyricShow = computed({
    get() {
      return store.state.lyricPage
    },
    set() {
      store.commit('changeLyricShow')
    },
  })
  // 正在播放的歌曲信息
  const playingSongInfo = computed(() => {
    return store.getters.playingSongInfo
  })
  // 歌词
  const lyrics = ref(null)
  // 播放歌曲 获取歌词
  const Getlyric = async () => {
    let medisArray = []
    const res = await getlyric(playingSongInfo.value.id)
    // console.log(res.lrc.lyric)
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

      var t = arrLyric[i].substring(
        arrLyric[i].indexOf('[') + 1,
        arrLyric[i].indexOf(']')
      )
      medisArray.push({
        t: (t.split(':')[0] * 60 + parseFloat(t.split(':')[1])).toFixed(3),
        c: arrLyric[i].substring(
          arrLyric[i].indexOf(']') + 1,
          arrLyric[i].length
        ),
      })
    }
    medisArray.splice(0, 0, { c: props.songName })
    console.log(Time)
    console.log(arrLyric)
    console.log(medisArray)
    lyrics.value = medisArray
  }

  watch([lyricShow, playingSongInfo], () => {
    if (lyricShow.value) {
      Getlyric()
    }
  })

  // 歌词拖拽
  const sliding = (e) => {
    isSlide.value = true
    // 拖拽时禁止鼠标在滑块时的默认行为
    e.preventDefault && e.preventDefault()
    let head = e.pageY
    // console.log(head)
    let tail = null
    let slide = (e) => {
      tail = e.pageY
      console.log(tail)
      let UpDown = head - tail
      // console.log(head)
      head = tail
      //鼠标上移
      if (UpDown > 0) {
        console.log('上移', UpDown)
        // lyric_top.value=lyric_top.value-1;
        lyric_top.value -= 4
        nextTick(() => {
          lyric.value.style.transform = `translateY(${lyric_top.value}px)`
        })
      }
      // 鼠标下移
      if (UpDown < 0) {
        if (lyric_top.value == 0) {
          return
        }
        console.log('下移', UpDown)
        // lyric_top.value=lyric_top.value+1;
        lyric_top.value += 4
        nextTick(() => {
          lyric.value.style.transform = `translateY(${lyric_top.value}px)`
        })
      }
      // console.log(e.pageY)
    }
    // 鼠标弹起
    const Mouseup = () => {
      setTimeout(()=>{
        isSlide.value = false;
      },3000)
      // isMove.value = false
      document.removeEventListener('mousemove', slide)
      // 按钮只按下没有移动
      // if (!moved) return
      // updateProgress(moved)
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
    font-size: 20px;
  }
  .lyricWrapper {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 1000;
    background-color: #e1e1e1f8;
    .lyric-container {
      position: relative;
      display: flex;
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
      // border: 1px solid black;
      // width: 200px;
      height: 700px;
      flex-basis: 35%;
      justify-content: end;
      align-items: center;
      .cover {
        border-radius: 50%;
        overflow: hidden;
        // border: 1px solid black;
        width: 300px;
        height: 300px;
        margin: 50px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .lyricAuto {
      width: 600px;
      margin: auto;
      margin-left: 100px;
      // flex-basis: 60%;
      height: 500px;
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
      .lyricName {
        font-size: 28px;
      }
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
  }
</style>
