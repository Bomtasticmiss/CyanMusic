<template>
  <div>
    <!-- 普通标记模式 -->
    <ul class="tab-Menus" v-if="!props.pattern || props.pattern == 'menu'">
      <li
        v-for="(tab, index) in props.menuList"
        :key="index"
        class="pointer"
        :class="{ isActive: props.mIndex == index }"
        @click="handleChangePage_menu(index)">
        {{ tab }}
      </li>
    </ul>
    <!-- 路由模式 -->
    <ul class="tab-Menus" v-if="props.pattern == 'router'">
      <li
        v-for="tab in props.menuList"
        :key="tab.router"
        class="pointer"
        :class="{ isActive: tabIndexRouter == tab.router }"
        @click="handleChangePage(tab.router)">
        {{ tab.title }}
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { get, set } from 'lodash'
  import { ref, computed, watch } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  const props = defineProps({
    menuList: {
      type: Array,
      require: true,
    },
    pattern: {
      type: String,
      default: 'menu',
    },
    mIndex: {
      type: Number,
      default: 0,
    },
  })

  const router = useRouter()
  const route = useRoute()
  const emits = defineEmits(['getMenuIndex','update:mIndex'])

  // const tabIndexMenu=ref(0)

  const handleChangePage_menu = (index) => {
    // tabIndexMenu.value = index
    // emits('getMenuIndex', tabIndexMenu.value)
    emits('update:mIndex', index)

  }

  
  const tabIndexRouter = ref('')
  // 监听路由地址变化
  watch(
    () => router.currentRoute.value.fullPath,
    (newPath) => {
      tabIndexRouter.value = newPath
      console.log(newPath)
    },
    { immediate: true }
  )
  const handleChangePage = (routerPath) => {
    router.push(routerPath)
    console.log(router)
  }
</script>
<style scoped lang="less">
  .isActive {
    font-size: 18px;
    font-weight: bold;
    color: #ec4141;
  }
  .isActive::after {
    display: block;
    content: '';
    background-color: #ec4141;
    height: 4px;
    width: 90%;
    border-radius: 2px;
    margin: 0 auto;
  }
  .tab-Menus {
    display: flex;
    list-style: none;
    align-items: center;
    margin: 20px 0 20px 0;
    li {
      // margin: 10px;
      margin-right: 20px;
    }
  }

  @media screen and(max-width:768px) {
    .isActive {
      font-size: 16px;
    }
  }
</style>
