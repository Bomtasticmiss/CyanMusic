<template>
  <div class="video-list mtop-20">
    <ul
      v-infinite-scroll="load"
      :infinite-scroll-disabled="disabled"
      infinite-scroll-distance="5">
      <li
        v-for="item in videoData"
        :key="item.data?item.data.vid:item.vid"
        @click="toVideoDetail(item.data?item.data.vid:item.vid)">
        <div class="video-border">
          <!-- <img
            style="border-radius: 7px"
            v-lazy="`${item.data.coverUrl}?param=250y160`"
            alt="" /> -->
          <slot name="img" :item="item"></slot>
          <span class="playcount font-12">
            <span class="iconfont icon-play card-play"></span>
            <slot name="playcount" :item="item"></slot>
          </span>
          <span class="playBtn pointer">
            <i class="fa fa-play-circle fa-3x" aria-hidden="true"></i>
          </span>
        </div>
        <div class="text-hidden font-14">
          <slot name="title" :item="item"></slot>
        </div>
        <div class="text-hidden font-12 creatorName" >
          <slot name="nickname" :item="item"></slot>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import {  watch } from 'vue'
  import { useCountFormate } from '@/hooks/useFormate'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const props = defineProps({
    videoData: {
      type: Array,
      require: true,
    },
    disabled: {
      type: Boolean,
      default: true,
    },
  })

  const emits = defineEmits(['loadMore'])

  watch(
    () => props.videoData,
    () => {
      if (props.videoData.length == 8) {
        emits('loadMore', props.videoData.length)
        console.log(1)
      }
    }
  )
  const load = () => {
    emits('loadMore', props.videoData.length)
  }

  const toVideoDetail = (vid) => {
    router.push({ name: 'videoDetial', params: { id: vid, type: 'video' } })
  }
</script>
<style scoped lang="less">
  // /deep/ .el-image__wrapper {
  //   position: relative !important;
  //   // height: 100% !important;
  // }
  // /deep/ .el-image {
  //   overflow: visible;
  // }
  .video-list {
    ul {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      li {
        margin-bottom: 20px;
        margin-left: 1%;
        margin-right: 2%;
        width: 22%;
        .video-border {
          position: relative;

          img {
            width: 100%;
            // max-height: 160px;
          }
          .playcount {
            position: absolute;
            top: 10px;
            right: 6px;
            color: white;
            display: flex;
            align-items: center;
          }
          .playBtn {
            color: white;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: all 0.4s;
            &:hover {
              transform: translate(-50%, -50%) scale(1.1);
            }
          }
          &:hover .playBtn {
            opacity: 1;
          }
        }
        .creatorName {
          color: #adadad;
          margin-top: 5px;
        }
      }
    }
  }
</style>
