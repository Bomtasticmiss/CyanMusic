<template>
  <div class="starWrapper">
    <div
      v-for="subscriber in subscribers"
      :key="subscriber.userId"
      class="avator-wrapper"
      @click="handleGetUserId(subscriber.userId)">
      <div class="img-div">
        <img v-lazy="subscriber.avatarUrl" alt="头像" class="img" />
      </div>
      <div class="nickname pointer text-hidden">{{ subscriber.nickname }}</div>
    </div>
  </div>
</template>

<script setup>
  import { reactive, toRefs, defineProps, onMounted } from 'vue'

  const props = defineProps(['subscribers'])

  const emits = defineEmits(['getUserId'])

  const handleGetUserId = (userId) => {
    emits('getUserId', userId)
  }

  onMounted(() => {
    console.log(props.subscribers)
  })
</script>
<style lang="less" scoped>
  .starWrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .avator-wrapper {
    display: flex;
    align-items: center;
    width: 33%;
    .nickname {
      width: 150px;
    }
  }
  .img-div {
    margin: 10px;
    border-radius: 50%;
    overflow: hidden;
    width: 100px;
    // width: 18%;
    height: 100px;
    cursor: pointer;
  }
  .img {
    width: 100%;
  }


  @media screen and(max-width:950px) {
    .starWrapper {
      display: block;
      .avator-wrapper {
        width: fit-content;
       
      }
    }

  }

  @media screen and(max-width:950px) {
    .img-div {
          width: 60px;
          height: 60px;
          min-width: 60px;
        }
  }
  @media screen and(max-width:1200px) {
    .avator-wrapper {
      width: 42%;
    }
  }
</style>
