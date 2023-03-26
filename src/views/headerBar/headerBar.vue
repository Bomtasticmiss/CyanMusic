<template>
  <el-row>
    <el-col :span="4" class="theme">
      <el-button size="small" circle />
      <el-button size="small" circle />
      <el-button size="small" circle
    /></el-col>
    <el-col :span="4" class="left-menus" style="color: white; display: none">
      <span
        class="iconfont icon-menu"
        @click="openMenu"
        v-show="!showMenuInPhone"></span>
      <span
        class="iconfont icon-quxiao-xian"
        @click="openMenu"
        v-show="showMenuInPhone"></span>
    </el-col>
    <el-col :span="3">
      <div style="display: flex; color: white">
        <span
          text
          circle
          @click="globalBack"
          style="width: 30px"
          class="pointer">
          <i class="fa fa-angle-left fa-2x"></i>
        </span>
        <span
          text
          circle
          @click="globalGo"
          style="width: 30px"
          class="pointer globalGo">
          <i class="fa fa-angle-right fa-2x"></i>
        </span></div
    ></el-col>
    <el-col :span="10">
      <!-- 搜索框 -->
      <div class="search-wrapper">
        <input
          type="text"
          class="search"
          placeholder="搜索"
          @focus="showSearchHot"
          @blur="isSearchShow = false" />
        <span class="serachIcon" style="color: white">
          <i class="fa fa-search" aria-hidden="true"></i>
        </span>
        <transition name="el-fade-in-linear">
          <div class="search-container" v-show="isSearchShow">
            <div class="font-14">热搜榜</div>
            <ul>
              <li
                v-for="(item, index) in searchHotList"
                :key="index"
                class="mtop-20 pointer">
                <div
                  :style="{ color: index < 3 ? '#e13e3e' : '#c2c2c2' }"
                  class="mleft-5">
                  {{ index + 1 }}
                </div>
                <div class="mleft-20">
                  <div>
                    <span class="font-14">{{ item.searchWord }}</span>
                    <span class="mleft-10 font-12" style="color: #c2c2c2">{{
                      item.score
                    }}</span>
                  </div>
                  <div class="font-12 mtop-5" style="color: #c2c2c2">
                    {{ item.content }}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </el-col>
    <el-col :span="7" class="user-area-container">
      <!-- <el-dropdown ref="dropdown1" trigger="contextmenu" placement="bottom-end"> -->
      <div class="full-user-area-container">
        <el-avatar
          :size="30"
          alt="..."
          :src="profile.avatarUrl"
          @click="userLogin">
          <el-icon><UserFilled /></el-icon
        ></el-avatar>
        <div @click="getUserInfo" class="font-12 pointer username">
          <div class="mleft-5 text-hidden">
            <span v-if="!isLogin">未登录</span
            ><span v-if="isLogin">{{ profile.nickname }}</span>
          </div>
        </div>
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
  import { computed, onMounted, nextTick } from 'vue'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import { getSearchHot, getSearchHotDetail } from '@/Api/api_search'

  const router = useRouter()
  const store = useStore()

  //全局回退
  const globalBack = () => {
    router.go(-1)
  }
  //全局前进
  const globalGo = () => {
    router.go(1)
  }

  onMounted(() => {
    // GetSearchHot()
  })

  // 热搜列表
  const searchHotList = ref([])
  // 获取热搜列表
  const GetSearchHot = async () => {
    const res = await getSearchHotDetail()
    console.log(res)
    if (res.code !== 200) return
    searchHotList.value = res.data
  }

  const isSearchShow = ref(false)

  const showSearchHot = () => {
    isSearchShow.value = true
    GetSearchHot()
  }

  const userLogin = () => {
    router.push('/login')
  }
  // 登录获取用户信息
  const getUserInfo = () => {
    if (!store.state.isLogin) {
      return ElMessage({ message: '请登录账号', type: 'warning' })
    } else {
      router.push({
        name: 'userDetail',
        params: { id: store.state.account.id },
      })
    }
  }
  // 用户信息
  const profile = computed(() => {
    return store.state.profile
  })

  const isLogin = computed(() => {
    return store.state.isLogin
  })

  const showMenuInPhone = ref(false)

// phone打开菜单页
  const openMenu = () => {
    if (!showMenuInPhone.value)
      nextTick(() => {
        document.querySelector('.aside').style.left = 0 + 'px'
      })
    else
      nextTick(() => {
        document.querySelector('.aside').style.left = -210 + 'px'
      })
    showMenuInPhone.value = !showMenuInPhone.value
  }
</script>
<style lang="less" scoped>
  .el-row {
    align-items: center;
    height: 100%;
    padding: 0 10px;
    justify-content: space-between;
  }

  .search-wrapper {
    position: relative;
    .search {
      border-radius: 15px;
      height: 35px;
      // width: 200px;
      background-color: #e13e3e;
      border: none;
      outline: none;
      padding: 0 30px;
      color: rgb(240, 240, 240);
    }
    .serachIcon {
      left: 10px;
      top: 5px;
      position: absolute;
    }
    .search-container {
      position: absolute;
      margin-top: 10px;
      width: 300px;
      height: 400px;
      z-index: 1000;
      background-color: white;
      border-radius: 5px;
      box-shadow: 1px 2px 8px #e5e5e5;
      padding: 10px;
      overflow: auto;
      // transition: all 0.8s;
      // animation: s 0.4s;
      ul {
        li {
          display: flex;
          align-items: center;
        }
        // list-style: none;
      }
    }
    @keyframes s {
      0% {
        // transform: translateX(-5%);
        opacity: 0;
      }
      100% {
        // transform: translateX(0%);
        opacity: 1;
      }
    }
  }

  .username {
    width: 100px;
    color: white;
  }
  /deep/ .el-input__wrapper {
    background-color: #e13e3e !important;
  }
  .el-input {
    // --el-input-focus-border-color: #3534344a;
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
  @media screen and(max-width:768px) {
    .left-menus {
      display: block !important;
    }
    .theme {
      display: none;
    }
    .globalGo {
      display: none;
    }
    .search {
      width: 100px;
    }
    .search-container {
      width: 250px !important;
    }
    .username {
      width: 4rem;
      // color: white;
    }
  }
</style>
