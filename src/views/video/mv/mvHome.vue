<template>
  <div class="mv-wrapper">
    <!-- 最新MV -->
    <div class="mvFirst-wrapper mtop-20">
      <div>
        <button
          class="btn font-18 fontbd-700"
          style="padding: 0 4px"
          @click="MvFirstEnterAllMv">
          最新MV
          <span class="iconfont icon-right1"></span>
        </button>
      </div>
      <div class="display">
        <mvList :MvData="data.MvFirst" :isFinite="false"/>
      </div>
    </div>
    <!-- 热播MV -->
    <div class="mvRcmd-wrapper mtop-20">
      <div>
        <button
          class="btn font-18 fontbd-700"
          style="padding: 0 4px"
          @click="MvHotEnterAllMv">
          热播MV
          <span class="iconfont icon-right1"></span>
        </button>
      </div>
      <div class="display">
        <mvList :MvData="data.MvHot" :isFinite="false"/>
      </div>
    </div>
    <!-- 网易出品 mv -->

    <div class="personalizedmv-wrapper mtop-20">
      <div>
        <button
          class="btn font-18 fontbd-700"
          style="padding: 0 4px"
          @click="MvRcmdEnterAllMv">
          网易出品MV
          <span class="iconfont icon-right1"></span>
        </button>
      </div>
      <div class="display">
        <mvList :MvData="data.MvRcmd" :isFinite="false"/>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive, onMounted } from 'vue'
  import mvList from '@/components/video/mvList.vue'
  import {
    getMvAll,
    getMvFirst,
    getPersonalizedMv,
    getMvRcmd,
  } from '@/Api/api_video'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  onMounted(() => {
    GetMvFirst()
    GetMvHot()
    GetMvRcmd()
  })

  const data = reactive({
    // 最新 mv
    MvFirst: [],
    // 最热mv
    MvHot: [],
    // 网易出品 mv
    MvRcmd: [],
  })
  // 获取最新 mv
  const GetMvFirst = async () => {
    const res = await getMvFirst()
    console.log(res)
    if (res.code != 200) return
    data.MvFirst = res.data
  }
  // 获取最热mv
  const GetMvHot = async () => {
    const res = await getMvAll('内地', '最热')
    console.log(res)
    if (res.code != 200) return
    data.MvHot = res.data
  }
  // 获取推荐mv
  const GetPersonalizedMv = async () => {
    const res = await getPersonalizedMv()
    console.log(res)
    if (res.code != 200) return
  }
  // 获取网易出品 mv
  const GetMvRcmd = async () => {
    const res = await getMvRcmd()
    console.log(res)
    if (res.code != 200) return
    data.MvRcmd = res.data
  }

  const MvFirstEnterAllMv = () => {
    router.push('allMv')
    window.sessionStorage.setItem(
      'mvAllTags',
      JSON.stringify({
        area: '内地',
        type: '全部',
        order: '最新',
      })
    )
  }
  const MvHotEnterAllMv = () => {
    router.push('allMv')
    window.sessionStorage.setItem(
      'mvAllTags',
      JSON.stringify({
        area: '全部',
        type: '全部',
        order: '最热',
      })
    )
  }
  const MvRcmdEnterAllMv = () => {
    router.push('allMv')
    window.sessionStorage.setItem(
      'mvAllTags',
      JSON.stringify({
        area: '内地',
        type: '网易出品',
        order: '最新',
      })
    )
  }
</script>
<style scoped></style>
