<template>
  <div class="mv-wrapper mtop-20">
    <ul
      v-infinite-scroll="load"
      :infinite-scroll-disabled="disabled || !isFinite"
      infinite-scroll-distance="5">
      <li
        v-for="item in props.MvData"
        :key="item.id"
        @click="enterMvPage(item.id)">
        <div class="mv-border">
          <img
            style="border-radius: 7px"
            v-lazy="`${item.cover||item.imgurl}?param=260y140`"
            alt="" />
          <span class="playcount font-12">
            <span class="iconfont icon-play card-play"></span>
            {{ useCountFormate(item.playCount) }}
          </span>
          <span class="playBtn pointer">
            <i class="fa fa-play-circle fa-3x" aria-hidden="true"></i>
          </span>
        </div>
        <div class="text-hidden font-14" style="width: 260px">
          {{ item.name }}
        </div>
        <div
          class="text-hidden font-12 creatorName mtop-5"
          style="width: 260px; color: #adadad">
          by{{ item.artistName }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { watch } from 'vue'
  import { useCountFormate } from '@/hooks/useFormate'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()

  const props = defineProps({
    MvData: {
      type: Array,
      require: true,
    },
    isFinite: {
      type: Boolean,
      require: true,
    },
    disabled: {
      type: Boolean,
      require: false,
    },
  })

  const emits = defineEmits(['loadMore'])

  watch(
    () => props.MvData,
    () => {
      if (props.MvData.length == 8) {
        emits('loadMore', props.MvData.length)
      }
    }
  )

  const load = () => {
    emits('loadMore', props.MvData.length)
  }

  const enterMvPage = (mvid) => {
    router.push({name:'videoDetial',params:{id:mvid,type:'mv'}})
  }    

</script>
<style scoped lang="less">
  .mv-wrapper {
    ul {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      li {
        margin-bottom: 20px;
        margin-right: 3%;
        width: 22%;
        .mv-border {
          position: relative;
          .playcount {
            position: absolute;
            top: 5px;
            right: 10px;
            color: white;
            display: flex;
            align-items: center;
          }
          .playBtn {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: all 0.5s;
            color: white;
          }
          &:hover .playBtn {
            opacity: 1;
          }
        }
      }
    }
  }
</style>
