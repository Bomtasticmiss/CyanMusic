<template>
  <div class="videoDetail mtop-10" v-if="videoDetail">
    <!-- 左侧主体内容 -->
    <div class="main">
      <!-- 返回视频主页面 -->
      <div>
        <button
          class="btn font-18 fontbd-700"
          style="padding: 4px 0"
          @click="backVideoPage">
          <span class="iconfont icon-left"></span>
          <span v-if="_type == 'video'">视频详情</span>
          <span v-if="_type == 'mv'">MV详情</span>
        </button>
      </div>
      <!-- 视频 -->
      <div class="video mtop-10">
        <video controls :src="playUrl">您的浏览器不支持 video 标签。</video>
        <!-- autoplay -->
      </div>
      <!-- 作者栏 -->
      <div class="avator-line mtop-10">
        <div class="avator-wrapper">
          <img
            :src="creator.avatarUrl || creator.img1v1Url"
            alt=""
            style="width: 50px; height: 50px; border-radius: 50%"
            class="pointer"
            @click="enterUserPage" />
          <span class="mleft-10 font-14 pointer" @click="enterUserPage">{{
            creator.nickname || creator.name
          }}</span>
        </div>
        <button class="btn avator-btn">+关注</button>
      </div>
      <!-- 描述 -->
      <div class="mtop-10 describe-wrapper">
        <div class="font-20 fontbd-700">
          {{ videoDetail.title || videoDetail.name }}
        </div>
        <div class="font-12 author-color mtop-10">
          <span>发布：{{ useDateFormate(videoDetail.publishTime) }}</span>
          <span class="mleft-20"
            >播放：{{
              useCountFormate(videoDetail.playTime || videoDetail.playCount)
            }}</span
          >
        </div>
        <div class="mtop-10">
          <button
            class="videoGroup btn font-12"
            v-for="item in videoDetail.videoGroup"
            :key="item.id">
            {{ item.name }}
          </button>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="user-btn-wrapper" v-if="btnInfo">
        <button class="btn btn-white">
          <span class="iconfont icon-dianzan"></span>
          <span>点赞({{ useCountFormate(btnInfo.likedCount) }})</span>
        </button>
        <button class="btn mleft-12 btn-white">
          <i class="fa fa-star-o" aria-hidden="true"></i>
          <span
            >收藏({{
              useCountFormate(
                videoDetail.subscribeCount || videoDetail.subCount
              )
            }})</span
          >
        </button>
        <button class="btn mleft-12 btn-white">
          <i class="fa fa-share-square-o" aria-hidden="true"></i>
          <span>分享({{ useCountFormate(btnInfo.shareCount) }})</span>
        </button>
      </div>

      <div>
        <Comment :id="route.params.id" :type="_type == 'video' ? 5 : 1" />
      </div>
    </div>
    <!-- 右侧相关推荐 -->
    <div class="right-recommend-wrapper">
      <div class="mtop-10 mbtm-10 font-20">
        <span>相关推荐</span>
      </div>
      <div class="recommend-list">
        <ul>
          <li
            v-for="(item, index) in RelatedAllvideo"
            :key="index"
            class="mbtm-10"
            @click="jumpOtherVideo(item.vid)">
            <div class="pointer">
              <img
                :src="item.coverUrl"
                alt=""
                style="width: 150px; border-radius: 10px" />
            </div>
            <div class="mleft-10 pointer" style="width: 150px">
              <div class="font-14 title-content">
                {{ item.title }}
              </div>
              <div class="author-color font-12 mtop-10">
                by{{ item.creator[0].userName }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed, reactive, watch } from 'vue'
  import {
    getAllDetail,
    getRelatedAllvideo,
    getAllDetailUrl,
    getAllDetailInfo,
  } from '@/Api/api_video'
  import { useRoute, useRouter } from 'vue-router'
  import { useCountFormate, useDateFormate } from '@/hooks/useFormate'
  import Comment from '@/components/comment/Comment.vue'
  const route = useRoute()
  const router = useRouter()

  //监听路由强制刷新页面
  // watch(
  //   () => route.params,
  //   () => {
  //     if(route.name!='videoDetial')return 
  //     GetVideoDetail()
  //     GetAllUrl()
  //     GetRelatedAllvideo()
  //     GetBtnInfo()
  //   }
  // )

  onMounted(() => {
    GetVideoDetail()
    GetAllUrl()
    GetRelatedAllvideo()
    GetBtnInfo()
    // console.log(route.params)
  })

  const _type = computed(() => {
    return route.params.type
  })

  const creator = computed(() => {
    return _type.value == 'video'
      ? videoDetail.value.creator
      : videoDetail.value.artists[0]
  })
  // 获取视频详情
  const GetVideoDetail = async () => {
    // console.log(route.params.vid)
    const res = await getAllDetail(_type.value, route.params.id)
    console.log(res)
    if (res.code != 200) return
    videoDetail.value = res.data
  }

  const playUrl = ref('')

  const videoDetail = ref(null)
  // 获取视频资源
  const GetAllUrl = async () => {
    // console.log(route.params.vid)
    const res = await getAllDetailUrl(_type.value, route.params.id)
    console.log(res)
    if (res.code != 200) return
    if (_type.value == 'video') {
      playUrl.value = res.urls[0].url
    }
    if (_type.value == 'mv') {
      playUrl.value = res.data.url
    }
  }

  // 按钮信息(点赞转发评论数数据)
  const btnInfo = ref()
  // {
  //   commentCount:0,
  //   likedCount:0,
  //   shareCount:0,
  //   liked:false
  // }
  const GetBtnInfo = async () => {
    // console.log(route.params.vid)
    const res = await getAllDetailInfo(_type.value, route.params.id)
    console.log(res)
    if (res.code != 200) return
    btnInfo.value = res
  }

  const RelatedAllvideo = ref([])

  // 获取相关视频
  const GetRelatedAllvideo = async () => {
    const res = await getRelatedAllvideo(route.params.id)
    console.log(res)
    if (res.code != 200) return
    RelatedAllvideo.value = res.data
  }

  const enterUserPage = () => {
    router.push({
      name: 'userDetail',
      params: { id: creator.value.userId },
    })
  }

  const backVideoPage = () => {
    if (_type.value == 'video') {
      router.push({ name: 'videoHome' })
    }
    if (_type.value == 'mv') {
      router.push({ name: 'mvHome' })
    }
  }

  const jumpOtherVideo = (id) => {
    router.push({ name: 'videoDetial', params: { type: 'video', id } })
  }
</script>
<style scoped lang="less">
  .videoDetail {
    display: flex;
    justify-content: space-around;
  }
  .main {
    width: 600px;
  }
  .video {
    video {
      width: 600px;
      height: 340px;
    }
  }
  .avator-line {
    justify-content: space-between;
    display: flex;
    .avator-wrapper {
      display: flex;
      align-items: center;
    }
    .avator-btn {
      color: #ea2c2c;
      background-color: #ffede7;
    }
  }
  .describe-wrapper {
    .videoGroup {
      font-weight: 100;
      padding: 2px 5px;
      height: auto;
      background-color: #e8e8e8;
      margin-left: 2px;
    }
  }
  .user-btn-wrapper {
    margin: 20px 0;
  }
  .right-recommend-wrapper {
    width: 400px;
    .recommend-list {
      ul {
        list-style: none;
        li {
          display: flex;
          .title-content {
            width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
        }
      }
    }
  }
</style>
