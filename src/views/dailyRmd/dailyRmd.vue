<template>
  <div class="dailyRmd-wrapper mtop-20">
    <div class="header">
      <div class="calendar">
        <div class="date">{{ date }}</div>
      </div>
      <div class="mleft-20">
        <div class="font-bold font-22">每日歌曲推荐</div>
        <div class="mtop-5 min-color font-12">
          根据你的音乐口味生成，每天6:00更新
        </div>
        <div class="mtop-10">
          <span
            class="font-12 mright-10 author-color tags"
            v-for="item in recommendReasons"
            :key="item.songId">
            {{ item.reason }}
          </span>
        </div>
      </div>
    </div>
    <div class="mtop-20">
      <button class="btn btn-red pd-10" @click="playAllPlayList">
        <span class="iconfont icon-play"></span>
        <span>播放全部</span>
      </button>
      <button class="btn btn-white pd-10 mleft-10">
        <span class="iconfont icon-shoucangwenjianjia"></span>
        <span>收藏全部</span>
      </button>
    </div>
    <div class="line mtop-10"></div>
    <songList :tracks="dailySongs" />
  </div>
</template>

<script setup>
  import { reactive, ref, onMounted, computed } from 'vue'
  import { getRecommendSongs } from '@/Api/api_song'
  import songList from '@/components/songList/songList.vue'
  import { useStore } from 'vuex'

  const store = useStore()

  onMounted(() => {
    GetRecommendSongs()
  })

  const date = computed(() => {
    let date = new Date()
    return date.getDate()
  })

  const dailySongs = ref([])

  const recommendReasons = ref([])

  const GetRecommendSongs = async () => {
    const res = await getRecommendSongs()
    console.log(res)
    if (res.code !== 200) return
    dailySongs.value = Object.freeze(res.data.dailySongs)
    recommendReasons.value = res.data.recommendReasons
  }

  // 播放全部
  const playAllPlayList = () => {
    store.commit('setPlaylists', dailySongs.value)
    store.commit('setPlayingSongIndex', 0)
    // store.commit('setSongUrl', res.data[0].url)
    store.commit('setCurrentSongId')
  }
</script>
<style scoped lang="less">
  .dailyRmd-wrapper {
    .header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .calendar {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100px;
        width: 110px;
        background: url('@/assets/img/calendar.png') 0 0/100% no-repeat;
        .date {
          margin-top: 10px;
          color: rgb(222, 53, 53);
          font-size: 40px;
          font-weight: 600;
        }
      }
      .tags {
        background-color: #efefef;
        border-radius: 20px;
        padding: 3px 10px;
      }
    }
  }
</style>
