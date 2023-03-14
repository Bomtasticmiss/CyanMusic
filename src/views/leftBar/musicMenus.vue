<template>
  <el-aside width="200px">
    <el-menu default-active="/homeRmd" router>
      <el-menu-item index="/homeRmd">
        <el-icon>
          <i class="fa fa-th-large" aria-hidden="true"></i>
        </el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item-group title="发现"> </el-menu-item-group>
      <el-menu-item index="2">
        <el-icon><i class="fa fa-music" aria-hidden="true"></i></el-icon>
        <span>乐库</span>
      </el-menu-item>
      <el-menu-item index="/videoHomePage">
        <el-icon><i class="fa fa-youtube-play" aria-hidden="true"></i></el-icon>
        <span>视频</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <span>FM</span>
      </el-menu-item>
      <el-menu-item index="/dailyRmd">
        <el-icon><i class="fa fa-align-left" aria-hidden="true"></i></el-icon>
        <span>每日推荐</span>
      </el-menu-item>
      <el-menu-item-group title="我的音乐"> </el-menu-item-group>
      <el-menu-item index="">
        <span class="iconfont icon-xihuan1 mright-5"></span>
        <span>我喜欢的音乐</span>
      </el-menu-item>
      <el-menu-item index="/recentPlay">
        <span class="iconfont icon-lishixiao mright-5"></span>
        <span>最近播放</span>
      </el-menu-item>
      <el-menu-item-group title="创建的歌单"> </el-menu-item-group>
      <el-menu-item index="/playlistDetail" v-for="item in userCreateLists" :key="item.id">
        <span class="iconfont icon-music_playlist"></span>
        <span class="font-14 text-hidden">{{item.name}}</span>
      </el-menu-item>
    </el-menu>
    <!-- <button @click="yy"></button>
      <router-link to="/home/musicRmd">sss</router-link> -->
  </el-aside>
</template>

<script setup>
  import { ref, reactive, onMounted, computed } from 'vue'
  import { useStore } from 'vuex'
  import { getUserPlaylist } from '@/Api/api_user'
  const store = useStore()

  onMounted(() => {
    // GetSubcount()
    GetUserPlaylistl()
  })

  const userQuery = reactive({
    limit: 30,
    offset: 0,
  })

  const uid = computed(() => {
    return store.state.account.id
  })
  //用户歌单列表
  const userLists = ref([])

  const GetUserPlaylistl = async () => {
    if(!uid.value)return 
    const res = await getUserPlaylist({ uid: uid.value, limit: 30, offset: 0 })
    console.log(11111)
    // if (res.code !== 200) return
    console.log(res)
    userLists.value = Object.freeze(res.playlist)
  }

  // 用户创建的歌单
  const userCreateLists = computed(() => {
    return userLists.value.filter((item) => item.userId == uid.value)
  })
  //用户收藏的歌单
  const userCollectLists = computed(() => {
    return userLists.value.filter((item) => item.userId != uid.value)
  })
</script>
<style lang="less" scoped>

  // .el-menu {
  //   margin-left: 10px;
  //   margin-right: 10px;
  // }

  .el-menu-item {
    height: 40px;
    line-height: 40px;
    border-radius: 1px;
  }

  .el-menu-item.is-active {
    color: #9f4949 !important;
    font-size: 18px;
    // font-weight: bold;
}

  .el-menu-item:hover {
    background-color: rgba(203, 203, 203, 0.693);
  }
</style>
