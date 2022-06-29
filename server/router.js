let express = require('express')
let router = express.Router()
let index = require('./API/index')
let user = require('./API/user')
let login = require('./API/login')
let info = require('./API/list')
let multer = require('multer')
let db = require('./db/index')
let fs = require('fs')
/**
 * 文件上传
 */
const storage = multer.diskStorage({
  destination: 'public/upload/imgs',
  filename: function (req, file, cb) {
    // 第一种
    // const fileFormat = file.originalname.split('.')
    // const filename = new Date().getTime()
    // cb(null, filename + '-' + fileFormat[0] + '.' + fileFormat[fileFormat.length - 1]) // 拼接文件名
    //第二种
    const sql = 'select id,name,imgUrl from user where id=?'
    db.query(sql, [req.body.imgId], (err, data) => {
      if (err) throw err
      if (data.length) {
        deleteall('./public/upload/imgs', req.body.imgId) //同一个账号只能有一个头像
        const filename = new Date().getTime()
        cb(null, filename + '-' + req.body.imgId + '-' + file.originalname) // 拼接文件名
      }
    })
  }
})

const upload = multer({
  storage
})

const deleteall = (path, id) => {
  var files = []
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path)

    files.forEach(function (file, index) {
      const curPath = path + '/' + file
      let filesList = file.split('-')
      if (filesList.includes(id)) {
        // console.log('file', file)
        fs.unlinkSync(curPath)
      }

      // if (fs.statSync(curPath).isDirectory()) {
      //   // recurse
      //   deleteall(curPath)
      // } else {
      //   // delete file
      //   fs.unlinkSync(curPath)
      // }
    })
    // fs.rmdirSync(path)
  }
}

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
