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
      <div class="center-main">
        <div style="width: 90%; margin: auto">
          <transition name="el-fade-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div>
    <div class="footer">
      <playFooter />
    </div>
  </div>
</template>
<script setup>
  import headerBar from '@/views/headerBar/headerBar.vue'
  import musicMenus from '@/views/leftBar/musicMenus.vue'
  import playFooter from '../components/playFooter/playFooter.vue'

  import { useRouter } from 'vue-router'

  const router = useRouter()
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
  }
  .main {
    // position: absolute;
    display: flex;
    height: 80%;
    .aside {
      // width: 20%;
    }
    .center-main {
      overflow: auto;
      flex: 1;
    }
  }
  .footer {
    // position: absolute;
    height: 11%;
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

  // :root{
  //   --el-fill-color-light:white;
  // }
  // .btn-changeTheme {
  //   .el-button {
  //     padding: 10px;
  //   }
  // }

  .el-main {
    overflow: auto;
    height: 550px;
  }

  .center-main::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 5px;
    scrollbar-arrow-color: red;
  }

  .center-main::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
    scrollbar-arrow-color: red;
  }

  .center-main::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(238, 210, 210, 0.3);
    border-radius: 5px;
    background: rgba(221, 197, 197, 0);
  }
</style>
