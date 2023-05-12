<template>
  <div>
    <div>
      <tabMenu pattern="router" :menuList="topMenus" />
    </div>
    <router-view v-slot="{ Component }">
      <transition name="el-fade-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import tabMenu from '@/components/menus/tabMenu.vue'

  const topMenus = ref([
    { router: '/videoHome', title: '视频' },
    { router: '/mvHome', title: 'MV' },
  ])
</script>
<style scoped></style>
