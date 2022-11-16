<template>
  <div class="lyric">歌词
    <div class="lyricBack" @click="cnacel"><i class="fa fa-times" aria-hidden="true"></i></div>
  </div>
</template>

<script setup>
import {reactive,toRefs,createVNode,render} from 'vue'

const cnacel=()=>{
    // render(null,div)
    // unMounted()
}
</script>
<style lang="less">
.lyricWrapper {
    position: fixed;
    width: 100%;
    top: 0;
    height: 100%;
    z-index: 1000;
    background-color: #e1e1e1bf;
    .lyricBack{
        position: absolute;
        right: 110px;
        top: 20px;
    }
    .lyric{
        margin: 160px auto;
        width: 600px;
    }
  }
</style>