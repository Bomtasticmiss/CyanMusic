<template>
  <musicInitial/>
  <!-- <lyricPageVue /> -->
  <!-- <router-view></router-view> -->
</template>
<script setup>
import musicInitial from "@/Layout/musicInitial.vue"
import lyricPageVue from "@/Layout/playFooter/lyricPage.vue";
import {computed} from 'vue'
import {useStore} from "vuex";

const store=useStore()

const lyricPage=computed(()=>{
  return !store.state.lyricPage
})
</script>
<style scoped></style>
