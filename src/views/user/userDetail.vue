<template>
  <div class="user-wrapper">
    <div class="userInfo-wrapper">
      <div class="avator">
        <img :src="userInfo.avatarUrl" alt="头像" />
      </div>
      <div class="userInfo mleft-20">
        <div class="nickname fontbd-700 font-20" v-if="userInfo">
          {{ userInfo.nickname }}
        </div>
        <div>
          <button class="level btn"><span>Lv</span>{{ userInfo.level }}</button>
        </div>
        <div class="line mtop-10"></div>
        <div class="publishInfo mtop-10">
          <div class="publish-item border-right pointer">
            <div>{{ userInfo.eventCount }}</div>
            <div class="font-14">动态</div>
          </div>
          <div class="publish-item border-right pointer">
            <div>{{ userInfo.follows }}</div>
            <div class="font-14">关注</div>
          </div>
          <div
            class="publish-item border-right pointer"
            @click="GetUserFolloweds">
            <div>{{ userInfo.followeds }}</div>
            <div class="font-14">粉丝</div>
          </div>
        </div>
        <div class="font-12 mtop-5"><span>所在地区</span></div>
        <div class="font-12 mtop-5"><span>社交网络</span></div>

        <div class="font-12 mtop-5"><span>个人介绍</span></div>
      </div>
    </div>
    <div class="userSong-wrapper">
      <tabMenu
        :menuList="['创建的歌单', '收藏的歌单', '创建的音乐专栏']"
        v-model:mIndex="tabCurrent" />
    </div>
    <div class="list-wrapper">
      <playlistCard
        v-for="List in tabCurrent == 0 ? userCreateLists : userCollectLists"
        :key="List.id"
        :imgsrc="List.coverImgUrl"
        :title="List.name"
        :playCount="useCountFormate(List.playCount)"
        @click="enterSongDetail(List.id)" />
    </div>
  </div>
</template>

<script setup>
  import { reactive, toRefs, ref, onMounted, computed } from 'vue'
  import {
    getSubcount,
    getUserDetail,
    getUserPlaylist,
    getUserFolloweds,
  } from '@/Api/api_user'
  import tabMenu from '@/components/menus/tabMenu.vue'
  import playlistCard from '@/components/card/playlistCard.vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  import { useCountFormate } from '@/hooks/useFormate'
  import router from '@/router'
  const store = useStore()
  const route = useRoute()
  const userInfo = ref({})

  onMounted(() => {
    // GetSubcount()
    GetUserDetail()
    GetUserPlaylistl()
  })

  const tabCurrent = ref(0)

  const GetSubcount = async () => {
    const res = await getSubcount()
    // if (res.code !== 200) return
    // console.log(res)
  }

  const userQuery = reactive({
    uid: route.params.id,
    limit: 30,
    offset: 0,
  })

  const GetUserDetail = async () => {
    const res = await getUserDetail(userQuery.uid)
    console.log(res)
    if (res.code !== 200) return
    res.profile.level = res.level
    userInfo.value = Object.freeze(res.profile)
  }
  //用用户歌单列表
  const userLists = ref([])

  const GetUserPlaylistl = async () => {
    const res = await getUserPlaylist(userQuery.uid)
    if (res.code !== 200) return
    console.log(res)
    userLists.value = Object.freeze(res.playlist)
  }
  // 用户创建的歌单
  const userCreateLists = computed(() => {
    return userLists.value.filter((item) => item.userId == userQuery.uid)
  })
  //用户收藏的歌单
  const userCollectLists = computed(() => {
    return userLists.value.filter((item) => item.userId != userQuery.uid)
  })

  const userFollowedsQuery = reactive({
    uid: route.params.id,
    limit: 30,
    offset: 0,
  })

  const GetUserFolloweds = async () => {
    const res = await getUserFolloweds(userFollowedsQuery)
    console.log(res)
  }

  const enterSongDetail = (id) => {
    router.push({ name: 'playlistDetail', params: { id } })
  }
</script>
<style scoped lang="less">
  .user-wrapper {
    margin-top: 20px;
  }
  .userInfo-wrapper {
    display: flex;
    .avator {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      border: 1px solid rgb(222, 222, 222);
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .userInfo {
      display: flex;
      flex-grow: 1;
      flex-direction: column;
    }
    .level {
      padding: 0 10px;
      height: 20px;
    }
    .publishInfo {
      display: flex;
      text-align: center;
      .publish-item {
        width: 80px;
        margin-top: 4px;
      }
    }
  }

  .list-wrapper {
    display: flex;
    flex-wrap: wrap;
  }
</style>
