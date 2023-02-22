/*
 * @Author: [敲代码的小可爱] [403652304@qq.com]
 * @Date: 2022-05-12 14:39:10
 * @LastEditors: [敲代码的小可爱] [403652304@qq.com]
 * @LastEditTime: 2023-02-22 14:49:54
 * @FilePath: \vue3test\server\API\login.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
let db = require('../db/index')
const jwt = require('jsonwebtoken')
const secretKey = 'itsource'
exports.login = (req, res) => {
  let { name, password } = req.body
  if (!(name && password)) {
    res.send({ code: 5001, msg: '参数错误!' })
    return
  }
  const sql = 'select * from user where name = ? and password = ?'
  db.query(sql, [name, password], (err, data) => {
    if (err) {
      return res.send({
        status: 400,
        message: '登录失败'
      })
    }

    if (data.length > 0) {
      const userInfo = { ...data[0] }
      delete userInfo.password
      const token =
        'Bearer ' +
        jwt.sign(userInfo, secretKey, {
          expiresIn: 60 * 60 * 7 * 24
        })
      res.send({
        status: 200,
        message: '登录成功',
        token
      })
    } else {
      res.send({
        status: 202,
        message: '用户名或密码错误'
      })
    }
  })
}

exports.register = (req, res) => {
  let { name, password } = req.body
  if (!(name && password)) {
    res.send({ code: 5001, msg: '参数错误!' })
    return
  }
  const sql1 = 'select * from user where name = ?'
  const sql2 = 'insert into user (name, password) value (?, ?)'
  db.query(sql1, [name], (err, data) => {
    console.log(err, data)
    if (err) {
      return res.send({
        status: 400,
        message: '操作失败'
      })
    }
    if (data.length > 0) {
      return res.send({
        status: 202,
        message: '用户名已存在'
      })
    } else {
      // return res.send({
      //   status: 200,
      //   message: '注册成功'
      // })
      db.query(sql2, [name, password], (err, data) => {
        if (err) {
          return res.send({
            status: 400,
            message: '注册失败'
          })
        }
        res.send({
          status: 200,
          message: '注册成功'
        })
      })
    }
  })
}
