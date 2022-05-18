let express = require('express')
let app = express()
let cors = require('cors')
var path = require('path')
let bodyParser = require('body-parser')
let router = require('./router')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json()) //配置解析，用于解析json和urlencoded格式的数据
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors()) //配置跨域
app.use(router) //配置路由

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(5555, () => {
  console.log('服务器启动成功,， 地址是: http://127.0.0.1:5555/')
})
