<template>
  <div class="mtop-20">
    <!-- 骨架 -->
    <el-skeleton :loading="loading" animated>
      <template #template>
        <el-skeleton-item
          variant="image"
          style="width: 180px; height: 180px; margin-left: 20px" />
        <div style="padding: 14px">
          <el-skeleton-item variant="text" style="width: 40%" />
          <el-skeleton-item
            variant="text"
            style="width: 70%; margin-right: 16px" />
          <el-skeleton-item variant="text" style="width: 20%" />
        </div>
      </template>
      <template #default>
        <div class="header-wrapper">
          <div class="img">
            <img :src="artistInfo.cover + '?param=200y200'" alt="" />
          </div>
          <div class="mleft-20">
            <div class="name font-24 font-bold mtop-20">
              {{ artistInfo.name }}
            </div>
            <div class="btn-wrapper mtop-20">
              <button class="btn-white btn" @click="handleSubArtist">
                <a v-if="!isSub">
                  <span class="iconfont icon-star2"></span>
                  <span class="btn-text">收藏</span>
                </a>
                <a v-else>
                  <span
                    class="iconfont icon-star3"
                    style="color: #d81e06"></span>
                  <span class="btn-text">已收藏</span>
                </a>
              </button>
              <button
                class="btn btn-white mleft-10"
                v-if="showPriMsg"
                @click="toUserDetail">
                <span class="icon-user1 iconfont"></span>
                个人主页
              </button>
            </div>
            <div class="mtop-20 font-14">
              <span>单曲数:{{ artistInfo.musicSize }}</span>
              <span class="mleft-15">专辑数:{{ artistInfo.albumSize }}</span>
              <span class="mleft-15">MV数:{{ artistInfo.mvSize }}</span>
            </div>
          </div>
        </div>
        <tabMenu
          :menu-list="['专辑', 'MV', '歌手详情', '相似歌手']"
          v-model:mIndex="menuIndex" />
        <!-- 歌手专辑 -->
        <div v-if="menuIndex == 0">
          <albumArtist v-for="item in AlbumInfoObj" :key="item.album.id" :songs="item.songs" :albumInfo="item.album"/>
        </div>
        <!-- 歌手MV -->
        <mvList :MvData="mvs" v-if="menuIndex == 1" />
        <!-- 个人简介 -->
        <div v-if="menuIndex == 2">
          <div class="font-14">
            <h2 class="font-14">个人简介</h2>
            <div class="text-desc">
              <p>{{ arIntroduce.briefDesc }}</p>
            </div>
            <div v-for="(item, index) in arIntroduce.introduction" :key="index">
              <h2 class="font-14">{{ item.ti }}</h2>
              <div class="text-desc">
                <p>{{ item.txt }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 相似歌手 -->
        <artistList
          :artists="simiArtistData"
          v-if="menuIndex == 3"
          class="mtop-20" />
      </template>
    </el-skeleton>
  </div>
</template>

<script setup>
  import { reactive, toRefs, ref, onMounted, watch, computed } from 'vue'
  import {
    getArtistDetail,
    getArtistDesc,
    getArtistMv,
    getSimiArtist,
    getSubArtists,
    subArtist,
  } from '@/Api/api_artist'
  import { useRoute } from 'vue-router'
  import tabMenu from '@/components/menus/tabMenu.vue'
  import mvList from '@/components/video/mvList.vue'
  import artistList from '@/components/artist/artistList.vue'
  import router from '@/router'
  import UserDetail from '../user/userDetail.vue'
  import { useStore } from 'vuex'
  import jConfirm from '@/components/custom/confirm'
  import albumArtist from '@/components/album/albumArtist'
  import { getArtistAlbum, getAlbum } from '@/Api/api_album'

  const route = useRoute()
  const store = useStore()
  const loading = ref(false)

  onMounted(() => {
    GetArtistAlbum()
    GetArtistDetail()
    GetSubArtists()
  })
  // 歌手ID
  const artistId = computed(() => {
    return route.params.id
  })

  // 热门专辑
  const AlbumInfoObj = ref([])
  //获取歌手专辑
  const GetArtistAlbum = async () => {
    const res = await getArtistAlbum(artistId.value)
    console.log(res)
    if (res.code != 200) return
    res.hotAlbums.forEach((item) => GetAlbum(item.id))
  }
  // 获取专辑内容
  const GetAlbum = async (id) => {
    const res = await getAlbum(id)
    console.log(res)
    if (res.code != 200) return
    AlbumInfoObj.value.push(Object.freeze(res))
  }

  const artistInfo = ref({})

  const showPriMsg = ref(false)

  const user = ref({})
  // 获取歌手详情
  const GetArtistDetail = async () => {
    loading.value = true
    const res = await getArtistDetail(artistId.value)
    console.log(res)
    artistInfo.value = res.data.artist
    showPriMsg.value = res.data.showPriMsg
    user.value = res.data.user
    loading.value = false
  }
  const isSub = ref(false)

  const GetSubArtists = async () => {
    loading.value = true
    const res = await getSubArtists()
    console.log(res)
    if (res.code != 200) return
    isSub.value = res.data.some((item) => item.id == artistId.value)
    loading.value = false
  }

  const handleSubArtist = async () => {
    if (!store.state.isLogin)
      return ElMessage({ message: '请先登录', type: 'wran' })
    let t = isSub.value ? 2 : 1
    //取消收藏
    if (t == 2) {
      jConfirm({ text: '确定取消收藏吗?' })
        .then(async () => {
          await subArtist(artistId.value, t)
          console.log('取消收藏')
          isSub.value = false
        })
        .catch(() => {
          return ElMessage({ message: '已取消' })
        })
    }
    // 收藏
    if (t == 1) {
      await subArtist(artistId.value, t)
      isSub.value = true
    }
  }

  const toUserDetail = () => {
    router.push('/userDetail/' + user.value.userId)
  }

  const menuIndex = ref(0)

  watch(menuIndex, (val) => {
    console.log(val)
    if (val == 1) {
      GetArtistMv()
    }
    if (val == 2) {
      GetArtistDesc()
    }
    if (val == 3) {
      GetSimiArtist()
    }
  })
  // 监听路由数据重载
  // watch(
  //   () => artistId.value,
  //   () => {
  //     if (route.name != 'artistDetail') return
  //     // 数据全部置空
  //     artistInfo.value = {}
  //     mvs.value = []
  //     simiArtistData.value = []
  //     GetArtistDetail()
  //     menuIndex.value = 0
  //   }
  // )

  const mvs = ref([])
  const GetArtistMv = async () => {
    const res = await getArtistMv(artistId.value)
    console.log(res)
    mvs.value = res.mvs
  }
  // 个人详情
  const arIntroduce = reactive({
    introduction: [],
    briefDesc: '',
  })
  // 获取歌手描述
  const GetArtistDesc = async () => {
    const res = await getArtistDesc(artistId.value)
    console.log(res)
    arIntroduce.briefDesc = res.briefDesc
    arIntroduce.introduction = res.introduction
  }

  // 获取相似歌手
  const simiArtistData = ref([])
  const GetSimiArtist = async () => {
    const res = await getSimiArtist(artistId.value)
    console.log(res)
    if (res.code != 200) return
    simiArtistData.value = res.artists
  }
</script>
<style scoped lang="less">
  .header-wrapper {
    display: flex;
    .img {
      width: 200px;
      height: 200px;
      img {
        border-radius: 8px;
      }
    }
  }
</style>
