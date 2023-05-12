<template>
  <div>
    <!-- 骨架 -->
    <el-skeleton :loading="loading" animated>
      <template #template>
        <el-skeleton-item
          variant="image"
          style="width: 150px; height: 150px; margin-left: 20px" />
        <div style="padding: 14px">
          <el-skeleton-item variant="text" style="width: 40%" />
          <el-skeleton-item
            variant="text"
            style="width: 70%; margin-right: 16px" />
          <el-skeleton-item variant="text" style="width: 20%" />
        </div>
      </template>
      <template #default>
        <div class="recentplay_contrainer">
          <div class="recentplay_header mtop-20">
            <div class="recentplay_header_top">
              <span class="font-24 font-bold">最近播放</span>
              <span class="font-14 mleft-10">共 {{ total }} 首</span>
            </div>
            <div>
              <p></p>
              清除列表
            </div>
          </div>
          <button class="btn btn-red pd-10 start_btn" @click="playAllPlayList">
            <!-- <i class="fa fa-play" aria-hidden="true"></i> -->
            <span class="iconfont icon-play"></span>

            <span>播放全部</span>
          </button>
          <div class="line mtop-10"></div>
          <div class="RecentPlay_container">
            <div class="content-wrapper">
              <songList :tracks="recentPlaySong" />
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup>
  import { reactive, toRefs, ref, onMounted } from 'vue'
  import { getRecentPlaySong } from '@/Api/api_song'
  import { useStore } from 'vuex'
  import songList from '@/components/songList/songList'

  const loading = ref(true)

  const store = useStore()

  onMounted(() => {
    GetRecentPlaySong()
  })

  const recentPlaySong = ref([])

  const total = ref(0)

  const GetRecentPlaySong = async () => {
    loading.value = true
    const res = await getRecentPlaySong()
    if (res.code !== 200) return
    console.log(res)
    total.value = res.data.total
    recentPlaySong.value = res.data.list.map((item) => item.data)
    // console.log(recentPlaySong.value)
    loading.value = false
  }

  // 播放全部
  const playAllPlayList = () => {
    store.commit('setPlaylists', recentPlaySong.value)
    store.commit('setPlayingSongIndex', 0)
    // store.commit('setSongUrl', res.data[0].url)
    store.commit('setCurrentSongId')
    store.commit('setPlayType','Normal')
  }
</script>
<style scoped lang="less">
  .recentplay_contrainer {
    margin: 0 auto;
    width: 90%;
    max-width: 1200px;
    .start_btn {
      margin: 10px 0;
    }
  }
  .recentplay_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .recentplay_header_top {
    }
  }
</style>
