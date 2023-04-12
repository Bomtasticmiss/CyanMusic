<template>
  <div class="mbtm-20">
    <div class="album-list">
      <div class="album-img mright-20 pointer">
        <img :src="albumInfo.picUrl + '?param=200y200'" alt="" />
      </div>
      <div class="album-songs mleft-20">
        <div class="top-btn">
          <h3 class="mright-20 pointer">{{ albumInfo.name }}</h3>
          <div class="mright-20 pointer">
            <span class="iconfont icon-play2" style="font-size: 20px"></span>
          </div>
          <div class="pointer">
            <span
              class="iconfont icon-xinjianwenjianjia"
              style="font-size: 22px"></span>
          </div>
        </div>
        <div>
          <tableList
            is-index="true"
            :data="songs"
            :t-default="5"
            :t-name="85"
            :t-playcount="5"
            @rowClick="playMusic">
            <template #t-index="{item}">
              <span
                v-if="showPlaying(item.id)"
                class="iconfont icon-shengyin-kai"
                style="color: red"></span>
            </template>
            <template #default="{ item }">
              <span class="pointer">
                <span
                  class="iconfont icon-xihuan"
                  @click="SetLike($event, item)"
                  v-if="!isLike(item)"></span>
                <span
                  class="iconfont icon-xihuan2"
                  style="color: red"
                  @click="CancelLike($event, item)"
                  v-if="isLike(item)"></span>
              </span>
            </template>
            <template #t-name="{ item }">
              <span class="font-16 black-color">{{ item.name }}</span>
            </template>
            <template #t-playcount="{ item }">
              <span class="font-16">{{ useTimeFormate(item.dt / 1000) }}</span>
            </template>
          </tableList>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive, toRefs, onMounted, ref, computed } from 'vue'
  import tableList from '@/components/tableList/tableList.vue'
  import { useTimeFormate } from '@/hooks/useFormate'
  import { useStore } from 'vuex'

  const store = useStore()
  const props = defineProps(['songs', 'albumInfo'])

  const playMusic = (item, index) => {
    store.commit('setPlaylists', props.songs)
    store.commit('setPlayingSongIndex', index)
    store.commit('setCurrentSongId')
  }

  // 正在播放图标
  const showPlaying = (id) => {
    // console.log(index)
    return currentSongId.value == id
  }

  const currentSongId = computed(() => {
    return store.state.currentSongId
  })

  const isLike = (item) => {
    return store.state.likeIdList.indexOf(item.id) != -1
  }

  // 喜欢歌曲
  const SetLike = async (e, item) => {
    if (!store.state.isLogin)
      return ElMessage({ message: '请先登录', type: 'wran' })
    store.dispatch('SetLike', { type: 'unshift', id: item.id })
    e.stopPropagation()
  }
  // 取消喜欢歌曲
  const CancelLike = async (e, item) => {
    if (!store.state.isLogin)
      return ElMessage({ message: '请先登录', type: 'wran' })
    store.dispatch('SetLike', { type: 'delete', id: item.id })
    e.stopPropagation()
  }
</script>
<style scoped lang="less">
  .album-list {
    display: flex;
    .album-img {
      img {
        border-radius: 8px;
      }
    }
    .album-songs {
      display: flex;
      flex-direction: column;
      width: 100%;
      .top-btn {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }
  }
</style>
