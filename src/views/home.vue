<template>
  <div class="common-layout">
    <el-container>
      <el-header
        ><div style="display: flex; align-items: center">
          <div style="margin-right: 10px">你好:{{ username }}</div>
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5555/avatar_upload"
            :data="{ imgId }"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </div>
        <div @click="logout" style="cursor: pointer">退出登录</div>
      </el-header>
      <el-main>
        <div class="big">
          <div>
            <el-button type="primary" @click="all">获取全部数据</el-button>
            <el-divider class="w200" />
            <el-input class="w200" v-model="ids" placeholder="请输入id" />
            <el-divider class="w200" />
            <el-button type="danger" @click="del">删除</el-button>
            <el-button type="primary" @click="getInquires">查询</el-button>
            <el-divider class="w200" />
            <div class="demo-input-suffix">
              <el-row :gutter="20">
                <span class="ml-3 w-35 text-gray-600 inline-flex items-center">id(修改时使用):</span>
                <el-input v-model="ids" class="w-50 m-2 w200" placeholder="请输入id" />
              </el-row>
            </div>
            <el-divider class="w200" />
            <div class="demo-input-suffix">
              <el-row :gutter="20">
                <span class="ml-3 w-35 text-gray-600 inline-flex items-center">姓名:</span>
                <el-input v-model="name" class="w-50 m-2 w200" placeholder="请输入姓名" />
              </el-row>
            </div>
            <el-divider class="w200" />
            <div class="demo-input-suffix">
              <el-row :gutter="20">
                <span class="ml-3 w-35 text-gray-600 inline-flex items-center">地址:</span>
                <el-input v-model="address" class="w-50 m-2 w200" placeholder="请输入地址" />
              </el-row>
            </div>
            <el-divider class="w200" />
            <div class="demo-input-suffix">
              <el-row :gutter="20">
                <span class="ml-3 w-35 text-gray-600 inline-flex items-center">电话:</span>
                <el-input v-model="tel" class="w-50 m-2 w200" placeholder="请输入电话" />
              </el-row>
            </div>
            <el-divider class="w200" />
            <el-button type="danger" @click="add">添加</el-button>
            <el-button type="primary" @click="update">修改</el-button>
          </div>
          <!-- 右边表格 -->
          <div class="right">
            <el-table :data="infoList" border style="width: 100%">
              <el-table-column prop="id" label="id" width="180" />
              <el-table-column prop="name" label="姓名" width="180" />
              <el-table-column prop="address" label="地址" />
              <el-table-column prop="tel" label="电话" />
            </el-table>
          </div>
        </div>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAll, getInquire, getAdd, getUpdate, getDel, uploadAvatar, info } from '@/api'
import local from '../utils/local'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { UploadProps } from 'element-plus'
const imageUrl = ref('')
const imgId = ref()
const imgStr = ref('')
let username = reactive('')
let ids = ref()
let name = ref('')
let address = ref('')
let tel = ref()
let infoList = ref([])
let userInfo = ref({})
const router = useRouter() //跳转
const route = useRoute() //获取到值
route.params.name ? local.set('name', route.params.name) : ''
username = local.get('name')

const all = async () => {
  const data = await getAll()
  infoList.value = data
}
const del = async () => {
  const id = ids.value
  const data = await getDel({ id })
  all()
}
const getInquires = async () => {
  const id = ids.value
  const data = await getInquire({ id })
  infoList.value = data
}
const add = async () => {
  const data = await getAdd({ name: name.value, address: address.value, tel: tel.value })
  all()
}
const update = async () => {
  const data = await getUpdate({ id: ids.value, name: name.value, address: address.value, tel: tel.value })
  all()
}
const logout = () => {
  // 退出登录
  local.cls()
  router.push({
    name: 'login'
  })
}

const handleAvatarSuccess = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
  imgStr.value = response.imgUrl
  saveAvatar()
}
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
const saveAvatar = async () => {
  const { code, data } = await uploadAvatar({
    imgUrl: imgStr.value
  })
  // if (code === 0) {
  //   location.reload()
  // }
}
const getInfo = async () => {
  const data = await info({})
  imageUrl.value = data.accountInfo.imgUrl
  userInfo.value = data.accountInfo
  imgId.value = userInfo.value.id
}
getInfo()
</script>

<style scoped>
.common-layout {
  width: 100%;
}
.el-header {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 100px;
  background-color: #ccc;
}
.imgs {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.big {
  margin: 50px;
  display: flex;
}
.right {
  margin-left: 100px;
}
.w200 {
  width: 200px;
}
.avatar-uploader .avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
