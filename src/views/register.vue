<template>
  <div class="bg">
    <div id="register">
      <h2>注册页面</h2>
      <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" style="max-width: 460px">
        <el-form-item label="账号:">
          <el-input v-model="formLabelAlign.username" />
        </el-form-item>
        <el-form-item label="密码:">
          <el-input type="password" v-model="formLabelAlign.password" />
        </el-form-item>
      </el-form>
      <el-button type="primary" round @click="registers" class="btn">注册</el-button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { register } from '@/api'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
const formLabelAlign = reactive({
  params: {
    username: '',
    password: ''
  }
})
const router = useRouter()
const registers = async () => {
  const { data } = await register({
    name: formLabelAlign.username,
    password: formLabelAlign.password
  })
  const { status, message } = data
  if (status === 200) {
    ElMessageBox.confirm('注册成功,是否跳转到登录', 'Success ', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'success'
    })
      .then(() => {
        router.push({ name: 'login' })
        ElMessage({
          type: 'success',
          message: '跳转成功'
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '关闭'
        })
      })
  } else {
    ElMessage({
      message: message,
      type: 'warning '
    })
  }
}
</script>

<style scoped>
.bg {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url('../assets/img/register_bg.jpg');
  background-size: 100% 100%;
}
#register {
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
  flex-direction: column; /*横向*/
  padding: 30px;
}
#register h2 {
  padding-bottom: 30px;
}
.btn {
  width: 60%;
  margin: auto;
}
</style>
