const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')

// 設定模板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 提供靜態檔案
app.use(express.static('public'))

// 解析 req 資料
app.use(bodyParser.urlencoded({ extended: true }))

// 設定連線到 mongoDB
mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongodb is connected!')
});

// 處理請求與回應
// 列出所有餐廳
app.get('/', (req, res) => {
  Restaurant.find()
    .sort({ _id: -1 })
    .exec((err, restaurants) => {
      res.render('index', { restaurants })
    })
})

// 建立新餐廳資料頁面
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

// 建立新餐廳資料
app.post('/restaurants/new', (req, res) => {
  const restaurant = Restaurant({
    name: req.body.name,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description
  })

  restaurant.save((err) => {
    if (err) return console.log(err)
    res.redirect('/')
  })
})

// 查看特定餐廳頁面
app.get('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    res.render('detail', { restaurant })
  })
})

// 編輯特定餐廳頁面
app.get('/restaurants/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    res.render('edit', { restaurant })
  })
})

// 編輯特定餐廳
app.post('/restaurants/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.name = req.body.name
    restaurant.category = req.body.category
    restaurant.image = req.body.image
    restaurant.location = req.body.location
    restaurant.phone = req.body.phone
    restaurant.google_map = req.body.google_map
    restaurant.rating = req.body.rating
    restaurant.escription = req.body.description

    restaurant.save((err) => {
      if (err) return console.error(err)
      res.redirect('/restaurants/' + req.params.id)
    })
  })
})

// 刪除特定餐廳
app.post('/restaurants/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    restaurant.remove((err) => {
      if (err) return console.error(err)
      res.redirect('/')
    })
  })
})

// 啟動並監聽
app.listen(port, () => {
  console.log(`The express is running on http://localhost:${port}`)
})