<template>
  <div class="lyricWrapper" v-if="lyricShow">
  <div class="lyric" >
    <div class="lyricBack pointer" @click="cnacel"><i class="fa fa-times" aria-hidden="true"></i></div>
    <div>歌词</div>
  </div>
</div>
</template>

<script setup>
import {reactive,toRefs,ref,createVNode,render,onMounted,computed} from 'vue'
import {getlyric} from '@/Api/api_song

import { useStore } from 'vuex'
const store=useStore()

const lyricShow=ref(true)

const cnacel=()=>{
    lyricShow.value=false
}

const playingSongInfo = computed(() => {
    return store.getters.playingSongInfo
  })

const Getlyric=async()=>{
  const res=await getlyric(playingSongInfo.value.id)
  console.log(res)
}
onMounted(() => {
  Getlyric()
})
</script>
<style lang="less" scoped>
.lyricWrapper {
    position: fixed;
    // position: absolute;
    // right:0px;
    width: 100%;
    top: 0;
    height: 100%;
    z-index: 1000;
    background-color: #e1e1e1bf;
    .lyricBack{
        position: absolute;
        right: 110px;
        top: 20px;
        transition: all .5s;
    }
    .lyricBack:hover{
      transform:rotate(-90deg)
    }
    .lyric{
        margin: 160px auto;
        width: 600px;
    }
  }
</style>