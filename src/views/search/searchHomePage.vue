<template>
  <div>
    <div>
      <h3>搜索 {{ queryData.keywords }}</h3>
    </div>
    <div class="topMenus">
      <tabMenu
        :menuList="topMenus"
        v-model:mIndex="ActiveIndex"
        @getMenuIndex="MenuIndex" />
      <div class="font-12 author-color">
        找到{{ searchCount }}首{{ topMenus[ActiveIndex] }}
      </div>
    </div>
    <div
      class="btn-wrapper mtop-10"
      v-show="ActiveIndex == 0 || ActiveIndex == 6">
      <button class="btn-red btn">
        <span class="iconfont icon-play"></span>
        播放全部
      </button>
      <button class="btn-white btn mleft-10">
        <span class="iconfont icon-xiazai"></span>
        下载全部
      </button>
    </div>

    <!-- 骨架 -->
    <el-skeleton :loading="loading" animated>
      <template #template>
        <el-skeleton-item
          variant="text"
          style="width: 60%; height: 20px; margin-top: 10px" />
        <el-skeleton-item
          variant="text"
          style="width: 90%; height: 20px; margin-top: 10px" />
        <el-skeleton-item
          variant="text"
          style="width: 90%; height: 20px; margin-top: 10px" />
        <el-skeleton-item
          variant="text"
          style="width: 90%; height: 20px; margin-top: 10px" />
        <el-skeleton-item
          variant="text"
          style="width: 90%; height: 20px; margin-top: 10px" />
        <el-skeleton-item
          variant="text"
          style="width: 90%; height: 20px; margin-top: 10px" />
        <el-skeleton-item
          variant="text"
          style="width: 90%; height: 20px; margin-top: 10px" />
        <el-skeleton-item
          variant="text"
          style="width: 90%; height: 20px; margin-top: 10px" />
        <el-skeleton-item
          variant="text"
          style="width: 90%; height: 20px; margin-top: 10px" />
        <el-skeleton-item
          variant="text"
          style="width: 80%; height: 20px; margin-top: 10px" />
        <el-skeleton-item
          variant="text"
          style="width: 80%; height: 20px; margin-top: 10px" />
      </template>
      <template #default>
        <div class="content-wrapper">
          <div v-if="ActiveIndex == 0">
            <songList :tracks="searchData" />
          </div>
          <div v-if="ActiveIndex == 1">
            <tableList
              :data="searchData"
              :t-name="80"
              :t-img="10"
              :t-icon="10"
              @rowClick="enterPage">
              <template #t-img="{ item }">
                <img
                  v-lazy="item.picUrl + '?param=60y60'"
                  alt=""
                  style="border-radius: 5px; width: 60px; height: 60px"
                  class="mleft-10" />
              </template>
              <template #t-name="{ item }">
                <span class="mleft-10"> {{ item.name }}</span>
              </template>
              <template #t-icon>
                <span class="iconfont icon-user" style="color: #d81e06"></span>
              </template>
            </tableList>
          </div>
          <!-- 专辑 -->
          <div v-if="ActiveIndex == 2">
            <tableList
              :data="searchData"
              :t-img="8"
              :t-name="57"
              :t-title="45"
              @rowClick="enterPage">
              <template #t-img="{ item }">
                <img
                  v-lazy="item.picUrl + '?param=60y60'"
                  alt=""
                  style="border-radius: 5px; width: 60px; height: 60px"
                  class="mleft-10" />
              </template>
              <template #t-title="{ item }">
                <span class="mleft-10"> {{ item.name }}</span>
              </template>
              <template #t-name="{ item }">
                <span class="mleft-10" v-if="item.artists">
                  {{ item.artists[0].name }}</span
                >
              </template>
            </tableList>
          </div>
          <div v-if="ActiveIndex == 3">
            <videoList :videoData="searchData">
              <template #img="{ item }">
                <el-image
                  style="
                    width: 100%;
                    height: 140px;
                    /* height: 160px; */
                    border-radius: 4px;
                  "
                  :src="item.coverUrl + '?param=290y140'">
                  <template #placeholder>
                    <div style="width: 100%">
                      <img src="@/assets/img/loading-2.gif" alt="" />
                    </div>
                  </template>
                </el-image>
              </template>
              <template #playcount="{ item }">
                {{ useCountFormate(item.playTime) }}
              </template>
              <template #title="{ item }">
                {{ item.title }}
              </template>
              <template #nickname="{ item }">
                <span v-if="item.creator">
                  by{{ item.creator[0].userName }}
                </span>
              </template>
            </videoList>
          </div>
          <!-- 歌单 -->
          <div v-if="ActiveIndex == 4">
            <tableList
              :data="searchData"
              :t-img="10"
              :t-name="30"
              :t-title="40"
              :t-count="10"
              :t-playcount="10"
              @rowClick="enterPage">
              <template #t-img="{ item }">
                <img
                  v-lazy="item.coverImgUrl + '?param=60y60'"
                  alt=""
                  style="border-radius: 5px; width: 60px; height: 60px"
                  class="mleft-10" />
              </template>
              <template #t-title="{ item }">
                <span class="mleft-10"> {{ item.name }}</span>
              </template>
              <template #t-count="{ item }">
                <span class="mleft-10"> {{ item.trackCount }}首</span>
              </template>
              <template #t-name="{ item }">
                <span class="mleft-10" v-if="item.creator">
                  {{ item.creator.nickname }}</span
                >
              </template>
              <template #t-playcount="{ item }">
                <span class="iconfont icon-play1"></span>
                <span class="mleft-10">
                  {{ useCountFormate(item.playCount) }}</span
                >
              </template>
            </tableList>
          </div>
          <div v-show="ActiveIndex == 5"></div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup>
  import { reactive, ref, onMounted, computed, watch } from 'vue'
  import { search } from '@/Api/api_search'
  import tabMenu from '@/components/menus/tabMenu.vue'
  import songList from '@/components/songList/songList.vue'
  import videoList from '@/components/video/videoList.vue'
  import tableList from '@/components/tableList/tableList.vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useCountFormate } from '@/hooks/useFormate'
  import merge from 'webpack-merge'
  const router = useRouter()
  const route = useRoute()

  const loading = ref(false)

  const topMenus = ref([
    '单曲',
    '歌手',
    '专辑',
    '视频',
    '歌单',
    '歌词',
    '声音',
    '用户',
  ])

  /* 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 
  1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频,
   1018:综合, 2000:声音*/
  const _typeId = ref([1, 100, 10, 1014, 1000, 1006, 2000, 1002])

  const ActiveIndex = ref(0)

  watch(
    () => ActiveIndex.value,
    (val) => {
      router.replace({
        path: `/search/${route.params.keywords}`,
        query: { index: val },
      })
      // router.push({query:merge(route.query,{'index':val})})
      searchData.value = []
      queryData.type = _typeId.value[val]
      Search()
    }
  )
  // 监听路由数据重载
  // watch(
  //   () => route.params.keywords,
  //   (val) => {
  //     if (route.name != 'search') return
  //     // ActiveIndex.value = 0
  //     searchData.value = []
  //     // queryData.type = _typeId.value[0]
  //     queryData.keywords = val
  //     Search()
  //   }
  // )

  const MenuIndex = (index) => {
    if (index == ActiveIndex.value) return
    // route.query.index=index
    router.push({
      path: `/search/${route.params.keywords}`,
      query: { index: index },  
    })
    // router. (`/search/${route.params.keywords}/${index}`)
    searchData.value = []
    ActiveIndex.value = index
    queryData.type = _typeId.value[index]
    Search()
  }

  onMounted(() => {
    console.log(route.query)
    queryData.keywords = route.params.keywords
    ActiveIndex.value = Number(route.query.index)
    Search()
  })

  // 查询参数
  const queryData = reactive({
    keywords: '',
    limit: 30,
    offset: 0,
    type: 1,
  })

  const searchData = ref([])
  // 搜索条数
  const searchCount = ref(0)

  const Search = async () => {
    loading.value = true
    const res = await search(queryData)
    console.log(res)
    if (res.code !== 200) return
    switch (ActiveIndex.value) {
      case 0:
        searchData.value = Object.freeze(res.result.songs)
        searchCount.value = res.result.songCount
        break
      case 1:
        searchData.value = Object.freeze(res.result.artists)
        searchCount.value = res.result.artistCount
        break
      case 2:
        searchData.value = Object.freeze(res.result.albums)
        searchCount.value = res.result.albumCount
        break
      case 3:
        searchData.value = Object.freeze(res.result.videos)
        searchCount.value = res.result.videoCount
        break
      case 4:
        searchData.value = Object.freeze(res.result.playlists)
        searchCount.value = res.result.playlistCount
        break
    }
    loading.value = false
  }

  const enterPage = ({id}) => {
    switch (ActiveIndex.value) {
      case 0:
        break
      case 1:
        router.push(`/artistDetail/${id}`)
        break
      case 2:
        router.push(`/albumDetail/${id}`)
        break
      case 3:
        break
      case 4:
        router.push(`/playlistDetail/${id}`)
        break
    }
  }
</script>
<style scoped lang="less">
  .topMenus {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
