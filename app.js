const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')

// 設定模板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 提供靜態檔案
app.use(express.static('public'))

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
  Restaurant.find((err, restaurants) => {
    res.render('index', { restaurants })
  })
})

// 建立新餐廳資料頁面
app.get('/restaurants/new', (req, res) => {
  res.send('建立新餐廳資料頁面')
})

// 建立新餐廳資料
app.post('/restaurants/new', (req, res) => {
  res.send('建立新餐廳資料')
})

// 查看特定餐廳頁面
app.get('/restaurants/:id', (req, res) => {
  res.send('查看特定餐廳頁面')
})

// 編輯特定餐廳頁面
app.get('/restaurants/:id/edit', (req, res) => {
  res.send('編輯特定餐廳頁面')
})

// 編輯特定餐廳
app.post('/restaurants/:id/edit', (req, res) => {
  res.send('編輯特定餐廳')
})

// 刪除特定餐廳
app.post('/restaurants/:id/delete', (req, res) => {
  res.send('刪除特定餐廳')
})

// 啟動並監聽
app.listen(port, () => {
  console.log(`The express is running on http://localhost:${port}`)
})