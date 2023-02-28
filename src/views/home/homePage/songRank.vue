<template>
  <div>
    <div>
      <div>
        <h3>官方榜</h3>
      </div>
      <div class="Toplist-wrapper">
        <playlistCard
          v-for="Toplist in Toplists"
          :key="Toplist.id"
          :imgsrc="Toplist.coverImgUrl"
          :title="Toplist.name"
          :playCount=useCountFormate(Toplist.playCount) />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive, toRefs, ref, onMounted } from 'vue'
  import { getToplist, getPlaylistDetail } from '@/Api/api_playList'
  import playlistCard from '@/components/card/playlistCard.vue'
  import {useCountFormate} from '@/hooks/useFormate'
  onMounted(() => {
    GetToplist()
  })

  const Toplists = ref([])
  // const
  const ee = reactive({
    id: '',
    s: 8,
  })
  const GetToplist = async () => {
    const res = await getToplist()
    ee.id = res.list[0].id
    Toplists.value = res.list
    console.log(res)
    GetPlaylistDetail()
  }

  const GetPlaylistDetail = async () => {
    const res = await getPlaylistDetail(ee)
    console.log(res)
  }
</script>
<style scoped>
.Toplist-wrapper{
  display: flex;
  flex-wrap: wrap;
}
</style>
