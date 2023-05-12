<template>
  <div class="artistList-wrapper">
    <div
      class="artistList-border"
      v-for="artist in artists"
      :key="artist.id"
      @click="toArtistPage(artist.id)">
      <div style="display: flex; flex-direction: column">
        <img v-lazy="`${artist.img1v1Url}?param=250y250`" alt="歌手图片" />
        <div class="artistList-name text-hidden">{{ artist.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { reactive, toRefs } from 'vue'

  const router = useRouter()

  const props = defineProps(['artists'])

  const toArtistPage = (id) => {
    router.push('/artistDetail/' + id)
  }
</script>
<style scoped lang="less">
  .artistList-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    .artistList-border {
      margin-bottom: 30px;
      margin-right: 2%;
      width: 18%;
      overflow: hidden;
      border-radius: 5px;
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
      box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.075);
      transform: translate(0, -10px);
    }
  }
  @media screen and(max-width:500px) {
    .artistList-wrapper .artistList-border {
      width: 31%;
    }
  }

  @media screen and(max-width:1000px) {
    .artistList-wrapper .artistList-border {
      width: 31%;
    }
  }
</style>
