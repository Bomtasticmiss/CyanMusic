<template>
  <div>
    <div class="top-display-wrapper">
      <img :src="topDisplay.coverImgUrl" alt="顶端背景" class="img-back" />
      <img
        :src="topDisplay.coverImgUrl"
        alt="顶端歌单图片"
        class="imgDisplay pointer" 
        @click="transferPlayList(topDisplay.id)"/>
      <div class="display-left">
        <button class="btn tastBtn" @click="transferPlayList(topDisplay.id)">
          <i class="fa fa-university" aria-hidden="true"></i>
          <span class="mleft-5">品鉴歌单</span>
        </button>
        <div class="mtop-10">
          {{ topDisplay.name }}
        </div>
      </div>
    </div>
    <div class="catList-wrapper">
      <div>
        <button class="btn cat-btn" @click="handleHiddenSquare">
          {{ CatListQueryInfo.cat }}
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </button>
        <div
          class="hidden-square font-14"
          :style="{ display: isHiddenSquare ? 'block' : 'none' }">
          <div class="header mleft-30">全部歌单</div>
          <div class="line"></div>
          <div class="tag">
            <div v-for="(item, index) in allCats" :key="index" class="cat-row">
              <div v-if="index === 0" class="tag-title">语种</div>
              <div v-if="index === 1" class="tag-title">风格</div>
              <div v-if="index === 2" class="tag-title">场景</div>
              <div v-if="index === 3" class="tag-title">情感</div>
              <div v-if="index === 4" class="tag-title">主题</div>
              <div class="tag-cat">
                <div
                  v-for="itemCat in item"
                  :key="itemCat.name"
                  class="tagcat-btn-wrapper">
                  <button
                    class="tagcat-btn pointer btn"
                    @click="handleChangeCat(itemCat.name)"
                    :class="{
                      isActiveCat: itemCat.name == CatListQueryInfo.cat,
                    }">
                    {{ itemCat.name }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          class="btn hot-btn"
          v-for="hotCat in hotCats"
          :key="hotCat.name"
          @click="handleChangeHotCat(hotCat.name)"
          :class="{ isActiveCat: hotCat.name == CatListQueryInfo.cat }">
          {{ hotCat.name }}
        </button>
      </div>
    </div>
    <div class="playLists-wrapper">
      <playlistCard
        v-for="playList in playlists"
        :key="playList.id"
        :imgsrc="playList.coverImgUrl"
        :title="playList.name"
        :playCount="useCountFormate(playList.playCount)"
        class="playList"
        @click="transferPlayList(playList.id)" />
      <!-- 'imgsrc', 'title', 'playCount' -->
    </div>
  </div>
</template>

<script setup>
  import { reactive, toRefs, ref, onMounted } from 'vue'
  import {
    getCatlist,
    getPlayListByCatlist,
    getHotTags,
  } from '@/Api/api_playList'
  import playlistCard from '@/components/card/playlistCard.vue'
  import { useCountFormate } from '@/hooks/useFormate'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  onMounted(() => {
    GetCatlist()
    GetPlayListByCatlist()
    GetHotTags()
  })
  // 所有分类标签
  const allCats = ref([])
  // 获取所有歌单分类
  const GetCatlist = async () => {
    const res = await getCatlist()
    if (res.code !== 200) return
    // console.log(res)
    for (let i = 0; i < 5; i++) {
      allCats.value.push(
        Object.freeze(res.sub.filter((item) => item.category === i))
      )
    }
    // console.log(allCats.value)
  }

  const isHiddenSquare = ref(false)

  const handleHiddenSquare = () => {
    isHiddenSquare.value = !isHiddenSquare.value
  }
  // 歌单分类参数
  const CatListQueryInfo = reactive({
    order: 'hot',
    cat: '华语',
    limit: 50,
    offset: 0,
  })
  // 歌单数据
  const playlists = ref([])
  // 顶部评鉴歌单
  const topDisplay = ref({})

  const GetPlayListByCatlist = async () => {
    const res = await getPlayListByCatlist(CatListQueryInfo)
    // console.log(res)
    if (res.code !== 200) return
    playlists.value = res.playlists
    topDisplay.value = Object.freeze(
      playlists.value[Math.floor(Math.random() * 50)]
    )
    // console.log(playlists.value)
  }
  // 改变歌单分类
  const handleChangeCat = (catName) => {
    if (CatListQueryInfo.cat == catName) return
    CatListQueryInfo.cat = catName
    GetPlayListByCatlist()
  }
  // 热门歌单分类
  const hotCats = ref([])

  const GetHotTags = async () => {
    const res = await getHotTags()
    if (res.code !== 200) return
    console.log(res)
    hotCats.value = res.tags
  }
  
  const handleChangeHotCat = (hotCatNmae) => {
    CatListQueryInfo.cat = hotCatNmae
    GetPlayListByCatlist()
  }

  // 传入歌单Id获取详情页
  const transferPlayList = (id) => {
    router.push({ name: 'playlistcardDetail', params: { id } })
  }
</script>
<style scoped lang="less">
  .isActiveCat {
    // background-color: #e0e0e0 !important;
    color: #ec4141;
    border: 1px solid #d8d8d8;
  }
  .top-display-wrapper {
    height: 200px;
    overflow: hidden;
    display: flex;
    position: relative;
    border-radius: 10px;
    align-items: center;
    .img-back {
      position: absolute;
      top: -400px;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 1;
      width: 100%;
      z-index: 1;
      filter: blur(45px);
    }
    .imgDisplay {
      z-index: 2;
      width: 150px;
      border-radius: 10px;
      // margin-left: 20px;
      margin: 0 20px;
    }
    .display-left {
      z-index: 2;
      color: antiquewhite;
      .tastBtn {
        color: antiquewhite;
        border: 1px solid antiquewhite;
        background-color: #ffffff00;
      }
    }
  }
  .catList-wrapper {
    position: relative;
    margin: 10px 0 20px 0;
    justify-content: space-between;
    display: flex;
    .hot-btn {
      padding: 0 20px;
      background-color: white;
      // border: 1px solid #d8d8d8;
    }
    .hot-btn:hover {
      color: #ec4141;
    }
    .cat-btn {
      padding: 0 20px;
      background-color: white;
      border: 1px solid #d8d8d8;
    }
    .cat-btn:hover {
      background-color: #e0e0e0;
    }
    .hidden-square {
      border-radius: 4px;
      box-shadow: 0 0 8px #e5e5e5;
      position: absolute;
      top: 40px;
      z-index: 999;
      width: 720px;
      background-color: white;
      .header {
        line-height: 80px;
      }
      .tag {
        display: flex;
        flex-direction: column;
        padding: 20px;
        .cat-row {
          display: flex;
          margin: 5px 0;
          // justify-content: flex-start;

          .tag-title {
            width: 120px;
            margin: 5px 50px 20px 10px;
          }
          .tag-cat {
            display: flex;
            flex-wrap: wrap;
            width: 500px;
            .tagcat-btn-wrapper {
              display: flex;
              margin: 5px 0px;
              width: 100px;

              .tagcat-btn {
                background-color: white;
              }
              .tagcat-btn:hover {
                color: #ec4141;
              }
            }
          }
        }
      }
    }
  }
  .playLists-wrapper {
    display: flex;
    flex-wrap: wrap;
    .playList {
      margin-bottom: 30px;
      margin-right: 2%;
    }
  }
</style>
