<template>
  <div>
    <div>
      <div>
        <h3>官方榜</h3>
      </div>
      <div class="display-wrapper">
        <div
          class="display"
          v-for="(officialList, index) in officialLists"
          :key="officialList.id">
          <div class="top-display">
            <div class="card-border" @click="transferPlayList(officialList.id)">
              <img v-lazy="officialList.coverImgUrl" alt="加载中" />
              <!-- <img :src="props.imgsrc" alt="加载中" /> -->
              <div class="card-count">
                <i class="fa fa-play card-play" aria-hidden="true"></i>
                {{ useCountFormate(officialList.playCount) }}
              </div>
              <div ref="cardBtn" class="card-paly-btn">
                <i class="fa fa-play-circle fa-3x" aria-hidden="true"></i>
              </div>
              <!-- <div class="card-title">{{ officialList.name }}</div> -->
            </div>
            <ul class="display-list mleft-30">
              <li
                v-for="(songObj, songIndex) in officialList.tracks"
                :key="songObj.id"
                class="pd-5 default"
                :style="{
                  'background-color':
                    songIndex % 2 == 0 ? '#f9f9f9' : '#ffffff',
                }"
                @click="getSong(index,songIndex)">
                <span
                  class="mleft-10"
                  :style="{ color: songIndex < 3 ? 'red' : 'black' }"
                  >{{ songIndex + 1 }}</span
                ><span class="mleft-10">{{ songObj.name }}</span
                ><span class="song-author mright-10">{{
                  useSingersFormate(songObj)
                }}</span>
              </li>
              <div
                class="mleft-15 mtop-10 pointer"
                @click="transferPlayList(officialList.id)">
                查看全部
                <span class="iconfont icon-you"></span>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <h3>其他榜</h3>
        <div class="Toplists-wrapper">
          <playlistCard
            v-for="Toplist in Toplists"
            :key="Toplist.id"
            :imgsrc="Toplist.coverImgUrl"
            :title="Toplist.name"
            :playCount="useCountFormate(Toplist.playCount)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive, toRefs, ref, onMounted } from 'vue'
  import { getToplist, getPlaylistDetail } from '@/Api/api_playList'
  import playlistCard from '@/components/card/playlistCard.vue'
  import { useCountFormate, useSingersFormate } from '@/hooks/useFormate'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  onMounted(() => {
    GetToplist()
  })
  const router = useRouter()
  const store = useStore()
  // 其他榜
  const Toplists = ref([])
  // 官方榜
  const officialLists = ref([])
  // 官方榜Id
  const officialListsId = ref([])
  // 查询对象
  const queryPlayList = reactive({
    id: '',
    s: 8,
  })
  const GetToplist = async () => {
    const res = await getToplist()
    // console.log(res)
    res.list.slice(0, 4).forEach((item) => {
      officialListsId.value.push(item.id)
    })
    Toplists.value = res.list.slice(4)
    officialListsId.value.forEach((item) => {
      queryPlayList.id = item
      // console.log(item.id)
      GetPlaylistDetail()
    })
  }
  // 查询音乐歌单详情
  const GetPlaylistDetail = async () => {
    const res = await getPlaylistDetail(queryPlayList)
    // console.log(res.playlist.tracks.slice(0, 5))
    console.log(res)
    res.playlist.tracks = res.playlist.tracks.slice(0, 5)
    officialLists.value.push(res.playlist)
  }

  const getSong = (index,songIndex) => {
    store.commit('setPlaylists', officialLists.value[index].tracks)
    store.commit('setPlayingSongIndex', songIndex)
    // store.commit('setSongUrl', res.data[0].url)
    store.commit('setCurrentSongId')
    console.log(window.sessionStorage.getItem('isLogin'))
  }

  // 传入歌单Id获取详情页
  const transferPlayList = (id) => {
    router.push({ name: 'playlistcardDetail', params: { id } })
  }
</script>
<style scoped lang="less">
  .display {
    // margin-bottom: 30px;
    // margin-right: 2%;
    margin: 10px 0 20px 0;
    // position: relative;
  }
  .card-border {
    display: flex;
    flex-direction: column;
    width: 168px;
    overflow: hidden;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.5s;
    position: relative;
  }
  /* .card-border:hover {
    transform: scale(1.01);
  } */
  .card-img {
    width: 150px;
  }
  img {
    border-radius: 4px;
  }
  .card-count {
    display: flex;
    align-items: center;
    position: absolute;
    color: white;
    right: 10px;
    top: 5px;
    text-shadow: 0 0 2px #000;
    font-size: 12px;
  }
  .card-play {
    margin-right: 2px;
  }
  .card-paly-btn {
    position: absolute;
    color: white;
    transition: all 0.8s;
    opacity: 0;
    // right: 10px;
    // bottom: 30px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .card-paly-btn:hover {
    transform: translate(-50%, -50%) scale(1.2);
  }
  .card-border:hover .card-paly-btn {
    opacity: 1;
  }
  .card-title {
    height: 20px;
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transform: translate3d(0, 0, 0);
  }

  .display-wrapper {
    // display: flex;
    // flex-direction: column;
    .top-display {
      display: flex;
    }
    .display-list {
      flex-grow: 1;
      list-style: none;
      font-size: 15px;
      li:hover {
        background-color: #dededec1 !important;
      }
      .song-author {
        float: right;
        color: #cbcbcb;
      }
    }
  }
  .Toplists-wrapper {
    display: flex;
    flex-wrap: wrap;
  }
</style>
