const express = require('express')
const app = express()
const port = 3000

// 處理請求與回應
app.get('/', (req, res) => {
  res.send('Hello word!')
})

// 啟動並監聽
app.listen(port, () => {
  console.log(`The express is running on http://localhost:${port}`)
})