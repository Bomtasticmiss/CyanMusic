<template>
  <div>
    <!-- 普通标记模式 -->
    <ul class="tab-Menus" v-if="!props.pattern || props.pattern == 'menu'">
      <li
        v-for="(tab, index) in props.menuList"
        :key="index"
        class="pointer"
        :class="{ isActive: tabIndexMenu == index }"
        @click="handleChangePage_menu(index)">
        {{ tab.title }}
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
  import { reactive, toRefs, ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  const props = defineProps({
    menuList: {
      type: Array,
      require: true,
    },
    pattern: {
      type: String,
      default: 'menu',
    },
  })

  const emits=defineEmits(['getMenuIndex'])
  const router = useRouter()

  const tabIndexMenu = ref(0)

  const handleChangePage_menu = (index) => {
    tabIndexMenu.value = index
    emits('getMenuIndex',tabIndexMenu.value)
  }

  const tabIndexRouter = computed(() => {
    return router.currentRoute._value.fullPath
  })
</script>
<style scoped lang="less">
  .isActive {
    font-size: 20px;
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
    li {
      margin: 10px;
    }
  }
</style>
