<template>
  <el-container>
    <!-- 头部行 -->
    <el-header>
      <headerBar />
    </el-header>
    <el-container>
      <!-- 菜单栏 -->
      <musicMenus />
      <!-- 内容显示 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  <!--底部播放器区域  -->
  <playFooter />
</template>
<script setup>
import headerBar from './headerBar/headerBar.vue'
import musicMenus from './menus/musicMenus'
import playFooter from './playFooter/playFooter.vue'

import {useRouter} from 'vue-router'

const router = useRouter()
</script>
<style scoped lang="less">
/deep/ .el-container {
		// margin-bottom: 40px;
		height: 100%;
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
  height: 530px;
}

.el-main::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 5px;
  scrollbar-arrow-color: red;
}

.el-main::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
  scrollbar-arrow-color: red;
}

.el-main::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(238, 210, 210, 0.3);
  border-radius: 5px;
  background: rgba(221, 197, 197, 0);
}
</style>
