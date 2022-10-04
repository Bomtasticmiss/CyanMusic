<template>
  <div class="footer">
    <div class="left-util">
      <el-avatar :size="50" alt="..." shape="square"> </el-avatar>
    </div>
    <div class="center-util"></div>
    <div class="right-util"></div>
  </div>
</template>

<script setup>
import { reactive, toRefs } from "vue";
</script>
<style lang="less" scoped>
.footer {
  border: solid 1px;
  height: 70px;
  display: flex;
  justify-content: space-between;
}
.left-util {
  width: 200px;
  border: solid 1px;
}
.center-util {
  width: 600px;
  border: solid 1px;
}
.right-util {
  width: 200px;
  border: solid 1px;
}
</style>
