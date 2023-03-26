<template>
  <div>
    <div>
      <h3>全部MV</h3>
    </div>
    <div class="mleft-30">
      <div class="mtop-5">
        <span>地区：</span>
        <button
          v-for="(item, index) in tag.area"
          :key="index"
          class="btn mv-tag-btn"
          :class="{ isActive: item == mvAllQuery.area }"
          @click="handleBtn(item, 0)">
          {{ item }}
        </button>
      </div>
      <div class="mtop-5">
        <span>类型：</span>
        <button
          v-for="(item, index) in tag.type"
          :key="index"
          class="btn mv-tag-btn"
          :class="{ isActive: item == mvAllQuery.type }"
          @click="handleBtn(item, 1)">
          {{ item }}
        </button>
      </div>
      <div class="mtop-5">
        <span>排序：</span>
        <button
          v-for="(item, index) in tag.order"
          :key="index"
          class="btn mv-tag-btn"
          :class="{ isActive: item == mvAllQuery.order }"
          @click="handleBtn(item, 2)">
          {{ item }}
        </button>
      </div>
    </div>
    <div>
      <mvList :MvData=MvAllData :isFinite="true" :disabled="loading" @loadMore="load"/>
    </div>
  </div>
</template>

<script setup>
  import { reactive, ref, onMounted } from 'vue'
  import { getMvAll } from '@/Api/api_video'
  import mvList from '@/components/video/mvList.vue';

  onMounted(() => {
    if (window.sessionStorage.getItem('mvAllTags')) {
      let obj = JSON.parse(window.sessionStorage.getItem('mvAllTags'))
      mvAllQuery.area = obj.area
      mvAllQuery.type = obj.type
      mvAllQuery.order = obj.order
    }
    GetMvAll()
  })

  const tag = reactive({
    area: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
    type: ['全部', '官方版', '现场版', '网易出品'],
    order: ['上升最快', '最热', '最新'],
  })

  const mvAllQuery = reactive({
    area: '内地',
    type: '全部',
    order: '最新',
    offset:0
  })

  const handleBtn = (value, index) => {
    if (index == 0) mvAllQuery.area = value
    if (index == 1) mvAllQuery.type = value
    if (index == 2) mvAllQuery.order = value
    MvAllData.value=[]
    GetMvAll()
  }

  const MvAllData = ref([])
  const loading=ref(false)
  const hasMore=ref(true)

  const GetMvAll = async () => {
    if(loading.value)return 
    loading.value=true
    const res = await getMvAll(mvAllQuery)
    console.log(res)
    if (res.code != 200) return
    MvAllData.value.push(...res.data) 
    hasMore.value=res.hasMore
    loading.value=false
  }


  const load=(val)=>{
    if(!hasMore.value)return 
    if(loading.value)return 
    mvAllQuery.offset=8+val
    GetMvAll()
  }

</script>
<style scoped lang="less">
  .isActive {
    border: 1px solid rgb(204, 204, 204);
    color: #c45656;
  }
  .mv-tag-btn {
    width: 80px;
  }
</style>
