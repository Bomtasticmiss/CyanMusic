<template>
  <h3>热门推荐</h3>
  <div class="hot-songs">
    <musicCardVue
      v-for="song in songs"
      :key="song.id"
      :imgsrc="song.coverImgUrl"
      :title="song.name"
      :playCount="(song.playCount % 10000) + '万'"
      class="card-song"
    />
  </div>
</template>

<script setup>
import musicCardVue from "./musicCard.vue";
import { getHomeMusicRmd } from "@/Api/musicHomeList";
import { toRefs, reactive, onMounted } from "vue";

const data = reactive({
  songs: [],
  // songImgsrc: "",
  // songName: "",
  // playCount: "",
});

const getMusicRmd = async () => {
  const res = await getHomeMusicRmd();
  console.log(res);
  songs.value = res.playlists;
  // songImgsrc.value=res.playlists[0].coverImgUrl
  // songName.value=res.playlists[0].name
  // const viewNum = (res.playlists[0].playCount % 10000) + "万";
  // playCount.value = viewNum;
};

onMounted(() => {
  getMusicRmd();
});

let { songs} = toRefs(data);
</script>
<style scoped>
.hot-songs {
  display: flex;
  flex-wrap: wrap;
}
.card-song{
  /* flex-basis: 200px; */
  margin-bottom: 30px;
  margin-right: 2%;
}
</style>
