const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

// 建立新餐廳資料頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 建立新餐廳資料
router.post('/new', (req, res) => {
  const restaurant = Restaurant({
    name: req.body.name,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description,
    userId: req.user._id,
  })
  restaurant.save((err) => {
    if (err) return console.log(err)
    res.redirect('/')
  })
})

// 查看特定餐廳頁面
router.get('/:id', (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    res.render('detail', { restaurant })
  })
})

// 編輯特定餐廳頁面
router.get('/:id/edit', (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    res.render('edit', { restaurant })
  })
})

// 編輯特定餐廳
router.put('/:id/edit', (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.name = req.body.name
    restaurant.category = req.body.category
    restaurant.image = req.body.image
    restaurant.location = req.body.location
    restaurant.phone = req.body.phone
    restaurant.google_map = req.body.google_map
    restaurant.rating = req.body.rating
    restaurant.description = req.body.description

    restaurant.save((err) => {
      if (err) return console.error(err)
      res.redirect('/restaurants/' + req.params.id)
    })
  })
})

// 刪除特定餐廳
router.delete('/:id/', (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    restaurant.remove((err) => {
      if (err) return console.error(err)
      res.redirect('/')
    })
  })
})

module.exports = router