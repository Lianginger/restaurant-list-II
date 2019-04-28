const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = passport => {
  passport.use(new LocalStrategy({
    usernameField: 'email'
  },
    (email, password, done) => {
      User.findOne({ email }).then(user => {
        if (!user) {
          return done(null, false, { message: 'Email 未註冊' })
        }
        bcrypt.compare(password, user.password, function (err, isMatch) {
          // isMatch === true
          if (err) throw err
          if (isMatch) {
            return done(null, user)
          } else {
            return done(null, false, { message: '密碼不正確' })
          }
        });
      })
    }))
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName'],
  },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile._json.email })
        .then(user => {
          if (!user) {
            // 因為密碼是必填欄位，所以我們可以幫使用者隨機產生一組密碼，然後用 bcrypt 處理，再儲存起來
            const randomPassword = Math.random().toString(36).slice(-8)
            bcrypt.genSalt(10, function (err, salt) {
              bcrypt.hash(randomPassword, salt, function (err, hash) {
                // Store hash in your password DB.
                const newUser = User({
                  name: profile._json.name,
                  email: profile._json.email,
                  password: hash,
                })
                newUser.save().then(user => {
                  return done(null, user)
                }).catch(err => {
                  console.log(err)
                })
              })
            })
          } else {
            return done(null, user)
          }
        })
    }
  ))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}