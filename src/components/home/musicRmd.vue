<template>
  <h3>热门推荐</h3>
  <div class="hot-songs">
    <musicCardVue
      v-for="list in cardPlaylists"
      :key="list.id"
      :imgsrc="list.coverImgUrl+'?param=200y200'"
      :title="list.name"
      :playCount="list.playCount>10000?(Math.floor(list.playCount/10000)) + '万':list.playCount"
      class="card-song"
      @click="transferPlayList(list.id)"
    />
  </div>
</template>

<script setup>
import musicCardVue from "./musicCard.vue";
import { getHomeMusicRmd } from "@/Api/musicHomeList";
import { toRefs, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();

const data = reactive({
  cardPlaylists: [],
});

// 获取歌单信息
const getMusicRmd = async () => {
  const res = await getHomeMusicRmd();
  console.log(res);
  store.commit("setPlayList", res.playlists);
  cardPlaylists.value = store.state.playlists;

};

// 传入歌单Id获取详情页
const transferPlayList = (id) => {
  router.push({name:'musicRmdDetail',params:{id}});
};
// 初始化推荐歌单页面
onMounted(() => {
  getMusicRmd();
});

let { cardPlaylists } = toRefs(data);
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
