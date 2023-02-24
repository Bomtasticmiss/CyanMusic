<template>
  <!-- 骨架 -->
  <el-skeleton :loading="loading" animated>
    <template #template>
      <el-skeleton-item
        variant="image"
        style="width: 150px; height: 150px; margin-left: 20px" />
      <div style="padding: 14px">
        <el-skeleton-item variant="text" style="width: 40%" />
        <el-skeleton-item
          variant="text"
          style="width: 70%; margin-right: 16px" />
        <el-skeleton-item variant="text" style="width: 20%" />
      </div>
    </template>
    <template #default>
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
        <div class="content-header">
          <ul class="header-tab">
            <li
              class="pointer"
              v-for="(Tabs, index) in headerTabs"
              :key="index"
              :class="{ isActive: index === tabCurrent }"
              @click="tabActive(index)">
              <span>{{ Tabs.text }}</span>
            </li>
          </ul>
          <div class="song-search" v-show="tabCurrent === 0">
            <el-input placeholder="搜索音乐">
              <template #suffix>
                <i class="fa fa-search" aria-hidden="true"></i>
              </template>
            </el-input>
          </div>
        </div>
        <!-- 音乐 -->
        <div class="content-wrapper" v-if="tabCurrent === 0">
          <el-table
            :data="tracks"
            stripe
            style="width: 100%"
            size="small"
            @row-dblclick="GetSong"
            :row-class-name="RowClassName">
            <el-table-column type="index" width="50px" class-name="default" />
            <el-table-column prop="date" width="35px" class-name="pointer">
              <template #default>
                <i class="fa fa-heart-o" aria-hidden="true"></i>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="音乐" class-name="default" />
            <el-table-column
              label="歌手"
              :formatter="SingersFormate"
              show-overflow-tooltip
              class-name="pointer" />
            <el-table-column
              prop="al.name"
              label="专辑名"
              class-name="pointer"
              show-overflow-tooltip />
            <el-table-column
              label="时长"
              width="100px"
              :formatter="timeFormate"
              class-name="default" />
          </el-table>
        </div>
        <!-- 评论区 -->
        <div class="comment-wrapper" v-if="tabCurrent == 1">
          <commentWrapper :id="playlist.id" />
        </div>
        <!-- 收藏者 -->
        <div class="pd-10" v-if="tabCurrent == 2">
          <subscribersWrappper :subscribers="playlist.subscribers" />
        </div>
      </div>
    </template>
  </el-skeleton>
</template>

<script setup>
  import subscribersWrappper from '@/components/star/subscribersWrapper.vue'
  import commentWrapper from '@/components/comment/commentWrapper.vue'
  import { reactive, ref, toRefs, onMounted, computed, nextTick } from 'vue'
  import { getRmdDetail, getPlayListCmd } from '@/Api/api_musicHomeList'
  import { useStore } from 'vuex'
  import { useRouter, useRoute } from 'vue-router'
  import  useGetSong  from '@/hooks/useGetSong'
  import {useCountFormate,useSingersFormate,useTimeFormate} from '@/hooks/useFormate'
  const loading = ref(true)

  onMounted(() => {
    GetRmdDetail()
    setTimeout(() => {
      loading.value = false
    }, 500)
  })

  const store = useStore()
  const router = useRouter()
  const route = useRoute()

  const data = reactive({
    // 歌单详情
    playlist: {},
    // 音乐tracks
    tracks: [],
    //按钮活动样式
    tabCurrent: 0,
    // 按钮文本
    headerTabs: [{ text: '歌曲列表' }, { text: '评论' }, { text: '收藏者' }],
  })
  // 歌单创建时时间
  const playlistCreateTime = computed(() => {
    const date = new Date(playlist.value.createTime)
    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
  })
  // 收藏
  const subscribedCount = computed(() => {
    return useCountFormate(playlist.value.subscribedCount)
  })
  // 分享
  const shareCount = computed(() => {
    return useCountFormate(playlist.value.shareCount)
  })
  // 歌单播放量
  const playCount = computed(() => {
    return useCountFormate(playlist.value.playCount)
  })
  // 获取歌单详情页
  const GetRmdDetail = async () => {
    const res = await getRmdDetail(route.params.id)
    console.log(res)
    if (res.code !== 200)
      return ElMessage({ message: '歌单详情获取失败', type: 'error' })
    playlist.value = res.playlist
    tracks.value = res.playlist.tracks
    headerTabs.value[1].text = '评论' + '(' + playlist.value.commentCount + ')'
    // console.log(playlist.value)
    console.log(tracks.value)
    store.commit('setPlaylists', res.playlist.tracks)
  }
  // 添加索引
  const RowClassName = ({ row, rowIndex }) => {
    row.index = rowIndex
  }

  const {getSongUrl} = useGetSong()
  // 获取音乐数据
  const GetSong = async(row) => {
    const songUrl= await getSongUrl(row.id)
    // console.log(songUrl)
    store.commit('setPlayingSongIndex', row.index)
    store.commit('setSongUrl',songUrl)
  }
  // const GetSong = async (row) => {
  //   const res = await getSong(row.id)
  //   console.log(res)
  //   store.commit('setSongRowUrl', [row, res.data[0].url])
  // }

  /*歌单详情内容DOM*/
  const descontnent = ref()
  const caretdown = ref()
  const caretup = ref()
  //简介下拉按钮
  const caretDown = () => {
    nextTick(() => {
      descontnent.value.style.maxHeight = '1000px'
      caretdown.value.style.display = 'none'
      caretup.value.style.display = 'block'
    })
  }
  // 简介回推按钮
  const caretUp = () => {
    nextTick(() => {
      descontnent.value.style.maxHeight = '20px'
      caretup.value.style.display = 'none'
      caretdown.value.style.display = 'block'
    })
  }
  // 活动添加样式按钮
  const tabActive = (index) => {
    tabCurrent.value = index
    if (index == 1) GetPlayListCmd()
    // if(index==2)
  }

  const GetPlayListCmd = async () => {
    // const res = await getPlayListCmd(playlist.value.id,2)
    // console.log(res)
    // store.commit('setCommentInfo',res.data)
    // store.commit('setHotComment',res.data.comments.slice(0, 8))
    // store.commit('setLastedComment',res.data.comments.slice(8, 29))
  }

  // 格式化音乐演唱歌手
  const SingersFormate = (row) => {
    // console.log(row)
    return useSingersFormate(row)
  }
  // 格式化时间
  const timeFormate = (row) => {
    return useTimeFormate(row.dt/1000)
  }
  let { playlist, tracks, headerTabs, tabCurrent } = toRefs(data)
</script>
<style lang="less" scoped>
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

  .content-header {
    display: flex;
    justify-content: space-between;

    ul {
      list-style: none;
    }

    .header-tab {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      li {
        margin: 10px;
      }

      .isActive {
        font-size: 18px;
        font-weight: 700;
      }

      .isActive::after {
        display: block;
        content: '';
        height: 4px;
        width: 90%;
        margin: 0 auto;
        background-color: #ec4141;
        border-radius: 2px;
      }
    }
  }

  .song-search {
    display: flex;
    align-items: center;

    .el-input {
      height: 30px;
      --el-input-focus-border-color: #3534344a;
    }
  }
  // .el-table {
  //   /deep/tbody tr:hover > td {
  //     cursor: pointer;
  //     background-color: red;
  //   }
  // }
  .comment-wrapper {
    padding: 10px;
  }
</style>
