<template>
  <el-aside width="200px">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item-group title="logo"> </el-menu-item-group>
      <el-menu-item index="1">
        <el-icon><i class="fa fa-th-large" aria-hidden="true"></i></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item-group title="发现"> </el-menu-item-group>
      <el-menu-item index="2">
        <el-icon><i class="fa fa-music" aria-hidden="true"></i></el-icon>
        <span>乐库</span>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon><i class="fa fa-youtube-play" aria-hidden="true"></i></el-icon>
        <span>视频</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <span>电台</span>
      </el-menu-item>
      <el-menu-item index="5">
        <el-icon><i class="fa fa-align-left" aria-hidden="true"></i></el-icon>
        <span>歌单</span>
      </el-menu-item>
      <el-menu-item-group title="美化"> </el-menu-item-group>
      <el-menu-item index="6">
        <el-icon><i class="fa fa-magic" aria-hidden="true"></i></el-icon>
        <span>歌单</span>
      </el-menu-item>
      <el-menu-item-group title="收藏"> </el-menu-item-group>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { toRefs } from "vue";
</script>
<style lang="less" scoped>
.el-menu {
  margin-left: 10px;
  margin-right: 10px;
}
.el-menu-item {
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
}
.el-menu-item:hover {
  background-color: rgba(169, 175, 175, 0.693);
}
</style>
