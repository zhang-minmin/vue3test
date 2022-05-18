let express = require('express')
let router = express.Router()
let index = require('./API/index')
let user = require('./API/user')
let login = require('./API/login')
let info = require('./API/list')
var multer = require('multer')

/**
 * 文件上传
 */
const storage = multer.diskStorage({
  destination: 'public/upload/imgs',
  filename: function (req, file, cb) {
    const fileFormat = file.originalname.split('.')
    const filename = new Date().getTime()
    cb(null, filename + '.' + fileFormat[fileFormat.length - 1]) // 拼接文件名
  }
})

const upload = multer({
  storage
})
/**
 * 设置CROS允许跨域
 */
// router.all('*', (req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Headers', 'authorization')
//   next()
// })

/**
 * token鉴权
 */

const expressJwt = require('express-jwt')
const secretKey = 'itsource'

router.use(
  expressJwt({
    secret: secretKey,
    algorithms: ['HS256']
  }).unless({
    path: ['/login', '/register', '/avatar_upload'] // 不需要验证token的地址
  })
)

// 拦截器
router.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ code: 401, msg: '无效的token' })
  }
})
router.get('/', index.get)
router.get('/user', user.get)
router.get('/avataredit', user.avat)
router.get('/info', user.info)
router.post('/login', login.login)
router.post('/register', login.register)
router.get('/list/all', info.all)
router.get('/list/get', info.get)
router.get('/list/add', info.add)
router.get('/list/update', info.update)
router.get('/list/del', info.del)

// 文件上传
router.post('/avatar_upload', upload.single('file'), (req, res) => {
  let { filename } = req.file
  res.send({ code: 0, msg: '上传成功!', imgUrl: filename })
})

module.exports = router
