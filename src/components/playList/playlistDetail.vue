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
        <div class="detail-wrapper">
          <!-- 头部区域 -->
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
              <!-- 头部按钮 -->
              <div class="creator-btn-ul">
                <button class="btn btn-red" @click="playAllPlayList">
                  <i class="fa fa-play" aria-hidden="true"></i>
                  <span class="btn-text"> 播放全部</span>
                </button>
                <button
                  class="btn mleft-12 btn-white"
                  @click="handleUserCollect"
                  :style="{
                    cursor:
                      isUserCreateLists == true ? 'not-allowed' : 'pointer',
                  }"
                  :class="{'author-color':isUserCreateLists == true}">
                  <!-- <i class="fa fa-star-o" aria-hidden="true"></i> -->
                  <a v-if="!isSubscribe">
                    <span class="iconfont icon-star2"></span>
                    <span class="btn-text">收藏({{ subscribedCount }})</span>
                  </a>
                  <a v-else>
                    <span
                      class="iconfont icon-star3"
                      style="color: #d81e06"></span>
                    <span class="btn-text">已收藏({{ subscribedCount }})</span>
                  </a>
                </button>
                <button class="btn mleft-12 btn-white">
                  <!-- <i class="fa fa-share-square-o" aria-hidden="true"></i> -->
                  <span class="iconfont icon-Share"></span>
                  <span class="btn-text">分享({{ shareCount }})</span>
                </button>
                <button
                  class="btn mleft-12 btn-red"
                  @click="GetPlaylistAll"
                  v-if="!isPlaylistAll">
                  <!-- <i class="fa fa-spinner" aria-hidden="true"></i> -->
                  <span class="iconfont icon-loading"></span>
                  <span class="btn-text">加载完整歌单</span>
                </button>
              </div>
              <!-- 歌单描述 -->
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
                  <p style="max-width: 600px">
                    简介 :{{ playlist.description }}
                  </p>
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
          <!-- 菜单区 -->
          <div class="content-header">
            <ul class="header-tab">
              <li
                class="pointer"
                v-for="(Tabs, index) in headerTabs"
                :key="index"
                :class="{ isActive: index === tabCurrent }"
                @click="tabActive(index)">
                <span>{{ Tabs.title }}</span>
              </li>
            </ul>
            <!-- <tabMenu :menuList="headerTabs" @getMenuIndex="tabActive" /> -->
            <div class="song-search" v-show="tabCurrent === 0">
              <el-input placeholder="搜索音乐">
                <template #suffix>
                  <i class="fa fa-search" aria-hidden="true"></i>
                </template>
              </el-input>
            </div>
          </div>
          <!-- 音乐区 -->
          <div class="content-wrapper" v-if="tabCurrent == 0">
            <el-table
              :data="tracks"
              stripe
              style="width: 100%"
              size="small"
              @row-dblclick="GetSong"
              :row-class-name="RowClassName"
              empty-text="当前暂无音乐">
              <el-table-column type="index" width="50px" class-name="default">
                <template #default="scope">
                  <span
                    v-if="showPlaying(scope.row.index)"
                    class="iconfont icon-shengyin-kai"
                    style="color: red"></span>
                </template>
              </el-table-column>
              <el-table-column width="35px" class-name="pointer">
                <template #default="scope">
                  <span
                    class="iconfont icon-xihuan"
                    @click="SetLike(scope.row)"
                    v-if="!isLike(scope.row)"></span>

                  <span
                    class="iconfont icon-xihuan2"
                    style="color: red"
                    @click="CancelLike(scope.row)"
                    v-if="isLike(scope.row)"></span>
                  <!-- <i
                    class="fa fa-heart-o"
                    aria-hidden="true"
                    ></i> -->
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="音乐"
                class-name="default"
                show-overflow-tooltip />
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
            <div
              style="margin: auto"
              class="font-12 author-color pointer"
              @click="GetPlaylistAll"
              v-if="!isPlaylistAll">
              ~~点击
              <span class="iconfont icon-loading"></span>
              加载更多音乐~~
            </div>
          </div>
          <!-- 评论区 -->
          <div class="comment-wrapper" v-if="tabCurrent == 1">
            <Comment :id="playlist.id" :type="2" />
          </div>
          <!-- 收藏者 -->
          <div class="pd-10" v-if="tabCurrent == 2">
            <subscribersWrappper
              :subscribers="playlist.subscribers"
              @getUserId="enterUserDetail" />
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup>
  import subscribersWrappper from '@/components/star/subscribersWrapper.vue'
  import Comment from '@/components/comment/Comment.vue'
  import tabMenu from '@/components/menus/tabMenu.vue'
  import { reactive, ref, toRefs, onMounted, computed, nextTick } from 'vue'
  import {
    getPlaylistDetail,
    setSubscribe,
    getPlaylistAll,
  } from '@/Api/api_playList'
  import { getSong, setLike } from '@/Api/api_song'
  import { useStore } from 'vuex'
  import { useRouter, useRoute } from 'vue-router'
  import useGetSong from '@/hooks/useGetSong'
  import {
    useCountFormate,
    useSingersFormate,
    useTimeFormate,
    useDateFormate,
  } from '@/hooks/useFormate'
  const loading = ref(true)

  onMounted(() => {
    GetPlaylistDetail()
    // setTimeout(() => {
    //   loading.value = false
    // }, 500)
  })

  const store = useStore()
  const router = useRouter()
  const route = useRoute()

  const data = reactive({
    // 歌单详情
    playlist: {},
    // 音乐tracks
    tracks: [],
    // 文本活动按钮
    tabCurrent: 0,
    // 按钮文本
    headerTabs: [{ title: '歌曲列表' }, { title: '评论' }, { title: '收藏者' }],
  })
  // 歌单创建时时间
  const playlistCreateTime = computed(() => {
    // const date = new Date(playlist.value.createTime)
    return useDateFormate(playlist.value.createTime)
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

  const playlistQuery = reactive({
    id: route.params.id,
    s: 20,
  })
  // 获取歌单详情页
  const GetPlaylistDetail = async () => {
    loading.value = true
    const res = await getPlaylistDetail(playlistQuery)
    console.log(res)
    if (res.code !== 200)
      return ElMessage({ message: '歌单详情获取失败', type: 'error' })
    playlist.value = res.playlist
    tracks.value = res.playlist.tracks
    headerTabs.value[1].title = '评论' + '(' + playlist.value.commentCount + ')'
    // console.log(playlist.value)
    console.log(tracks.value)
    setTimeout(() => {
      loading.value = false
    }, 1000)
  }
  // 添加索引
  const RowClassName = ({ row, rowIndex }) => {
    row.index = rowIndex
  }

  const { getSongUrl } = useGetSong()
  // 获取音乐数据
  const GetSong = async (row) => {
    // const songUrl = await getSongUrl(row.id)
    // const res=await getSong(row.id)
    // if(res.code!==200)return
    // if(!res.data[0].url) return ElMessage({ message: '音乐资源不存在', type: 'error' })
    // console.log(songUrl)
    store.commit('setPlaylists', playlist.value.tracks)
    store.commit('setPlayingSongIndex', row.index)
    // store.commit('setSongUrl', res.data[0].url)
    store.commit('setCurrentSongId')
  }

  // 正在播放图标
  const showPlaying = (index) => {
    // console.log(index)
    return playingIndex.value == index
  }
  const playingIndex = computed(() => {
    return store.state.playingSongIndex
  })
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
  // 播放全部
  const playAllPlayList = () => {
    store.commit('setPlaylists', playlist.value.tracks)
    store.commit('setPlayingSongIndex', 0)
    // store.commit('setSongUrl', res.data[0].url)
    store.commit('setCurrentSongId')
  }

  // 是否收藏
  const isSubscribe = computed(() => {
    return store.state.UserPlaylist.some(
      (item) => item.id === playlist.value.id
    )
  })
  //  是否为用户创建
  const isUserCreateLists = computed(() => {
    return store.getters.userCreateLists.some(
      (item) => item.id === playlist.value.id
    )
  })

  // 收藏
  const handleUserCollect = async () => {
    if (!store.state.isLogin)
      return ElMessage({ message: '请先登录', type: 'wran' })
    if (isUserCreateLists.value) return
    //取消收藏
    if (isSubscribe.value) {
      await setSubscribe(playlist.value.id, 2)
      store.dispatch('GetUserPlaylist')
      console.log('取消收藏')
    }
    // 收藏
    if (!isSubscribe.value) {
      await setSubscribe(playlist.value.id, 1)
      store.dispatch('GetUserPlaylist')
      console.log('收藏')
    }
  }
  const isPlaylistAll = ref(false)
  // 获取歌单所有音乐
  const GetPlaylistAll = async () => {
    if (!store.state.isLogin)
      return ElMessage({ message: '请先登录', type: 'wran' })
    let trackIds = playlist.value.trackIds.map((item) => item.id).join(',')
    // console.log(trackIds)
    const res = await getPlaylistAll(trackIds)
    if (res.code !== 200) return
    console.log(res)
    tracks.value = Object.freeze(res.songs)
    isPlaylistAll.value = true
  }

  const isLike = (row) => {
    return store.state.likeIdList.indexOf(row.id) != -1
  }

  // 喜欢歌曲
  const SetLike = async (row) => {
    if (!store.state.isLogin)
      return ElMessage({ message: '请先登录', type: 'wran' })
    store.dispatch('SetLike', { type: 'unshift', id: row.id })
  }
  // 取消喜欢歌曲
  const CancelLike = async (row) => {
    if (!store.state.isLogin)
      return ElMessage({ message: '请先登录', type: 'wran' })
    store.dispatch('SetLike', { type: 'delete', id: row.id })
  }
  // 活动添加样式按钮
  const tabActive = (index) => {
    tabCurrent.value = index
  }
  // 格式化音乐演唱歌手
  const SingersFormate = (row) => {
    // console.log(row)
    return useSingersFormate(row)
  }
  // 格式化时间
  const timeFormate = (row) => {
    return useTimeFormate(row.dt / 1000)
  }
  // 跳转用户页面
  const enterUserDetail = (id) => {
    router.push({ name: 'userDetail', params: { id } })
  }
  let { playlist, tracks, headerTabs, tabCurrent } = toRefs(data)
</script>
<style lang="less" scoped>
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
    display: flex;
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

  .content-wrapper {
    display: flex;
    flex-direction: column;
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

  @media screen and(max-width:768px) {
    .btn-text {
      display: none;
    }
    .song-search {
      display: none;
    }
  }
</style>
