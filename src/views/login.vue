<template>
  <div class="bg">
    <div id="login">
      <h2>登录页面</h2>
      <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" style="max-width: 460px">
        <el-form-item label="账号:">
          <el-input v-model="formLabelAlign.username" />
        </el-form-item>
        <el-form-item label="密码:">
          <el-input type="password" v-model="formLabelAlign.password" />
        </el-form-item>
      </el-form>
      <el-button type="primary" round @click="login" class="btn">登录</el-button>
      <span @click="register" class="reg">前往注册</span>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { getlogin } from '@/api'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import local from '../utils/local'
import md5 from 'js-md5';
const formLabelAlign = reactive({
  username: '',
  password: ''
})
const router = useRouter() //跳转

const login = async () => {
  const data = await getlogin({
    name: formLabelAlign.username,
    password: md5(formLabelAlign.password)
  })
  const { status, message, token } = data
  if (status === 200) {
    local.set('token', token)
    ElMessage({
      message: message,
      type: 'success'
    })
    router.push({
      name: 'home',
      params: {
        name: formLabelAlign.username
      }
    })
  } else {
    ElMessage({
      message: message,
      type: 'error'
    })
  }
}
function register () {
  router.push({ name: 'register' })
}
</script>

<style scoped>
.bg {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url('../assets/img/login_bg.jpg');
  background-size: 100% 100%;
}

#login {
  height: 250px;
  width: 350px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.25);
  background: #ffffff;
  opacity: 0.85;
  position: absolute;
  top: 20%;
  left: 40%;
  text-align: center;
  display: flex;
  flex-direction: column;
  /*横向*/
  padding: 30px;
}

#login h2 {
  padding-bottom: 30px;
}

.btn {
  width: 60%;
  margin: auto;
}

.reg {
  color: red;
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
}</style>
