// 首页数据
import req from '../utils/request.js'

// 登录
export function getlogin(query) {
  return req.post('/login', query)
}

// 注册
export function register(query) {
  return req.post('/register', query)
}

// 首页的数据信息
export function getInfo(query) {
  return req.get('/user', query)
}
// 查询全部
export function getAll(query) {
  return req.get('/list/all', query)
}
// 通过id查询
export function getInquire(query) {
  return req.get('/list/get', query)
}
// 添加
export function getAdd(query) {
  return req.get('/list/add', query)
}
// 修改
export function getUpdate(query) {
  return req.get('/list/update', query)
}
// 删除
export function getDel(query) {
  return req.get('/list/del', query)
}
