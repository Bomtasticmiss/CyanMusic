<template>
  <el-container>
    <el-header>Header</el-header>
    <el-main>
      <div class="login-container">
        <div class="header-login">
          <div class="login-back" @click="loginBack">
            <i class="fa fa-angle-left" aria-hidden="true"></i>
          </div>
          <div>
            <h3>{{ isTitleName }}</h3>
          </div>
          <div class="login_qr_bt" @click="loginQrShow">
            <i class="fa fa-qrcode fa-2x" aria-hidden="true"></i>
          </div>
        </div>
        <loginPhone v-if="isLoginPhoneNumber.show" />
        <loginQr v-if="isLoginQr.show" />
      </div>
    </el-main>
  </el-container>
</template>
<script setup>
import loginPhone from "@/views/login/loginPhone.vue";
import loginQr from "@/views/login/loginQr.vue";
import { ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const loginFormRef = ref();
const loginQrShowRef = ref();

const loginInfo = reactive({
  // 手机号登录
  isLoginPhoneNumber: {
    show: true,
    name: "手机号登录",
  },
  // 二维码登录
  isLoginQr: {
    show: false,
    name: "二维码登录",
  },
  // 登录标题
  isTitleName: "手机号登录",
  
});

// 切换登录方式
const loginQrShow = () => {
  isLoginQr.value.show = !isLoginQr.value.show;
  isLoginPhoneNumber.value.show = !isLoginPhoneNumber.value.show;
  for (const item in loginInfo) {
    if (loginInfo[item].show) {
      isTitleName.value = loginInfo[item].name;
    }
  }
};


// const loginQrShow = () => {
//   isLoginQr.value.show = !isLoginQr.value.show;
//   isLoginPhoneNumber.value.show = !isLoginPhoneNumber.value.show;
//   console.log(isTitleName.value.num);
//   // console.log(loginQrShow);
//   isTitleName.value.num = isTitleName.value.count % 2;
//   isTitleName.value.count++;
// };

// const loginQrShow = () => {
//   nextTick(() => {
//     loginQrShowRef.value.style.display = "block";
//     console.log(loginFormRef.value);
//     loginFormRef.value.style.display = "none";
//   });
// };
const loginBack = () => {
  router.go(-1);
};

let { isLoginQr, isLoginPhoneNumber, isTitleName } =
  toRefs(loginInfo);
</script>
<style scoped lang="less">
.bg_container {
  // width: 100%;
  // height: 100%;
  // background-size:100% 100%;
  // background-image: url("@/assets/login_bg.jpg");
  // background-repeat: no-repeat;
}
.login-container {
  width: 400px;
  height: 500px;
  border-radius: 15px;
  box-shadow: -5px 5px 12px 5px rgba(125, 194, 186, 0.66);
}

.el-main {
  height: 100%;
  // margin-top: 40px;
  display: flex;
  justify-content: center;
  // align-items: center;
  overflow: hidden;
}
.header-login {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}
.header-login::after {
  content: "";
  position: absolute;
  background-color: #ebeef5;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  z-index: 3;
}
.login-back {
  cursor: pointer;
  flex-basis: 25px;
  margin-left: 20px;
}
.login_qr_bt {
  margin-right: 10px;
  cursor: pointer;
}




</style>
