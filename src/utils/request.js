//1.引入axios
import axios from 'axios'
import qs from 'qs'
import local from './local'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 2.0 写入一些配置  baseURL   timeout
axios.defaults.baseURL = 'http://localhost:5555'
axios.defaults.timeout = 5555

// 3.0 拦截器
// 请求拦截器
axios.interceptors.request.use((config) => {
  NProgress.start()
  const token = local.get('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
// 响应拦截器
axios.interceptors.response.use((res) => {
  NProgress.done()
  const { code, msg } = res.data
  console.log(res.data)
  return res.data
})

// 简单处理一下get和post的方法
export default {
  get(url, params) {
    console.log({ params })
    return new Promise((resolve) => {
      axios
        .get(url, { params })
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          // 处理失败的请求
          console.log(err)
        })
    })
  },
  // post 请求只能接收  k=v&k=v 的数据格式
  post(url, query) {
    return new Promise((resolve) => {
      axios
        .post(url, query)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          // 处理失败的请求
          console.log(err)
        })
    })
  }
}
