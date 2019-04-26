const express = require('express')
const router = express.Router()
const User = require('../models/user')

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 登入檢查
router.post('/login', (req, res) => {
  res.render('login')
})

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// 註冊檢查
router.post('/register', (req, res) => {
  res.render('register')
})

// 登出
router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router