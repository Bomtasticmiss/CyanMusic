<template>
  <div>
    <div class="filter-wrapper font-14">
      <div class="filter-btn-wrapper">
        <span>语种</span>
        <div class="phone-btn">
          <button
            v-for="area in artistData.area"
            :key="area.id"
            class="mleft-20 btn filter-btn"
            :class="{ 'isActive-filter-btn': area.id == artistQuery.area }"
            @click="handleAreaBtn(area.id)">
            {{ area.value }}
          </button>
        </div>
      </div>
      <div class="filter-btn-wrapper">
        <span>分类</span>
        <div class="phone-btn">
          <button
            v-for="_type in artistData.type"
            :key="_type.id"
            class="mleft-20 btn filter-btn"
            :class="{ 'isActive-filter-btn': _type.id == artistQuery.type }"
            @click="handle_typeBtn(_type.id)">
            {{ _type.value }}
          </button>
        </div>
      </div>
      <div class="filter-btn-wrapper">
        <span>筛选</span>
        <div style="width: 80%" class="phone-btn">
          <button
            v-for="initial in artistData.initial"
            :key="initial.id"
            class="mleft-20 btn filter-btn"
            :class="{
              'isActive-filter-btn': initial.id == artistQuery.initial,
            }"
            @click="handleInitialBtn(initial.id)">
            {{ initial.value }}
          </button>
        </div>
      </div>
    </div>
    <div class="artistList-wrapper">
      <div class="artistList-border" v-for="artist in artists" :key="artist.id">
        <div style="display: flex; flex-direction: column">
          <img v-lazy="`${artist.img1v1Url}?param=200y200`" alt="歌手图片" />
          <div class="artistList-name text-hidden">{{ artist.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive, toRefs, ref, onMounted, watch } from 'vue'
  import playlistCard from '@/components/card/playlistCard.vue'
  import { getTopArtists } from '@/Api/api_artist'
  const artistData = require('@/assets/json/artistData.json')

  onMounted(() => {
    // console.log(artistData)
    GetTopArtists()
  })

  const artistQuery = reactive({
    limit: 30,
    offset: 0,
    type: -1,
    area: -1,

    initial: '-1',
  })

  const artists = ref([])

  const GetTopArtists = async () => {
    const res = await getTopArtists(artistQuery)
    console.log(res)
    if (res.code != 200) return
    artists.value = res.artists
  }
  watch(artistQuery, () => {
    GetTopArtists()
  })
  const handleAreaBtn = (area) => {
    artistQuery.area = area
  }
  const handle_typeBtn = (type) => {
    artistQuery.type = type
  }
  const handleInitialBtn = (initial) => {
    artistQuery.initial = initial
  }
</script>
<style scoped lang="less">
  .isActive-filter-btn {
    // border: 1px solid #d8d8d8;
    background-color: #fdf5f5;
    color: #ec4141;
  }
  .filter-btn-wrapper {
    margin-top: 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .filter-btn {
      width: 60px;
      padding: 0;
    }
  }
  .artistList-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    .artistList-border {
      margin-bottom: 30px;
      margin-right: 2%;
      width: 14%;
      overflow: hidden;
      border-radius: 4px;
      cursor: pointer;
      transition: 0.3s;
      img {
        border-radius: 4px;
      }
      .artistList-name {
        height: 20px;
        /* width: 150px; */
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transform: translate3d(0, 0, 0);
      }
    }
    .artistList-border:hover {
      transform: scale(1.1);
    }
  }
  @media screen and(max-width:500px) {
    .artistList-wrapper .artistList-border {
      width: 31%;
    }
    .filter-btn-wrapper {
      justify-content: space-between;
      .filter-btn {
        padding: 5px 5px;
      }
    }
    .phone-btn {
      display: flex;
      overflow-x: auto;
      width: 80%;
    }
  }
  @media screen and(max-width:1000px){
    .artistList-wrapper .artistList-border {
      width: 31%;
    }
  }
</style>
