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
      <div class="search-wrapper" ref="searchContainer">
        <input
          type="text"
          class="search"
          :placeholder="searchDefault"
          @focus="showSearchHot"
          v-model="inputword"
          @keyup.enter="enterList(inputword)" />
        <span
          class="serachIcon pointer"
          style="color: white"
          @click="enterList(inputword)">
          <i class="fa fa-search" aria-hidden="true"></i>
        </span>
        <div
          style="position: relative"
          v-show="inputword != ''&&isSearchShow"
          @click="inputword = ''">
          <span class="iconfont icon-quxiao serachCancelIcon pointer"> </span>
        </div>
        <transition name="el-fade-in-linear">
          <div class="search-container" v-show="isSearchShow" ref="searchBottom">
            <!-- 搜索历史 -->
            <div class="search-history">
              <div
                class="search-history-title font-14 mleft-10 mright-10 min-color">
                <div>
                  搜索历史
                  <span
                    class="iconfont icon-delete pointer"
                    style="font-size: 12px !important"
                    @click="clearHistoryALL"></span>
                </div>
                <div
                  class="pointer font-12"
                  @click="isShowHistoryData = true"
                  v-show="!isShowHistoryData">
                  查看全部
                </div>
                <div
                  class="pointer font-12"
                  @click="isShowHistoryData = false"
                  v-show="isShowHistoryData">
                  收起
                </div>
              </div>
              <div
                class="history mtop-10 mbtm-10"
                :style="{
                  'max-height': isShowHistoryData ? 'fit-content' : '60px',
                  'overflow': isShowHistoryData ? 'visible' : 'hidden',
                }">
                <button
                  v-for="(item, index) in searchData"
                  :key="index"
                  class="btn-list btn btn-white font-12 mleft-10 mtop-5"
                  @click="enterList(item)">
                  {{ item }}
                  <span
                    class="iconfont icon-cancel cancel"
                    style="font-size: 12px !important; z-index: 1000"
                    @click="clearHitory($event, index)"></span>
                </button>
              </div>
            </div>
            <div class="font-14 mleft-10">热搜榜</div>
            <!-- 热搜列表 -->
            <ul>
              <li
                v-for="(item, index) in searchHotList"
                :key="index"
                class="mtop-10 pointer searchList"
                @click="enterList(item.searchWord)">
                <div
                  :style="{ color: index < 3 ? '#e13e3e' : '#c2c2c2' }"
                  class="mleft-15">
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
  import {
    getSearchHot,
    getSearchHotDetail,
    getSearchDefault,
  } from '@/Api/api_search'

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
    GetSearchHot()
    GetSearchDefault()
    searchData.value =
      JSON.parse(window.localStorage.getItem('search-history')) || []
  })
  const inputword = ref('')
  // 历史搜索数据
  const searchData = ref([])

  const isShowHistoryData = ref(false)
  // 点击热搜词条，搜索
  const enterList = (searchWord) => {
    // 使用默认词条
    if (searchWord == '') {
      inputword.value = searchDefault.value
    } else {
      inputword.value = searchWord
    }
    //更新searchWord历史记录到首位
    let index = searchData.value.indexOf(inputword.value)
    if (index != -1) {
      searchData.value = searchData.value
        .splice(index, 1)
        .concat(searchData.value)
    } else {
      searchData.value.unshift(inputword.value)
    }
    window.localStorage.setItem(
      'search-history',
      JSON.stringify(searchData.value)
    )
    router.push({name:'search',params:{keywords:inputword.value},query:{index:0}})
    isSearchShow.value = false
    isShowHistoryData.value=false
    searchBottom.value.scrollTo(0, 0)
    window.removeEventListener('click', closeContainer)
  }

  // 清除所有历史记录
  const clearHistoryALL = () => {
    searchData.value = []
  }
  //清除历史记录
  const clearHitory = (e, index) => {
    searchData.value.splice(index, 1)
    window.localStorage.setItem(
      'search-history',
      JSON.stringify(searchData.value)
    )
    e.stopPropagation()
  }
  // 热搜列表
  const searchHotList = ref([])
  // 获取热搜列表
  const GetSearchHot = async () => {
    const res = await getSearchHotDetail()
    console.log(res)
    if (res.code !== 200) return
    searchHotList.value = res.data
  }

  // 默认搜索关键词
  const searchDefault = ref('搜索')
  // 获取默认搜索关键词
  const GetSearchDefault = async () => {
    const res = await getSearchDefault()
    console.log(res)
    if (res.code !== 200) return
    searchDefault.value = res.data.showKeyword
  }
  //搜索框显示
  const isSearchShow = ref(false)

  const searchContainer = ref(null)

  const searchBottom=ref(null)

  const showSearchHot = () => {
    isSearchShow.value = true
    GetSearchHot()
    setTimeout(() => {
      window.addEventListener('click', closeContainer)
    }, 300)
  }
  const closeContainer = (e) => {
    console.log(searchContainer.value.contains(e.target))
    if (!searchContainer.value.contains(e.target)) {
      isSearchShow.value = false
      isShowHistoryData.value=false
      searchBottom.value.scrollTo(0, 0)
      window.removeEventListener('click', closeContainer)
    }
  }
  // const
  // @blur="isSearchShow = false"
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
    display: flex;
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
    .serachCancelIcon {
      position: absolute;
      top: 8px;
      left: -19px;
      color: white;
    }
    .search-container {
      position: absolute;
      top: 35px;
      margin-top: 10px;
      width: 300px;
      height: 400px;
      z-index: 1000;
      background-color: white;
      border-radius: 5px;
      box-shadow: 1px 2px 8px #e5e5e5;
      padding: 10px 0px;
      overflow:auto ;
      // transition: all 0.8s;
      // animation: s 0.4s;
      .search-history {
        .search-history-title {
          display: flex;
          justify-content: space-between;
        }
        .history {
          .btn-list {
            padding: 4px 2px 4px 12px;
            .cancel {
              visibility: hidden;
            }
            height: 25px;
            &:hover .cancel {
              visibility: visible;
            }
          }
        }
      }
      ul {
        li {
          display: flex;
          align-items: center;
          height: 50px;
          border-radius: 2px;
          &:hover {
            background-color: #e5e5e5;
          }
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
