<template>
  <div>
    <h3>每日推荐</h3>
    <div class="dailyRmd_container"></div>
  </div>
</template>

<script setup>
  import { reactive, toRefs, onMounted } from 'vue'
  import { getLoginStatus, getsubcount,getAcount ,getUserDetail} from '@/Api/api_user'

  onMounted(() => {
    GetLoginStatus()
    Getsubcount()
  })

  const GetLoginStatus = async () => {
    const res = await getLoginStatus()
    console.log(res)
  }

  const Getsubcount = async () => {
    const res = await getsubcount()
    console.log(res)
  }
</script>
<style scoped></style>
