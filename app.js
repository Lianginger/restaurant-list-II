const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// 設定模板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 提供靜態檔案
app.use(express.static('public'))

// 設定 method-override
app.use(methodOverride('_method'))

// 解析 req 資料
app.use(bodyParser.urlencoded({ extended: true }))

// 設定連線到 mongoDB
// 開發時可以打開 mongoose.set("debug", true);
mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongodb is connected!')
});

// 處理請求與回應
app.use('/', require('./routes/home'))
app.use('/users', require('./routes/user'))
app.use('/restaurants', require('./routes/restaurants'))

// 啟動並監聽
app.listen(port, () => {
  console.log(`The express is running on http://localhost:${port}`)
})