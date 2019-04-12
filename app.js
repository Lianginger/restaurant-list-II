const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

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
  res.send('列出所有餐廳')
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