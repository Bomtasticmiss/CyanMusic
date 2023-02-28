<template>
  <div>
    <div>
      <tabMenu :menuList="topMenus" pattern='router' />
    </div>
    <div>
      <h3>热门推荐</h3>
      <div class="hot-songs">
        <playlistCard
          v-for="list in cardPlaylists"
          :key="list.id"
          :imgsrc="list.coverImgUrl + '?param=200y200'"
          :title="list.name"
          :playCount="
            list.playCount > 10000
              ? Math.floor(list.playCount / 10000) + '万'
              : list.playCount
          "
          class="card-song"
          @click="transferPlayList(list.id)" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import playlistCard from './playlistCard.vue'
  import tabMenu from '@/components/menus/tabMenu.vue'
  import { getHomeMusicRmd } from '@/Api/api_musicHomeList'
  import { toRefs, reactive, onMounted, ref } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  const store = useStore()
  const router = useRouter()

  const topMenus = ref([
    { title: '个性推荐', router: '/homeRmd' },
    { title: '歌单', router: '/songMenus' },
    { title: '排行榜', router: '/songRank' },
    { title: '歌手', router: '/singers' },
    { title: '新歌速递', router: '/newSongRmd' },
  ])

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
    router.push({ name: 'playlistcardDetail', params: { id } })
  }
  // 初始化推荐歌单页面
  onMounted(() => {
    getMusicRmd()
  })

  let { cardPlaylists } = toRefs(data)
</script>
<style scoped>
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
