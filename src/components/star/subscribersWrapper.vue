<template>
  <div class="starWrapper">
    <div
      v-for="subscriber in subscribers"
      :key="subscriber.userId"
      class="img-div">
      <img v-lazy="subscriber.avatarUrl" alt="" class="img" />
      
    </div>
  </div>
</template>

<script setup>
  import { reactive, toRefs, defineProps, onMounted } from 'vue'

  const props = defineProps(['subscribers'])

  onMounted(() => {
    console.log(props.subscribers)
  })
</script>
<style lang="less" scoped>
  .starWrapper {
    display: flex;
    flex-wrap: wrap;
  }
  .img-div {
    margin: 10px;
    border-radius: 50%;
    overflow: hidden;
    width: 100px;
    height: 100px;
    cursor: pointer;
  }
  .img {
    width: 100%;
  }
</style>
