<template>
  <div>
    <div class="top pointer" @click="handleGoto">
      <h3>热门推荐</h3>
      <i class="fa fa-angle-right fa-2x mleft-5" aria-hidden="true"></i>
    </div>
    <div class="hot-songs">
      <playlistCard
        v-for="list in cardPlaylists"
        :key="list.id"
        :imgsrc="list.coverImgUrl + '?param=200y200'"
        :title="list.name"
        :playCount="useCountFormate(list.playCount)"
        class="card-song"
        @click="transferPlayList(list.id)" />
    </div>
  </div>
</template>

<script setup>
  import playlistCard from '@/components/card/playlistCard.vue'
  import { getHomeMusicRmd } from '@/Api/api_playList'
  import { useCountFormate } from '@/hooks/useFormate'
  import { toRefs, reactive, onMounted, ref } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  const store = useStore()
  const router = useRouter()

  const data = reactive({
    cardPlaylists: [],
  })

  // 获取歌单信息
  const getMusicRmd = async () => {
    const res = await getHomeMusicRmd()
    // console.log(res);
    // store.commit("setPlayList", res.playlists);
    // cardPlaylists.value = store.state.playlists;
    cardPlaylists.value = res.playlists
    console.log(res)
  }

  // 传入歌单Id获取详情页
  const transferPlayList = (id) => {
    router.push({ name: 'playlistDetail', params: { id } })
  }

  const handleGoto = () => {
    router.push('/playList')
  }
  // 初始化推荐歌单页面
  onMounted(() => {
    getMusicRmd()
  })

  let { cardPlaylists } = toRefs(data)
</script>
<style scoped>
  .top {
    display: flex;
    align-items: center;
    width: fit-content;
  }
  .hot-songs {
    display: flex;
    flex-wrap: wrap;
  }
  .card-song {
    /* flex-basis: 200px; */
    margin-bottom: 30px;
    margin-right: 2%;
  }
</style>
