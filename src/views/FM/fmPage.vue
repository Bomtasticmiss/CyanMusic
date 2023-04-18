<template>
  <div class="fm-wrapper" v-if="playingSongInfo">
    <div class="fm">
      <div class="fm-left mright-10">
        <div class="img-info">
          <img :src="`${playingSongInfo.al.blurPicUrl}?param=250y250`" alt="" />
          <div
            class="img-btn"
            @click="handlePlay"
            :class="{ 'is-active-playBtn': isPlay }">
            <span v-if="!isPlay" class="iconfont icon-play3"></span>
            <span v-if="isPlay" class="iconfont icon-zanting"></span>
          </div>
        </div>
        <div class="btn-wrapper mtop-20">
          <button class="circle" @click="SetLike">
            <span v-if="!isLike" class="iconfont icon-xihuan1"></span>
            <span
              v-if="isLike"
              class="iconfont icon-xihuan3"
              style="color: #eb3030"></span>
          </button>
          <button class="circle" @click="fmRemove">
            <span class="iconfont icon-delete"></span>
          </button>
          <button class="circle" @click="fmNext">
            <span class="iconfont icon-iov-next"></span>
          </button>
          <button class="circle">
            <span class="iconfont icon-more"></span>
          </button>
        </div>
      </div>
      <div class="fm-lyric mtop-20">
        <div class="top-info">
          <h3>{{ playingSongInfo.name }}</h3>
          <div class="font-12 mtop-20">
            专辑：<span
              @click="enterAlbumPage"
              class="pointer playview-color"
              >{{ playingSongInfo.al.name }}</span
            >
          </div>
          <div class="font-12">
            歌手：<span
              @click="enterArtistPage"
              class="pointer playview-color"
              >{{ playingSongInfo.ar[0].name }}</span
            >
          </div>
        </div>
        <lyricPage
          :currentTime="currentTime"
          :durationTime="totalTime"
          _type="left"
          class="mtop-30" />
      </div>
    </div>
    <div>
      <Comment :type="0" :id="playingSongInfo.id" />
    </div>
  </div>
</template>

<script setup>
  import { onMounted, computed, onBeforeMount, reactive, watch } from 'vue'
  import lyricPage from '@/components/playFooter/lyricPage.vue'
  import Comment from '@/components/comment/Comment.vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const store = useStore()

  onMounted(() => {
    if (store.state.playType !== 'Fm') {
      store.dispatch('GetPersonal_fm', 'get')
      store.commit('setPaused', false)
      store.commit('setPlayType', 'Fm')
    }

    // getFmInfo()
  })

  const FmInfo = reactive({
    imgInfo: '',
    name: '',
    album: {
      name: '',
    },
    artists: {
      name: '',
    },
  })
  // const getFmInfo=()=>{
  //     FmInfo.imgInfo=playingSongInfo.value.album.blurPicUrl
  //   FmInfo.name=playingSongInfo.value.name
  //   FmInfo.album.name=playingSongInfo.value.album.name
  //   FmInfo.artists.name=playingSongInfo.value.artists[0].name
  // }

  // 正在播放歌曲信息
  const playingSongInfo = computed(() => {
    return store.getters.playingSongInfo
  })

  // watch(playingSongInfo,()=>{
  //   getFmInfo()
  // })

  const currentTime = computed(() => {
    return store.state.currenMusicInfo.currenTime
  })
  const totalTime = computed(() => {
    return store.state.currenMusicInfo.totalTime
  })

  const isLike = computed(() => {
    return store.state.likeIdList.indexOf(playingSongInfo.value.id) !== -1
  })

  // 喜欢歌曲
  const SetLike = async () => {
    if (!store.state.isLogin)
      return ElMessage({ message: '请先登录', type: 'warning' })
    if (isLike.value) {
      store.dispatch('SetLike', {
        type: 'delete',
        id: playingSongInfo.value.id,
      })
    } else {
      store.dispatch('SetLike', {
        type: 'unshift',
        id: playingSongInfo.value.id,
      })
    }
  }
  // 是否播放(false暂停||true播放)
  const isPlay = computed(() => {
    return store.state.paused
  })

  const handlePlay = () => {
    store.commit('setPaused', !isPlay.value)
  }

  const fmRemove = () => {
    store.dispatch('GetPersonal_fm', 'remove')
  }
  const fmNext = () => {
    store.dispatch('GetPersonal_fm', 'next')
  }

  const enterAlbumPage = () => {
    router.push('/albumDetail/' + playingSongInfo.value.al.id)
  }
  const enterArtistPage = () => {
    router.push('/artistDetail/' + playingSongInfo.value.ar[0].id)
  }
</script>
<style scoped lang="less">
  .is-active-playBtn {
    width: 60px !important;
    height: 40px !important;
    border-radius: 20px !important;
    background-color: white !important;
    left: 80% !important;
    top: 80% !important;
    span {
      color: #ec4141 !important;
    }
    &:hover {
      width: 50px !important;
      height: 50px !important;
      border-radius: 50% !important;
      background-color: #ec4141 !important;
    }
    &:hover span {
      color: white !important;
    }
  }
  .fm-wrapper {
    .fm {
      display: flex;
      justify-content: center;

      .fm-left {
        width: 260px;
        margin-top: 120px;
        .img-info {
          position: relative;
          img {
            border-radius: 10px;
          }
          .img-btn {
            cursor: pointer;
            border-radius: 50%;
            background-color: white;
            width: 50px;
            height: 50px;
            position: absolute;
            transform: translate(-50%, -50%);
            left: 50%;
            top: 50%;
            display: flex;
            transition: all 0.3s;
            span {
              margin: auto;
              font-size: 22px;
              color: #ec4141;
            }
            &:hover {
              width: 60px;
              height: 40px;
              border-radius: 20px;
              background-color: #ec4141;
            }
            &:hover span {
              color: white;
            }
          }
        }
        .btn-wrapper {
          display: flex;
          justify-content: space-between;
          .circle {
            border-radius: 50%;
            background-color: white;
            border: 1px solid #a2a2a2;
            width: 42px;
            height: 42px;
            cursor: pointer;
            color: #8c8c8c;
            &:hover {
              background-color: #d2d2d2;
            }
          }
        }
      }
      .fm-lyric {
        margin-left: 30px;
      }
    }
  }
</style>
