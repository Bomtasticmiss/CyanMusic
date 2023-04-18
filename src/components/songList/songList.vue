<template>
  <div class="content-wrapper">
    <el-table
      :data="tracks"
      stripe
      style="width: 100%"
      size="small"
      @row-dblclick="GetSong"
      :row-class-name="RowClassName"
      empty-text="当前暂无音乐">
      <el-table-column type="index" width="50px" class-name="default">
        <template #default="scope">
          <span
            v-if="showPlaying(scope.row.id)"
            class="iconfont icon-shengyin-kai"
            style="color: red"></span>
        </template>
      </el-table-column>
      <el-table-column width="35px" class-name="pointer">
        <template #default="scope">
          <span
            class="iconfont icon-xihuan"
            @click="SetLike(scope.row)"
            v-if="!isLike(scope.row)"></span>
          <span
            class="iconfont icon-xihuan2"
            style="color: red"
            @click="CancelLike(scope.row)"
            v-if="isLike(scope.row)"></span>
          <!-- <i
                    class="fa fa-heart-o"
                    aria-hidden="true"
                    ></i> -->
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="音乐"
        class-name="default"
        show-overflow-tooltip />
      <el-table-column
        label="歌手"
        :formatter="SingersFormate"
        show-overflow-tooltip
        class-name="pointer" />
      <el-table-column
        prop="al.name"
        label="专辑名"
        class-name="pointer"
        show-overflow-tooltip />
      <el-table-column
        label="时长"
        width="100px"
        :formatter="timeFormate"
        class-name="default" />
    </el-table>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  import { useSingersFormate, useTimeFormate } from '@/hooks/useFormate'

  const store = useStore()
  const props = defineProps(['tracks'])

  // 添加索引
  const RowClassName = ({ row, rowIndex }) => {
    row.index = rowIndex
  }

  //   const { getSongUrl } = useGetSong()
  // 获取音乐数据
  const GetSong = async (row) => {
    // const songUrl = await getSongUrl(row.id)
    // const res=await getSong(row.id)
    // if(res.code!==200)return
    // if(!res.data[0].url) return ElMessage({ message: '音乐资源不存在', type: 'error' })
    // console.log(songUrl)
    store.commit('setPlaylists', props.tracks)
    store.commit('setPlayingSongIndex', row.index)
    // store.commit('setSongUrl', res.data[0].url)
    store.commit('setCurrentSongId')
    store.commit('setPlayType','Normal')

  }

  // 正在播放图标
  const showPlaying = (id) => {
    // console.log(index)
    return currentSongId.value == id
  }

  const currentSongId = computed(() => {
    return store.state.currentSongId
  })

  const isLike = (row) => {
    return store.state.likeIdList.indexOf(row.id) != -1
  }

  // 喜欢歌曲
  const SetLike = async (row) => {
    if (!store.state.isLogin)
      return ElMessage({ message: '请先登录', type: 'wran' })
    store.dispatch('SetLike', { type: 'unshift', id: row.id })
  }
  // 取消喜欢歌曲
  const CancelLike = async (row) => {
    if (!store.state.isLogin)
      return ElMessage({ message: '请先登录', type: 'wran' })
    store.dispatch('SetLike', { type: 'delete', id: row.id })
  }

  // 格式化音乐演唱歌手
  const SingersFormate = (row) => {
    // console.log(row)
    return useSingersFormate(row)
  }
  // 格式化时间
  const timeFormate = (row) => {
    return useTimeFormate(row.dt / 1000)
  }
</script>
<style scoped lang="less">
  .content-wrapper {
    display: flex;
    flex-direction: column;
  }
</style>
