<template>
  <div class="detail-wrapper">
    <div class="header-wrapper">
      <div class="detail-img">
        <!-- <img :src="playlistImg" alt="加载中" /> -->
        <img
          v-if="playlist.creator"
          :src="`${playlist.coverImgUrl}?param=200y200`"
          alt="加载中" />
      </div>
      <div class="header-title">
        <div class="title-name">
          <div class="tn">歌单</div>
          <span>{{ playlist.name }}</span>
        </div>
        <div class="creator">
          <div class="creator-avatar pointer">
            <img
              v-if="playlist.creator"
              :src="playlist.creator.avatarUrl + '?param=200y200'"
              alt="..." />
          </div>
          <div>
            <span
              class="creator-name mleft-12 font-12 pointer"
              v-if="playlist.creator"
              >{{ playlist.creator.nickname }}</span
            >
            <span class="mleft-12 font-12">{{ playlistCreateTime }}</span>
          </div>
        </div>
        <div class="creator-btn-ul">
          <button class="btn btn-red">
            <i class="fa fa-play" aria-hidden="true"></i>
            <span>播放全部</span>
          </button>
          <button class="btn mleft-12 btn-white">
            <i class="fa fa-star-o" aria-hidden="true"></i>
            <span>收藏({{ subscribedCount }})</span>
          </button>
          <button class="btn mleft-12 btn-white">
            <i class="fa fa-share-square-o" aria-hidden="true"></i>
            <span>分享({{ shareCount }})</span>
          </button>
          <button class="btn mleft-12 btn-red">
            <i class="fa fa-spinner" aria-hidden="true"></i>
            <span>加载完整歌单</span>
          </button>
        </div>
        <div class="creator-tags font-14">
          <span>标签 :</span>
          <span
            class="mleft-12"
            v-for="(tag, index) in playlist.tags"
            :key="index"
            >{{ tag }}</span
          >
        </div>
        <div class="font-14">
          <span v-if="playlist.trackIds"
            >歌曲 : {{ playlist.trackIds.length }}</span
          >
          <span class="mleft-12">播放 : {{ playCount }}</span>
        </div>
        <div class="description">
          <div class="des-contnent" ref="descontnent">
            <p style="max-width: 600px">简介 :{{ playlist.description }}</p>
          </div>

          <i
            class="fa fa-caret-down pointer caretdown"
            @click="caretDown"
            ref="caretdown"
            aria-hidden="true"></i>

          <i
            class="fa fa-caret-up pointer caretup"
            @click="caretUp"
            ref="caretup"
            aria-hidden="true"></i>
        </div>
      </div>
    </div>
    <div class="content-wrapper"></div>
  </div>
</template>

<script setup>
  import { reactive, ref, toRefs, onMounted, computed, nextTick } from 'vue'
  import { getRmdDetail } from '@/Api/musicHomeList'
  import { useStore } from 'vuex'
  import { useRouter, useRoute } from 'vue-router'

  const store = useStore()
  const router = useRouter()
  const route = useRoute()

  const descontnent = ref()
  const caretdown = ref()
  const caretup = ref()

  const data = reactive({
    // 歌单详情
    playlist: {},
    //歌单图片
  })
  // 歌单创建时时间
  const playlistCreateTime = computed(() => {
    const date = new Date(playlist.value.createTime)
    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
  })
  // 收藏
  const subscribedCount = computed(() => {
    return playlist.value.subscribedCount > 10000
      ? Math.floor(playlist.value.subscribedCount / 10000) + '万'
      : playlist.value.subscribedCount
  })
  // 分享
  const shareCount = computed(() => {
    return playlist.value.shareCount > 10000
      ? Math.floor(playlist.value.shareCount / 10000) + '万'
      : playlist.value.shareCount
  })
  // 歌单播放量
  const playCount = computed(() => {
    return playlist.value.playCount > 10000
      ? Math.floor(playlist.value.playCount / 10000) + '万'
      : playlist.value.playCount
  })
  // 获取歌单详情页
  const GetRmdDetail = async () => {
    const res = await getRmdDetail(route.params.id)
    console.log(res)
    if (res.code !== 200)
      return ElMessage({ message: '歌单详情获取失败', type: 'error' })
    playlist.value = res.playlist
    console.log(playlist.value)
  }
  const caretDown = () => {
    nextTick(() => {
      console.log('dd')
      descontnent.value.style.maxHeight = '1000px'
      caretdown.value.style.display = 'none'
      caretup.value.style.display = 'block'
    })
  }
  const caretUp = () => {
    descontnent.value.style.maxHeight = '20px'
    caretup.value.style.display = 'none'
    caretdown.value.style.display = 'block'
  }
  onMounted(() => {
    GetRmdDetail()
  })
  let { playlist, playlistImg, playerlistCreator } = toRefs(data)
</script>
<style lang="less" scoped>
  .mleft-12 {
    margin-left: 12px;
  }
  .pointer {
    cursor: pointer;
  }
  .font-12 {
    font-size: 12px;
  }
  .font-14 {
    font-size: 14px;
  }
  .btn {
    border: none;
    outline: none;
    height: 30px;
    padding: 4px 14px;
    border-radius: 15px;
    cursor: pointer;
  }
  .btn-red {
    background-color: #ec4141;
    color: #fff;
  }
  .btn-white {
    border: 1px solid #d8d8d8;
    background-color: #fff;
    color: #373737;
  }
  .header-wrapper {
    display: flex;
    // height: 180px;
  }

  .detail-img {
    width: 150px;
    height: 150px;
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
  .creator {
    margin: 5px 0;
    display: flex;
    .creator-avatar {
      width: 24px;
      height: 24px;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
  }
  .creator-name {
    color: rgb(11, 88, 176);
  }
  .creator-btn-ul {
    margin: 5px 0;
  }
  .creator-tags {
    font-size: 14px;
  }
  .des-contnent {
    max-height: 20px;
    overflow: hidden;
    transition: max-height 1s;
  }
  .caretdown {
    display: block;
  }
  .caretup {
    display: none;
  }
</style>
