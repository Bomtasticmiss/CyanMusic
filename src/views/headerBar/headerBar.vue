<template>
  <el-row>
    <el-col :span="4">
      <el-button size="small" circle />
      <el-button size="small" circle />
      <el-button size="small" circle
    /></el-col>
    <el-col :span="3">
      <el-button text circle @click="globalBack">
        <i class="fa fa-angle-left fa-2x"></i>
      </el-button>
      <el-button text circle @click="globalGo">
        <i class="fa fa-angle-right fa-2x"></i> </el-button
    ></el-col>
    <el-col :span="7">
      <el-input size="large" placeholder="search">
        <template #prefix>
          <i class="fa fa-search" aria-hidden="true"></i>
        </template> </el-input
    ></el-col>
    <el-col :span="10" class="user-area-container">
      <!-- <el-dropdown ref="dropdown1" trigger="contextmenu" placement="bottom-end"> -->
      <div class="full-user-area-container">
        <el-avatar :size="30" alt="..." @click="userLogin">
          <el-icon><UserFilled /></el-icon
        ></el-avatar>
        <!-- <el-button @click="showClick" text> 姓名 </el-button> -->
        <button @click="getUserInfo">未登录</button>
      </div>
      <!-- <template #dropdown>
          <el-dropdown-menu class="drop-width-container">
            <el-dropdown-item
              ><router-link to="/login">账号</router-link></el-dropdown-item
            >
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown> -->
    </el-col>
  </el-row>
</template>

<script setup>
  import { reactive, toRefs } from 'vue'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  const router = useRouter()
  const store = useStore()

  const dropdown1 = ref()
  //全局回退
  const globalBack = () => {
    router.go(-1)
  }
  //全局前进
  const globalGo = () => {
    router.go(1)
  }
  function showClick() {
    dropdown1.value.handleOpen()
  }
  const userLogin = () => {
    router.push('/login')
  }
  // 登录获取用户信息
  const getUserInfo = () => {
    if (!store.state.isLogin) {
      return ElMessage({ message: '请登录账号', type: 'warning' })
    } else {
      router.push()
    }
  }
</script>
<style lang="less" scoped>
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
    width: 170px;
  }
</style>
