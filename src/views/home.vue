<template>
  <div class="common-layout">
    <el-container>
      <el-header>你好{{ username }}</el-header>
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
            <el-table :data="info" border style="width: 100%">
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
import { useRoute } from 'vue-router'
import { getAll, getInquire, getAdd, getUpdate, getDel } from '@/api'
let username = reactive('')
let ids = ref()
let name = ref('')
let address = ref('')
let tel = ref()
let info = ref([])
const route = useRoute() //获取到值
username = route.params.name
const all = async () => {
  const data = await getAll()
  info.value = data
}
const del = async () => {
  const id = ids.value
  const data = await getDel({ id })
  all()
}
const getInquires = async () => {
  const id = ids.value
  const data = await getInquire({ id })
  info.value = data
}
const add = async () => {
  const data = await getAdd({ name: name.value, address: address.value, tel: tel.value })
  all()
}
const update = async () => {
  const data = await getUpdate({ id: ids.value, name: name.value, address: address.value, tel: tel.value })
  all()
}
</script>

<style scoped>
.common-layout {
  width: 100%;
}
.el-header {
  margin: 0 100px;
  background-color: #ccc;
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
</style>
