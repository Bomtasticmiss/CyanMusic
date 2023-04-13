<template>
  <div></div>
</template>

<script setup>
import {reactive,toRefs,onMounted} from 'vue'
import {getPersonal_fm,rubbish} from '@/Api/api_FM.js'

onMounted(() => {
    GetPersonal_fm()
})
const GetPersonal_fm=async ()=>{
    const res=await getPersonal_fm()
    console.log(res)
}
</script>
<style scoped>
</style>