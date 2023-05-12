<template>
  <div class="video-wrapper">
    <!-- 分类按钮 -->
    <div class="btn-wrapper mtop-20">
      <div style="position: relative">
        <button class="btn video-btn" @click="isHiddenSquare = !isHiddenSquare">
          <span>
            {{ tabName }}
          </span>
          <span class="iconfont icon-right1"></span>
        </button>
        <div
          class="hidden-square font-14"
          :style="{ display: isHiddenSquare ? 'block' : 'none' }">
          <div class="header mleft-30">
            <button
              class="btn"
              :class="{
                'isActive-CategoryList': 0 == Query.id,
              }"
              @click="handleVideoGroup(0, '全部视频')">
              全部视频
            </button>
          </div>
          <div class="line"></div>
          <!-- 弹窗分类标签 -->
          <div style="padding: 10px 30px" class="font-12">
            <button
              class="btn hvideo-btn mtop-20"
              :class="{
                'isActive-CategoryList': GroupList.id == Query.id,
              }"
              v-for="GroupList in GroupLists"
              :key="GroupList.id"
              @click="handleVideoGroup(GroupList.id, GroupList.name)">
              {{ GroupList.name }}
            </button>
          </div>
        </div>
      </div>
      <!-- 右侧标签 -->
      <div class="rigth-btn">
        <button
          class="btn"
          :class="{
            'isActive-CategoryList': CategoryList.id == Query.id,
          }"
          v-for="CategoryList in CategoryLists"
          :key="CategoryList.id"
          @click="handleVideoGroup(CategoryList.id, CategoryList.name)">
          {{ CategoryList.name }}
        </button>
      </div>
    </div>
    <!-- 视频 -->
    <div>
      <!-- <button
        @click="
          Query.offset = Query.offset + 8
          GetVideoGroupById()
        ">
        dianji
      </button> -->
      <videoList @loadMore="load" :videoData="videoData" :disabled="isLoading">
        <template #img="{ item }">
          <el-image
            style="
              width: 100%;
              height: 140px;
              /* height: 160px; */
              border-radius: 4px;
            "
            :src="item.data.coverUrl + '?param=290y140'">
            <template #placeholder>
              <div style="width: 100%">
                <img src="@/assets/img/loading-2.gif" alt="" />
              </div>
            </template>
          </el-image>
        </template>
        <template #playcount="{ item }">
          {{ useCountFormate(item.data.playTime) }}
        </template>
        <template #title="{ item }">
          {{ item.data.title }}
        </template>
        <template #nickname="{ item }">
          <span v-if="item.data.creator">
            by{{ item.data.creator.nickname }}
          </span>
        </template>
      </videoList>
    </div>
  </div>
</template>

<script setup>
  import videoList from '@/components/video/videoList'
  import { onMounted, ref, reactive } from 'vue'
  import {
    getVideoCategoryList,
    getVideoGroupList,
    getVideoGroupById,
    getAllVideo,
  } from '@/Api/api_video.js'
  import { useCountFormate } from '@/hooks/useFormate'

  
  onMounted(() => {
    GetVideoCategoryList()
    GetVideoGroupList()
    GetAllVideo(true)
  })
  // 视频分类
  const CategoryLists = ref([])
  // 视频标签
  const GroupLists = ref([])
  // 左侧标签名
  const tabName = ref('全部视频')

  const Query = reactive({
    // 初始全部视频id为0
    id: 0,
    offset: 0,
  })
  const isHiddenSquare = ref(false)

  //获取全部视频列表
  const GetAllVideo = async (isChange) => {
    if (isLoading.value) return
    isLoading.value = true
    const res = await getAllVideo(Query.offset)
    console.log(res)
    if (res.code != 200) return
    if (res.datas.length == 0) ElMessage({ message: res.msg, type: 'error' })
    if (isChange) {
      videoData.value = res.datas
      hasMore.value = res.hasmore
    } else {
      videoData.value.push(...res.datas)
      hasMore.value = res.hasmore
    }
    isLoading.value = false
  }
  //  获取视频分类列表
  const GetVideoCategoryList = async () => {
    const res = await getVideoCategoryList()
    // console.log(res)
    if (res.code != 200) return
    CategoryLists.value = res.data
  }
  // 获取视频标签列表
  const GetVideoGroupList = async () => {
    const res = await getVideoGroupList()
    // console.log(res)
    if (res.code != 200) return
    GroupLists.value = res.data
  }

  const videoData = ref([])
  const isLoading = ref(false)
  const hasMore = ref(true)

  // 传入标签/分类id,获取到相关的视频
  const GetVideoGroupById = async (isChange) => {
    if (isLoading.value) return
    isLoading.value = true
    const res = await getVideoGroupById(Query)
    console.log(res)
    if (res.code != 200) return
    if (isChange) {
      videoData.value = res.datas
      hasMore.value = res.hasmore
    } else {
      videoData.value.push(...res.datas)
      hasMore.value = res.hasmore
    }
    isLoading.value = false
  }
  // 点击按钮
  const handleVideoGroup = (id, name) => {
    if (Query.id == id) return
    Query.id = id
    tabName.value = name
    Query.offset = 0
    if (id == 0) {
      GetAllVideo(true)
    } else {
      GetVideoGroupById(true)
    }
  }

  const load = (size) => {
    if (isLoading.value) return
    if (!hasMore.value) {
      console.log('结束')
      return
    }
    Query.offset = 8 + size
    if (Query.id == 0) {
      GetAllVideo()
    } else {
      GetVideoGroupById()
    }
    console.log(1)
  }
</script>
<style scoped lang="less">
  .isActive-CategoryList {
    // background-color: rgb(185, 125, 125);
    color: #ec4141;
    border: 1px solid #d8d8d8;
  }
  .btn-wrapper {
    display: flex;
    justify-content: space-between;
    .hidden-square {
      border-radius: 4px;
      box-shadow: 0 0 8px #e5e5e5;
      position: absolute;
      top: 40px;
      z-index: 999;
      width: 720px;
      // width: 90vw;
      height: 500px;
      overflow: auto;
      background-color: white;
      .header {
        line-height: 80px;
      }
      .hvideo-btn {
        width: 100px;
        &:hover {
          color: #ec4141;
        }
      }
    }
    .rigth-btn {
      display: flex;
      height: 35px;
      overflow-x: auto;
    }
  }
  .video-btn {
    display: flex;
    align-items: center;
    padding: 0 20px;
    background-color: white;
    border: 1px solid #d8d8d8;

    &:hover {
      background-color: #e0e0e0;
    }
  }
</style>
