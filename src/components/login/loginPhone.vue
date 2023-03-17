<template>
  <!-- <template v-if="isLoginPhoneNumber.show"> -->
  <el-form
    ref="ruleFormRef"
    :model="codeObject"
    status-icon
    :rules="rules"
    label-width="120px"
    class="login-form"
  >
    <el-form-item label="手机号" label-width="auto">
      <el-input type="text" autocomplete="off" v-model="codeObject.phoneNumber"/>
    </el-form-item>
    <div class="test-border">
      <el-form-item label="验证码" label-width="auto" class="test-write-ctr">
        <el-input type="text" autocomplete="off" v-model="codeObject.code"> </el-input>
      </el-form-item>
      <el-button class="test-send-ctr" primary @click="GetCode">发送验证码</el-button>
    </div>
    <!-- <el-form-item>
      <el-button type="primary" size='large' @click="submitForm(ruleFormRef)"
        >登录</el-button
      >
    </el-form-item> -->
    <el-button class="login_btn" @click="PhoneLogin">登录</el-button>
    <!-- <button ></button> -->
  </el-form>
  <!-- </template> -->
</template>

<script setup>
import {getCode,checkCode,phoneLogin} from '@/Api/api_login'
import {reactive,ref} from 'vue'


const codeObject=reactive({
  phoneNumber:'',
  code:''
})


const GetCode=()=>{
  console.log(codeObject.phoneNumber)
  const res =getCode(codeObject.phoneNumber)
  console.log(res)
}


const CheckCode=()=>{
  const res =checkCode(codeObject.phoneNumber,codeObject.code)
  console.log(res)
}

const PhoneLogin=()=>{
 const res=phoneLogin(codeObject.phoneNumber,codeObject.code) 
 console.log(res)

}
</script>
<style lang="less" scoped>
.login-form {
  margin-top: 50px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  .el-form-item {
    padding: 10px;
  }
}

.test-border {
  display: flex;
  width: 100%;
  .test-write-ctr {
    width: 180px;
  }
  .test-send-ctr {
    margin-top: 10px;
    margin-left: 10px;
    border-radius: 50px;
    height: 40px;
    width: 100px;
    // background-color: blue;
  }
}
.login_btn {
  margin-top: 40px;
  height: 40px;
  border-radius: 20px;
  // border:solid 1px;
  color: white;
  background-image: linear-gradient(to right, #abae72, #a6c1ee);
}

/deep/ .el-input__wrapper {
  border-radius: 7px;
  background-color: #efefefdc;
  // padding: 1px 23px;
}
/deep/ .el-input__inner {
  height: 36px;
}
/deep/ .el-form-item__content {
  // width: 160px;
}

.el-input {
  --el-input-focus-border-color: #3534344a;
}
</style>
