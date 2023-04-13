<template>
  <div class="fm-wrapper">
    <div class="fm-left">
      <div></div>
      <div class="btn-wrapper">
        <button class="circle ">
          <span class="iconfont icon-xihuan1"></span>
        </button>
        <button class="circle">
          <span class="iconfont icon-delete"></span>
        </button>
        <button class="circle">
          <span class="iconfont icon-iov-next"></span>
        </button>
        <button class="circle">
          <span class="iconfont icon-more"></span>
        </button>
      </div>
    </div>
    <div class="lyric"></div>
  </div>
</template>

<script setup>
  import { reactive, toRefs, onMounted } from 'vue'
  import { getPersonal_fm, rubbish } from '@/Api/api_FM.js'

  onMounted(() => {
    GetPersonal_fm()
  })
  const GetPersonal_fm = async () => {
    const res = await getPersonal_fm()
    console.log(res)
  }
</script>
<style scoped lang="less">
  .fm-wrapper {
    display: flex;
    justify-content: center;
    .fm-left {
      width: 260px;
      .btn-wrapper {
        display: flex;
        justify-content: space-between;
        .circle {
          border-radius: 50%;
          background-color: white;
          border: 1px solid #a2a2a2;
          width: 42px;
          height: 42px;
          cursor: pointer;
          color: #8c8c8c;
        }
      }
    }
  }
</style>
