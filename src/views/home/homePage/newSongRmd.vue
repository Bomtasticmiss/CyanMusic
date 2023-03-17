<template>
  <div>
    <div class="switch-btn-wrapper">
      <button
        class="switch-btn btn"
        @click="
          () => {
            _index = 0
          }
        "
        :class="{ isSwitchActive: _index == 0 }">
        新歌速递
      </button>
      <button
        class="switch-btn btn"
        @click="
          () => {
            _index = 1
            if (monthData.value) return
            GetTopAlbum()
          }
        "
        :class="{ isSwitchActive: _index == 1 }">
        新碟上架
      </button>
    </div>
    <!-- 新歌速递-->
    <div class="newsong-wrapper mtop-20" v-show="_index == 0">
      <div style="display: flex; justify-content: space-between">
        <ul class="category">
          <li
            v-for="item in typeData"
            :key="item.id"
            class="mright-20 font-16 pointer"
            :class="{ 'isActive-btn': item.id == typeQuery._type }"
            @click="handleType(item.id)">
            {{ item.value }}
          </li>
        </ul>
        <div style="display: flex">
          <button class="btn btn-red">播放全部</button>
          <button class="btn btn-white mleft-10">收藏全部</button>
        </div>
      </div>
      <div class="mtop-20 font-14">
        <ul>
          <li
            v-for="(item, index) in topSongData"
            :key="item.id"
            class="song-list"
            :class="{ isBack: index % 2 == 0 }">
            <div style="width: 50px" class="text-hidden">{{ index + 1 }}</div>
            <img
              class="img pointer"
              v-lazy="`${item.album.picUrl}?param=60y60`"
              alt=""
              @dblclick="getSong(index)" />
            <div
              class="song-list-name mleft-10 text-hidden pointer"
              @dblclick="getSong(index)" >
              {{ item.name }}
            </div>
            <div style="width: 150px" class="font-12 text-hidden">
              {{ useSingersFormate(item) }}
            </div>
            <div style="width: 100px" class="font-12 text-hidden">
              {{ item.album.name }}
            </div>
            <div style="width: 100px" class="font-12 text-hidden">
              {{ useTimeFormate(item.duration / 1000) }}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 新碟上架-->
    <div v-show="_index == 1" class="newAlbum-wrapper mtop-20">
      <div style="display: flex; justify-content: space-between">
        <ul class="category">
          <li
            v-for="area in TopAlbumData.area"
            :key="area.tag"
            class="mright-20 font-16 pointer"
            :class="{ 'isActive-btn': area.tag == TopAlbumQuery.area }"
            @click="handleAreaTag(area.tag)">
            {{ area.value }}
          </li>
        </ul>
        <div style="display: flex">
          <button
            class="btn mleft-10"
            v-for="item in TopAlbumData.type"
            :key="item.tag"
            :class="{ isAlbumActive: item.tag == TopAlbumQuery.type }"
            @click="handleAlbumType(item.tag)">
            {{ item.value }}
          </button>
          <!-- <button class="btn">推荐</button>
          <button class="btn mleft-10">全部</button> -->
        </div>
      </div>
      <div style="display: flex; margin-top: 20px">
        <div style="width: 50px" class="font-20">本周新碟</div>
        <div class="album-wrapper">
          <div class="album-border" v-for="item in monthData" :key="item.id">
            <div style="display: flex; flex-direction: column">
              <img v-lazy="`${item.picUrl}?param=400y400`" alt="歌手图片" />
              <div class="album-name text-hidden">{{ item.name }}</div>
              <div class="text-hidden" style="color: rgb(169, 169, 169)">
                {{ item.artists[0].name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive, toRefs, ref, onMounted } from 'vue'
  import { getTopSong, getTopAlbum } from '@/Api/api_playList'
  import { useTimeFormate, useSingersFormate } from '@/hooks/useFormate'
  import { useStore } from 'vuex'

  const store = useStore()

  const _index = ref(0)

  const handlePage = (value) => {
    _index.value = value
  }

  onMounted(() => {
    GetTopSong()
    // GetTopAlbum()
  })

  const typeQuery = reactive({
    _type: 0,
  })

  const typeData = ref([
    { value: '全部', id: 0 },
    { value: '华语', id: 7 },
    { value: '欧美', id: 96 },
    { value: '日本', id: 8 },
    { value: '韩国', id: 16 },
  ])

  const topSongData = ref([])

  const GetTopSong = async () => {
    const res = await getTopSong(typeQuery._type)
    console.log(res)
    if (res.code != 200) return
    topSongData.value = Object.freeze(res.data)
  }

  const handleType = (id) => {
    if (typeQuery._type == id) return
    typeQuery._type = id
    GetTopSong()
  }

  const getSong = (songIndex) => {
    store.commit('setPlaylists', topSongData.value)
    store.commit('setPlayingSongIndex', songIndex)
    store.commit('setCurrentSongId')
    // console.log(window.sessionStorage.getItem('isLogin'))
  }

  const TopAlbumQuery = reactive({
    area: 'ALL',
    type: 'hot',
  })

  const TopAlbumData = reactive({
    // area_index: 'ALL',
    // type_index: 'hot',
    area: [
      { value: '全部', tag: 'ALL' },
      { value: '华语', tag: 'ZH' },
      { value: '欧美', tag: 'EA' },
      { value: '日本', tag: 'KR' },
      { value: '韩国', tag: 'JP' },
    ],
    type: [
      { value: '热门', tag: 'hot' },
      { value: '全部 ', tag: 'new' },
    ],
  })

  const monthData = ref([])

  const GetTopAlbum = async () => {
    const res = await getTopAlbum(TopAlbumQuery)
    console.log(res)
    if (res.code != 200) return
    monthData.value = Object.freeze(res.monthData)
  }

  const handleAreaTag = (tag) => {
    if (TopAlbumQuery.area == tag) return
    TopAlbumQuery.area = tag
    GetTopAlbum()
  }

  const handleAlbumType = (type) => {
    if (TopAlbumQuery.type == type) return
    TopAlbumQuery.type = type
    GetTopAlbum()
  }
</script>
<style scoped lang="less">
  .isSwitchActive {
    background-color: #c6c6c6;
  }
  .isActive-btn {
    color: #202020;
    // background-color: #fdf5f5;
  }
  .isBack {
    background-color: #f8f8f8;
  }
  .isAlbumActive {
    background-color: #fdf5f5;
    color: #ec4141;
  }
  .switch-btn-wrapper {
    // display: flex;
    margin: auto;
    // justify-content: center;
    border-radius: 20px;
    border: 1px solid rgb(148, 148, 148);
    // width: 00px;
    width: fit-content;
    height: 30px;
    // height: 50px;

    .switch-btn {
      border-radius: 20px;
      padding: 4px 30px;
      transition: all 0.5s;
    }
  }
  .newsong-wrapper {
    ul li {
      list-style: none;
    }
    .category {
      color: rgb(169, 169, 169);
      display: flex;
    }
  }
  .song-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    line-height: 90px;
    .img {
      width: 60px;
      height: 60px;
      border-radius: 4px;
    }
    .song-list-name {
      width: 150px;
      flex: 1;
      &:hover {
        color: #9a4747;
      }
    }
  }

  .song-list:hover {
    background-color: #eeeeee;
  }
  .newAlbum-wrapper {
    ul li {
      list-style: none;
    }
    .category {
      color: rgb(169, 169, 169);
      display: flex;
    }

    .album-wrapper {
      display: flex;
      flex-wrap: wrap;
      .album-border {
        margin-bottom: 30px;
        margin-right: 3%;
        width: 22%;
        overflow: hidden;
        border-radius: 4px;
        cursor: pointer;
        transition: 0.3s;
        img {
          border-radius: 4px;
        }
        .album-name {
          height: 20px;
          /* width: 150px; */
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          transform: translate3d(0, 0, 0);
        }
      }
      .album-border:hover {
        transform: scale(1.1);
      }
    }
  }
</style>
