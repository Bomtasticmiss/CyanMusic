<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="4" class="btn-changeTheme">
          <el-button :icon="Search" size="small" circle />
          <el-button :icon="Search" size="small" circle />
          <el-button :icon="Search" size="small" circle
        /></el-col>
        <el-col :span="3">
          <el-button text circle>
            <i class="fa fa-angle-left fa-2x"></i>
          </el-button>
          <el-button text circle>
            <i class="fa fa-angle-right fa-2x"></i> </el-button
        ></el-col>
        <el-col :span="7">
          <el-input v-model="input1" size="large" placeholder="search">
            <template #prefix>
              <i class="fa fa-search" aria-hidden="true"></i>
            </template> </el-input
        ></el-col>
        <el-col :span="10" class="user-area-container">
          <el-dropdown
            ref="dropdown1"
            trigger="contextmenu"
            placement="bottom-end"
          >
            <div class="full-user-area-container">
              <el-avatar
                :size="30"
                :src="circleUrl"
                alt="..."
                @click="showClick"
              >
              </el-avatar>
              <!-- <el-button @click="showClick" text> 姓名 </el-button> -->
              <button @click="showClick">姓名</button>
            </div>
            <template #dropdown>
              <el-dropdown-menu class="drop-width-container">
                <el-dropdown-item><router-link to="/login">账号</router-link></el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item disabled>Action 4</el-dropdown-item>
                <el-dropdown-item divided>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 菜单栏 -->
      <musicMenus />
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import musicMenus from "@/components/leftBar/musicMenus.vue";
import { ref } from "vue";
const dropdown1 = ref();

function showClick() {
  dropdown1.value.handleOpen();
}
</script>
<style scoped lang="less">
.el-header {
  // border-bottom: solid 1px;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  // height: 100%;
}
.el-header::after {
  content: "";
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
.el-input {
  --el-input-focus-border-color: #3534344a;
}
.user-area-container {
  display: flex;
  justify-content: flex-end;
}
.full-user-area-container {
  display: flex;
  align-items: center;
  .el-avatar {
    cursor: pointer;
  }
  button {
    padding: 10px;
    border-style: none;
    background-color: white;
    cursor: pointer;
  }
}
.drop-width-container {
  padding: 10px;
  width: 200px;
}
// :root{
//   --el-fill-color-light:white;
// }
// .btn-changeTheme {
//   .el-button {
//     padding: 10px;
//   }
// }
.el-aside {
  // height: 100%;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  background-color: aqua;
}
.grid-content1 {
  border-radius: 4px;
  min-height: 36px;
  background-color: rgb(94, 146, 146);
}
</style>
