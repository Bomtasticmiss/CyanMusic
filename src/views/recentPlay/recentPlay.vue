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
          <div class="recentplay_header">
            <div class="recentplay_header_top">
              <span class="font-24 font-bold">最近播放</span>
              <span class="font-14 mleft-10">共---首</span>
            </div>
            <div>
              <p></p>
              清除列表
            </div>
          </div>
          <button class="btn btn-red pd-10 start_btn">
            <i class="fa fa-play" aria-hidden="true"></i>
            <span>播放全部</span>
          </button>
          <div class="RecentPlay_container">
            <div class="content-wrapper">
              <el-table
                :data="recentPlaySong"
                stripe
                style="width: 100%"
                size="small"
                @row-dblclick="GetSong"
                :row-class-name="RowClassName">
                <el-table-column
                  type="index"
                  width="50px"
                  class-name="default" />
                <el-table-column prop="date" width="35px" class-name="pointer">
                  <template #default>
                    <i class="fa fa-heart-o" aria-hidden="true"></i>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="data.name"
                  label="音乐"
                  class-name="default" />

                <!-- :formatter="SingersFormate" -->

                <el-table-column
                  label="歌手"
                  show-overflow-tooltip
                  class-name="pointer" />
                <el-table-column
                  prop="data.al.name"
                  label="专辑名"
                  class-name="pointer"
                  show-overflow-tooltip />

                <!-- :formatter="timeFormate" -->

                <el-table-column
                  label="时长"
                  width="100px"
                  class-name="default" />
              </el-table>
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
  import useGetSong from '@/hooks/useGetSong'
  import { useStore } from 'vuex'

  const loading = ref(true)

  const store = useStore()

  onMounted(() => {
    GetRecentPlaySong()
    setTimeout(() => {
      loading.value = false
    }, 1000)
  })

  const recentPlaySong = ref([])

  const GetRecentPlaySong = async () => {
    const res = await getRecentPlaySong()
    // console.log(res)
    recentPlaySong.value = res.data.list
    console.log(recentPlaySong.value)
  }

  const { getSongUrl } = useGetSong()
  // 获取音乐数据
  const GetSong = async (row) => {
    const songUrl = await getSongUrl(row.id)
    // console.log(songUrl)
    store.commit('setPlayingSongIndex', row.index)
    // store.commit('setSongUrl', songUrl)
    store.commit('setCurrentSongId', row.id)
  }

  // 添加索引
  const RowClassName = ({ row, rowIndex }) => {
    row.index = rowIndex
  }
</script>
<style scoped lang="less">
  .recentplay_contrainer {
    margin: 0 auto;
    width: 90%;
    max-width: 1200px;
    .start_btn{
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
