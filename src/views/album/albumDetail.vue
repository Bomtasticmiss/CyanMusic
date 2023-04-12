<template>
  <div class="mtop-20">
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
        <div>
          <!-- 头部区域 -->
          <div class="header-wrapper">
            <div class="detail-img">
              <!-- <img :src="albumInfoImg" alt="加载中" /> -->
              <img :src="`${albumInfo.picUrl}?param=200y200`" alt="加载中" />
            </div>
            <div class="header-title">
              <div class="title-name">
                <div class="tn">专辑</div>
                <span class="mleft-10">{{ albumInfo.name }}</span>
              </div>
              <!-- 头部按钮 -->
              <div class="creator-btn-ul mtop-20">
                <button class="btn btn-red" @click="playAllalbumInfo">
                  <i class="fa fa-play" aria-hidden="true"></i>
                  <span class="btn-text"> 播放全部</span>
                </button>
                <button class="btn mleft-12 btn-white" @click="subAlbum">
                  <!-- <i class="fa fa-star-o" aria-hidden="true"></i> -->
                  <a v-if="!albumDynamic.isSub">
                    <span class="iconfont icon-star2"></span>
                    <span class="btn-text"
                      >收藏({{ albumDynamic.subCount }})</span
                    >
                  </a>
                  <a v-else>
                    <span
                      class="iconfont icon-star3"
                      style="color: #d81e06"></span>
                    <span class="btn-text"
                      >已收藏({{ albumDynamic.subCount }})</span
                    >
                  </a>
                </button>
                <button class="btn mleft-12 btn-white">
                  <!-- <i class="fa fa-share-square-o" aria-hidden="true"></i> -->
                  <span class="iconfont icon-Share"></span>
                  <span class="btn-text"
                    >分享({{ albumDynamic.shareCount }})</span
                  >
                </button>
              </div>
              <!-- 歌单描述 -->
              <div
                class="creator-name font-14 mtop-10"
                v-if="albumInfo.artists">
                <span>歌手 :</span>
                <span class="mleft-12 pointer" style="color: #3771dd">{{
                  albumInfo.artists[0].name
                }}</span>
              </div>
              <div class="font-14 mtop-10">
                <span>时间 : {{ useDateFormate(albumInfo.publishTime) }}</span>
              </div>
            </div>
          </div>
          <tabMenu :menuList="menuList" v-model:m-index="menuIndex"/>
          <songList :tracks="songs" v-if="menuIndex == 0" />
          <Comment :id="albumId" :type="3" v-if="menuIndex == 1" />
          <div class="albumIntroduce" v-if="menuIndex == 2">
            <div class="font-bold">专辑介绍</div>
            <div class="content" v-if="description.length !== 0">
              <p v-for="(item, index) in description" :key="index">
                {{ item }}
              </p>
            </div>
            <div v-else style="text-align: center">没有专辑详情~~</div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup>
  import { reactive, computed, ref, onMounted } from 'vue'
  import { getAlbumDetail, getAlbumDynamic, setAlbumSub } from '@/Api/api_album'
  import { useRoute } from 'vue-router'
  import { useStore } from 'vuex'
  import songList from '@/components/songList/songList'
  import Comment from '@/components/comment/Comment.vue'
  import { useDateFormate } from '@/hooks/useFormate'
  import jConfirm from '@/components/custom/confirm'
  import tabMenu from '@/components/menus/tabMenu.vue'
  const route = useRoute()
  const store = useStore()
  const loading = ref(false)

  onMounted(() => {
    GetAlbumDetail()
    GetAlbumDynamic()
  })

  const menuList = ref(['歌曲列表', '评论', '专辑详情'])

  const albumInfo = ref({})

  const songs = ref([])

  const albumId = computed(() => {
    return route.params.id
  })
  const GetAlbumDetail = async () => {
    // console.log(route.params.id)
    const res = await getAlbumDetail(route.params.id)
    console.log(res)
    albumInfo.value = res.album
    songs.value = res.songs
  }

  const albumDynamic = reactive({
    subCount: 0,
    shareCount: 0,
    isSub: false,
    commentCount: 0,
  })

  const description = computed(() => {
    return albumInfo.value.description
      ? albumInfo.value.description.split('\n')
      : []
  })

  const GetAlbumDynamic = async () => {
    // console.log(route.params.id)
    const res = await getAlbumDynamic(route.params.id)
    console.log(res)
    albumDynamic.subCount = res.subCount
    albumDynamic.shareCount = res.shareCount
    albumDynamic.isSub = res.isSub
    albumDynamic.commentCount = res.commentCount
  }

  const subAlbum = async () => {
    if (!store.state.isLogin)
      return ElMessage({ message: '请先登录', type: 'wran' })
    let t = albumDynamic.isSub ? 2 : 1
    //取消收藏
    if (t == 2) {
      jConfirm({ text: '确定取消收藏吗?' })
        .then(async () => {
          await setAlbumSub(route.params.id, t)
          console.log('取消收藏')
          albumDynamic.isSub = false
        })
        .catch(() => {
          return ElMessage({ message: '已取消' })
        })
    }
    // 收藏
    if (t == 1) {
      await setAlbumSub(route.params.id, t)
      albumDynamic.isSub = true
    }
  }

  const menuIndex = ref(0)

</script>
<style scoped lang="less">
  .header-wrapper {
    display: flex;
    // height: 180px;
  }

  .detail-img {
    width: 200px;
    height: 200px;
    border-radius: 5px;
    overflow: hidden;

    img {
      width: 100%;
    }
  }

  .header-title {
    // height: 180px;
    display: flex;
    flex-direction: column;
    margin-left: 15px;
  }

  .title-name {
    display: flex;
    height: 22px;

    .tn {
      display: inline-block;
      border: 1px solid #ec4141;
      padding: 0 2px;
      font-size: 14px;
      height: 22px;
      line-height: 22px;
      color: #ec4141;
      border-radius: 2px;
    }

    span {
      font-size: 20px;
      font-weight: 700;
    }
  }

  .creator-name {
    font-size: 14px;
  }

  .albumIntroduce {
    .content {
      text-indent: 2em;
      line-height: 2;
      width: 100%;
      p{
        color: #676767;
      }
    }
  }
</style>
