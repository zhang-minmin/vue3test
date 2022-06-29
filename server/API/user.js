let db = require('../db/index')

exports.get = (req, res) => {
  var sql = 'select * from user'
  db.query(sql, [req.query.name, req.query.password], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send(data)
  })
}
// 保存头像
exports.avat = (req, res) => {
  let { imgUrl } = req.query
  if (!imgUrl) {
    res.send({ code: 5001, msg: '参数错误!' })
    return
  }
  var sql = 'update user set imgUrl = ? where id = ?'
  db.query(sql, [imgUrl, req.user.id], (err, data) => {
    if (err) throw err
    if (data.affectedRows > 0) {
      res.send({ code: 0, msg: '修改头像成功!' })
    } else {
      res.send({ code: 1, msg: '修改头像失败!' })
    }
  })
}
// 获取个人中心
exports.info = (req, res) => {
  const sql = 'select id,name,imgUrl from user where id=?'
  db.query(sql, [req.user.id], (err, data) => {
    if (err) throw err
    if (data.length) {
      data[0].imgUrl = 'http://127.0.0.1:5555/upload/imgs/' + data[0].imgUrl
      res.send({ accountInfo: data[0] })
    }
  })
}
