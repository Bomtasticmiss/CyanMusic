<template>
  <div>
    <div class="top pointer" @click="handleGoto">
      <h3>热门推荐</h3>
      <i class="fa fa-angle-right fa-2x mleft-5" aria-hidden="true"></i>
    </div>
    <div class="hot-songs">
      <div class="card-wrapper" @click="enterDailyPage">
        <div class="card-border" v-if="dailyRmdImg">
          <!-- <div class="calendar"></div> -->
          <div style="position: relative; overflow: hidden; border-radius: 4px">
            <img
              v-lazy="`${dailyRmdImg.coverImgUrl}?param=250y245`"
              alt="加载中" />
            <img
              v-lazy="`${dailyRmdImg.coverImgUrl}`"
              alt="加载中"
              class="daily-img" />
            <div class="calendar">
              <span class="iconfont icon-rili calenderIcon">
                <span class="date">{{ date }}</span>
              </span>
            </div>
          </div>
          <div class="card-paly-btn">
            <i class="fa fa-play-circle fa-2x" aria-hidden="true"></i>
          </div>
          <div class="card-title text-hidden">每日歌曲推荐</div>
        </div>
      </div>

      <playlistCard
        v-for="list in cardPlaylists"
        :key="list.id"
        :imgsrc="list.coverImgUrl + '?param=200y200'"
        :title="list.name"
        :playCount="useCountFormate(list.playCount)"
        class="card-song"
        @click="transferPlayList(list.id)" />
    </div>
  </div>
</template>

<script setup>
  import playlistCard from '@/components/card/playlistCard.vue'
  import { getHomeMusicRmd } from '@/Api/api_playList'
  import { useCountFormate } from '@/hooks/useFormate'
  import { toRefs, reactive, onMounted, computed } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  const store = useStore()
  const router = useRouter()

  const data = reactive({
    cardPlaylists: [],
  })

  const dailyRmdImg = computed(() => {
    return cardPlaylists.value[
      Math.floor(cardPlaylists.value.length * Math.random())
    ]
  })

  // 获取歌单信息
  const getMusicRmd = async () => {
    const res = await getHomeMusicRmd()
    // console.log(res);
    // store.commit("setPlayList", res.playlists);
    // cardPlaylists.value = store.state.playlists;
    cardPlaylists.value = res.playlists
    console.log(res)
  }

  // 传入歌单Id获取详情页
  const transferPlayList = (id) => {
    router.push({ name: 'playlistDetail', params: { id } })
  }

  const handleGoto = () => {
    router.push('/playList')
  }
  // 初始化推荐歌单页面
  onMounted(() => {
    getMusicRmd()
  })

  const date = computed(() => {
    let date = new Date()
    return date.getDate()
  })

  const enterDailyPage=()=>{
    router.push('/dailyRmd')
  }
  let { cardPlaylists } = toRefs(data)
</script>
<style scoped lang="less">
  .top {
    display: flex;
    align-items: center;
    width: fit-content;
  }
  .hot-songs {
    display: flex;
    flex-wrap: wrap;
  }
  .card-song {
    /* flex-basis: 200px; */
    margin-bottom: 30px;
    margin-right: 2%;
  }
  .card-wrapper {
    margin-bottom: 30px;
    margin-right: 2%;
    width: 17%;
    position: relative;
    .card-border {
      display: flex;
      flex-direction: column;
      /* width: 168px; */
      overflow: hidden;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.5s;
      .daily-img {
        border-radius: 4px;
        position: absolute;
        filter: blur(30px);
        max-width: unset;
        top: -200px;
        left: -200px;
      }
      .calendar {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100px;
        width: 110px;
        position: absolute;
        color: white;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .calenderIcon {
          font-size: 100px !important;
          position: relative;
          .date {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            margin-top: 15px;
            color: #fff;
            font-size: 40px;
            font-weight: 600;
          }
        }
        // background: url('@/assets/img/calendar.png') 0 0/100% no-repeat;
      }
      .card-paly-btn {
        position: absolute;
        color: white;
        transition: all 0.8s;
        opacity: 0;
        right: 10px;
        bottom: 30px;
      }
      .card-paly-btn:hover {
        transform: scale(1.2);
      }
      &:hover .card-paly-btn {
        opacity: 1;
      }
      .card-title {
        height: 20px;
        /* width: 150px; */
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transform: translate3d(0, 0, 0);
      }
    }
  }
  @media screen and (max-width: 1000px) {
    .card-wrapper {
      margin-bottom: 30px;
      margin-right: 2%;
      width: 23%;
    }
  }
  @media screen and(max-width:415px) {
    .card-wrapper {
      margin-bottom: 30px;
      margin-right: 2%;
      width: 31%;
    }
  }
</style>
