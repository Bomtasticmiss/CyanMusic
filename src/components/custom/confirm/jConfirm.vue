<template>
  <div class="confirm-wrapper">
    <div class="confirm-box">
      <div class="title">{{ title }}</div>
      <div class="content">{{ text }}</div>
      <div class="confirm-btn-container">
        <button class="btn confirm-btn" @click="confirmCallBack">{{confirmText}}</button>
        <button class="btn confirm-btn" @click="cancelCallBack">{{cancelText}}</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue'

  export default {
    name: 'jConfirm',
    props: {
      title: {
        default: '请确认信息',
      },
      text: {
        type: String,
        default: '',
      },
      confirmCallBack: { type: Function },
      cancelCallBack: { type: Function },
      confirmText: {
        type: String,
        default: '确认',
      },
      cancelText: {
        type: String,
        default: '取消',
      },
    },
    setup() {},
  }
</script>
<style scoped lang="less">
  .confirm-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0000004d;
    .confirm-box {
      width: 400px;
      // height: 300px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      background-color: #fff;
      border-radius: 3px;
      text-align: left;
      overflow: hidden;
      .title {
        background-color: rgb(222, 73, 73);
        // height: 100px;
        padding: 5px 20px 10px 20px;
        color: #fff;
        font-size: 18px;
      }
      .content {
        padding: 20px 20px;
        font-size: 16px;
        color: #818181;
      }
      .confirm-btn-container {
        text-align: right;
        padding: 5px 5px 10px 5px;
        .confirm-btn {
          border-radius: 20px;
          border: 1px solid rgb(159, 159, 159);
          margin-right: 20px;
          padding: 4px 20px;
          &:hover {
            background-color: rgb(198, 198, 198);
          }
        }
      }
    }
  }
</style>
