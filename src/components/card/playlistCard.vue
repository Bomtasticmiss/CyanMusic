<template>
  <div class="card-wrapper">
    <div class="card-border" ref="card">
      <img v-lazy="`${props.imgsrc}?param=200y200`" alt="加载中" />
      <!-- <img :src="props.imgsrc" alt="加载中" /> -->
      <div class="card-count">
        <i class="fa fa-play card-play" aria-hidden="true"></i>
        {{ props.playCount }}
      </div>
      <div class="card-paly-btn">
        <i class="fa fa-play-circle fa-2x" aria-hidden="true"></i>
      </div>
      <div class="card-title text-hidden">{{ props.title }}</div>
    </div>
  </div>
  <!-- <el-Card/> -->
</template>

<script setup>
  import { ref, toRefs, computed } from 'vue'
  const props = defineProps(['imgsrc', 'title', 'playCount'])

  const isShowBtn = ref(false)
</script>
<style scoped>
  .card-wrapper {
    margin-bottom: 30px;
    margin-right: 2%;
    width: 14%;
    position: relative;

  }
  .card-border {
    display: flex;
    flex-direction: column;
    /* width: 168px; */
    overflow: hidden;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.5s;
  }
  /* .card-border:hover {
    transform: scale(1.01);
  } */
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
    transition: all 0.8s;
    opacity: 0;
    right: 10px;
    bottom: 30px;
  }
  .card-paly-btn:hover {
    transform: scale(1.2);
  }

  .card-border:hover .card-paly-btn {
    opacity: 1;
  }
  .card-title {
    height: 20px;
    /* width: 150px; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transform: translate3d(0, 0, 0);
  }
</style>
