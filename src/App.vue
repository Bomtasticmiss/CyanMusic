<template>
    <router-view></router-view>

</template>
<script setup>
  import {  onMounted,watch} from 'vue'
  import { useStore } from 'vuex'
  const store = useStore()

  onMounted(()=>{
    store.dispatch('GetAcount')
  })

</script>
<style scoped lang="less">

.full_container {
    display: flex;
    background-color: rgb(219, 219, 219);
    height: 100%;
    width: 100%;
    justify-content: center;
    // align-items: center;
    .border-container {
      width: 1300px;
      height: 660px;
      margin: auto;
      background-color: white;
      // background-color: rgb(177, 175, 175);
      border-radius: 15px;
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    }

  }</style>
