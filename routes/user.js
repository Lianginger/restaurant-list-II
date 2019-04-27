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
  const { name, email, password, password2 } = req.body
  User.findOne({ email }).then(user => {
    if (user) {
      // User already exists
      res.render('register', { name, email, password, password2 })
    } else {
      const newUser = new User(req.body)
      newUser.save()
        .then(user => { res.redirect('/') })
        .catch(err => console.log(err))

    }
  })
})

// 登出
router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router