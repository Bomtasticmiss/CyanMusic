<template>
  <div class="lyricWrapper" v-if="lyricShow">
    <div class="lyricAuto">
      <div class="lyric">
        <div class="lyricBack pointer" @click="cnacel">
          <i class="fa fa-times" aria-hidden="true"></i>
        </div>
        <div
          v-for="(lyric, index) in lyrics"
          :key="index"
          class="lineLyric"
          :class="{ active: isActivefn(index) }">
          {{ lyric.c }}
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
  } from 'vue'
  import { getlyric } from '@/Api/musicHomeList'

  import { useStore } from 'vuex'
  const props = defineProps(['currentTime'])

  const store = useStore()

  //   const lyricShow=ref(true)
  const lyrics = ref(null)

  const isActivefn = (index) => {
    if(index===lyrics.value.length-1)return false
    return lyrics.value[index].t <= props.currentTime &&props.currentTime < lyrics.value[index + 1].t
  }
  
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
  const playingSongInfo = computed(() => {
    return store.getters.playingSongInfo
  })

  const Getlyric = async () => {
    let medisArray = []
    const res = await getlyric(playingSongInfo.value.id)
    // console.log(res.lrc.lyric)
    let strLyric = res.lrc.lyric
    // let pattern=/\[\d{2}:\d{2}\.\d{2}\]/g
    let pattern = /.*\n/g
    let arrLyric = strLyric.split('\n')
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
        t: Number(
          (t.split(':')[0] * 60 + parseFloat(t.split(':')[1])).toFixed(3)
        ),
        c: arrLyric[i].substring(
          arrLyric[i].indexOf(']') + 1,
          arrLyric[i].length
        ),
      })
    }
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
</script>
<style lang="less">
  .active {
    color: rgb(255, 0, 93);
  }
  .lyricWrapper {
    position: fixed;
    width: 100%;
    top: 0;
    height: 100%;
    z-index: 1000;
    background-color: #e1e1e1bf;
    .lyricAuto {
      height: 100%;
      overflow: scroll;
    }
    .lyricBack {
      position: absolute;
      right: 110px;
      top: 20px;
      transition: all 0.5s;
    }
    .lyricBack:hover {
      transform: rotate(-90deg);
    }
    .lyric {
      margin: 100px auto;
      width: 600px;
      text-align: center;
      .lineLyric {
        padding: 10px 0;
      }
    }
  }
</style>
