<template>
  <el-aside width="200px">
    <el-menu :default-active="activeMenus" router @select="selectMenuIndex">
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
      <el-menu-item index="/videoHome">
        <el-icon><i class="fa fa-youtube-play" aria-hidden="true"></i></el-icon>
        <span>视频</span>
      </el-menu-item>
      <el-menu-item index="/fmPage">
        <el-icon><setting /></el-icon>
        <span>FM</span>
      </el-menu-item>
      <el-menu-item index="/dailyRmd">
        <el-icon><i class="fa fa-align-left" aria-hidden="true"></i></el-icon>
        <span>每日推荐</span>
      </el-menu-item>
      <el-menu-item-group title="我的音乐"> </el-menu-item-group>
      <el-menu-item index="/recentPlay">
        <span class="iconfont icon-lishixiao mright-5"></span>
        <span>最近播放</span>
      </el-menu-item>
      <el-menu-item-group title="创建的歌单"> </el-menu-item-group>
      <!-- <template v-if="userCreateLists"> -->
      <el-menu-item
        :index="tranPath(item.id)"
        v-for="(item, index) in userCreateLists"
        :key="item.id">
        <span v-if="index == 0" class="iconfont icon-xihuan1"></span>
        <span v-else class="iconfont icon-music_playlist"></span>
        <span class="font-14 text-hidden">{{ item.name }}</span>
      </el-menu-item>
      <el-menu-item-group title="收藏的歌单"> </el-menu-item-group>
      <el-menu-item
        :index="tranPath(item.id)"
        v-for="item in userCollectLists"
        :key="item.id">
        <span class="iconfont icon-music_playlist"></span>
        <span class="font-14 text-hidden">{{ item.name }}</span>
      </el-menu-item>
      <!-- </template> -->
    </el-menu>
    <!-- <button @click="yy"></button>
      <router-link to="/home/musicRmd">sss</router-link> -->
  </el-aside>
</template>

<script setup>
  import { ref, reactive, onMounted, computed, watch } from 'vue'
  import { getUserPlaylist } from '@/Api/api_user'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  const store = useStore()

  const route = useRoute()

  onMounted(() => {
    // GetSubcount()
    if (sessionStorage.getItem('activeMenus')) {
      activeMenus.value = sessionStorage.getItem('activeMenus')
    }
  })

  const activeMenus = ref('/homeRmd')

  const selectMenuIndex = (index) => {
    activeMenus.value = index
    console.log(index)
    sessionStorage.setItem('activeMenus', index)
  }

  watch(route, () => {})

  // 用户创建的歌单
  const userCreateLists = computed(() => {
    return store.getters.userCreateLists
  })

  //用户收藏的歌单
  const userCollectLists = computed(() => {
    return store.getters.userCollectLists
  })

  const tranPath = (id) => {
    return `/playlistDetail/${id}`
  }
</script>
<style lang="less" scoped>
  .el-menu {
    height: 100%;
  }

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
