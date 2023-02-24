<template>
  <div style="position: relative">
    <div
      class="card-border"
      ref="card"
      @mouseenter="showBtn"
      @mouseleave="hiddenBtn">
      <img v-lazy="props.imgsrc" alt="加载中" />
      <!-- <img :src="props.imgsrc" alt="加载中" /> -->
      <div class="card-count">
        <i class="fa fa-play card-play" aria-hidden="true"></i>
        {{ props.playCount }}
      </div>
      <div class="card-paly-btn" ref="btn">
        <i class="fa fa-play-circle fa-2x" aria-hidden="true"></i>
      </div>
      <div class="card-title">{{ props.title }}</div>
    </div>
  </div>
  <!-- <el-Card/> -->
</template>

<script setup>
  import { ref, reactive, toRefs, nextTick } from 'vue'
  const btn = ref()
  const props = defineProps(['imgsrc', 'title', 'playCount'])

  const showBtn = () => {
    nextTick(() => {
      btn.value.style.opacity = 1
    })
  }

  const hiddenBtn = () => {
    nextTick(() => {
      btn.value.style.opacity = 0
    })
  }
</script>
<style scoped>
  .card-border {
    display: flex;
    flex-direction: column;
    width: 150px;
    overflow: hidden;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.5s;
  }
  .card-border:hover {
    transform: scale(1.05);
  }
  .card-img {
    width: 150px;
  }
  img {
    border-radius: 4px;
  }
  .card-count {
    display: flex;
    align-items: center;
    position: absolute;
    color: white;
    right: 10px;
    top: 5px;
    text-shadow: 0 0 2px #000;
    font-size: 12px;
  }
  .card-play {
    margin-right: 2px;
  }
  .card-paly-btn {
    position: absolute;
    color: white;
    transition: all 0.5s;
    opacity: 0;
    right: 10px;
    bottom: 20px;
  }
  .card-paly-btn:hover {
    transform: scale(1.2);
  }
  .card-title {
    height: 20px;
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transform: translate3d(0, 0, 0);
  }
</style>
