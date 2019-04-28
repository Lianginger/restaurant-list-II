module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  } else {
    req.flash('warning_msg', '請先登入才能使用')
    res.redirect('/users/login')
  }
}