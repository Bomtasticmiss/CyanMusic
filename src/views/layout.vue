<template>
  <!-- <el-container> -->
  <!-- 头部行 -->
  <!-- <el-header>
      <headerBar />
    </el-header>
    <el-container> -->
  <!-- 菜单栏 -->
  <!-- <musicMenus /> -->
  <!-- 内容显示 -->
  <!-- <el-main>
        <div style="width: 90%; margin: auto">
          <transition name="el-fade-in">
            <router-view></router-view>
          </transition>
        </div>
      </el-main>
    </el-container>
  </el-container> -->
  <!--底部播放器区域  -->
  <!-- <playFooter /> -->

  <!-- <KeepAlive> -->
  <!-- </KeepAlive> -->

  <div class="layout-wrapper">
    <div class="header">
      <headerBar />
    </div>
    <div class="main">
      <div class="aside">
        <musicMenus />
      </div>
      <div class="center-main" ref="centerMain">
        <div style="width: 90%; margin: auto">
          <router-view v-slot="{ Component }">
            <transition name="el-fade-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
    </div>
    <!-- :key="route.fullPath" -->
    <div class="footer">
      <playFooter />
    </div>
  </div>
</template>
<script setup>
  import headerBar from '@/views/headerBar/headerBar.vue'
  import musicMenus from '@/views/leftBar/musicMenus.vue'
  import playFooter from '../components/playFooter/playFooter.vue'
  import { watch, ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  const route = useRoute()
  const router = useRouter()

  const centerMain = ref()
  // 监听路由变化，重置滚动条
  watch(
    () => route.path,
    () => {
      // console.log(route.path)
      centerMain.value.scrollTo(0, 0)
      // console.log(centerMain.value)
    }
  )
</script>
<style scoped lang="less">
  /deep/ .el-container {
    // margin-bottom: 40px;
    height: 100%;
  }
  .layout-wrapper {
    // position: absolute;
    display: flex;
    flex-direction: column;
    // top: 0;
    // left: 0;
    width: 100%;
    height: 100%;
  }
  .header {
    // position: absolute;
    // top: 0;
    // left: 0;
    width: 100%;
    height: 8%;
    background-color: var(--theme_bg_color);
    z-index: 2001;
    box-shadow: rgba(0, 0, 0, 0.04) 0px 1px 3px,
      rgba(0, 0, 0, 0.08) 0px 4px 12px;
    transition: background-color 0.5s;
  }
  .main {
    position: relative;
    display: flex;
    height: 80%;
    .aside {
      overflow: auto;
      // width: 20%;
      // position: relative;
      transition: all 0.4s;
    }
    .center-main {
      overflow: auto;
      flex: 1;
    }
  }
  .footer {
    // position: absolute;
    // height: 11%;
    flex-grow: 0.98;
    z-index: 2001;
    // background-color: var(--theme_bg_color);
    box-shadow: rgba(0, 0, 0, 0.04) 0px -1px 3px,
      rgba(0, 0, 0, 0.08) 0px -4px 12px;
    transition: background-color 0.5s;
  }

  .el-header {
    // border-bottom: solid 1px;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    // height: 100%;
  }

  .el-header::after {
    content: '';
    // display: flex;
    position: absolute;
    // border-bottom: solid 1px;
    background-color: #ebeef5;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    z-index: 3;
  }

  /deep/ .el-input__wrapper {
    border-radius: 25px;
    background-color: #ebeef5;
    padding: 1px 23px;
  }

  /deep/ .el-input__inner {
    height: 36px;
  }

  .el-main {
    overflow: auto;
    height: 550px;
  }

  @media screen and (max-width: 768px) {
    .aside {
      position: absolute !important;
      left: -210px;
      z-index: 2001;
      height: 100%;
    }
  }

  @media screen and(max-width:769px) {
    .aside {
      position: absolute !important;
      left: -210px;
      z-index: 2001;
      height: 100%;
    }
  }
  // @media screen and (min-width: 1051px) {
  //   .aside {
  //     left: 0 !important;
  //   }
  // }
</style>
