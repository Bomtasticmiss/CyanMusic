<template>
  <div>
    <div>
      <tabMenu :menuList="topMenus" pattern="router" />
    </div>
    <!-- <transition name="el-fade-in"> -->
      <router-view></router-view>
    <!-- </transition> -->
  </div>
</template>

<script setup>
  import tabMenu from '@/components/menus/tabMenu.vue'
  import { ref } from 'vue'

  const topMenus = ref([
    { title: '个性推荐', router: '/homeRmd' },
    { title: '分类歌单', router: '/playList' },
    { title: '排行榜', router: '/songRank' },
    { title: '歌手', router: '/singers' },
    { title: '新歌速递', router: '/newSongRmd' },
  ])
</script>
<style scoped></style>
