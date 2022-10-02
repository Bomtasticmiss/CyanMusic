<template>
  <div class="login_qr_show" ref="loginQrShowRef">
    <a>打开网易云手机app扫码登录</a>
    <img :src="scrQr" alt="" class="login_qr_img" />
  </div>
</template>

<script setup>
import { reactive, toRefs, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { getQrKey, crateQr, reQrStatus } from "@/Api/login";

const router = useRouter();

const data = reactive({
  // base64二维码图片
  scrQr: "",
  // 二维码key
  key: "",
});

// 获取二维码
const getQr = async () => {
  const resQrKey = await getQrKey();
  // console.log(resQrKey);
  key.value = resQrKey.data.unikey;
  if (resQrKey.code !== 200)
    return ElMessage({ message: "获取二维码失败", type: "error" });
  createQr();
};
// 生成二维码
const createQr = async () => {
  const resQr = await crateQr(key.value);
  if (resQr.code !== 200)
    return ElMessage({ message: "生成二维码失败", type: "error" });
  // console.log(resQr);
  scrQr.value = resQr.data.qrimg;
  checkQr();
};

// 轮询登录状态
const checkQr = async () => {
  const res = await reQrStatus(key.value);
  console.log(res);
  if (res.code === 803) {
    localStorage.setItem("cookie", res.cookie);
    router.push("/home");
    return ElMessage({ message: "登录成功", type: "success" });
  }
  window.timer = setTimeout(() => {
    checkQr();
  }, 3000);
};

onMounted(() => {
  getQr();
});


onBeforeUnmount(() => {
  clearTimeout(window.timer);
});

let { scrQr, key } = toRefs(data);
</script>
<style scoped>
    .login_qr_show {
  margin-top: 80px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.login_qr_img {
  width: 200px;
  height: 200px;
}
</style>
