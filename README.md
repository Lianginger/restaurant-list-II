# GingerFood 美食餐廳清單網站
這是一個使用 Express + MongoDB 打造的美食餐廳清單網站，擁有最完整的分門別類餐廳資訊，包含：評分、類別、地址、電話等，讓您輕鬆整理好店。  
👉 [Demo website](https://gingerfood.herokuapp.com/)  
歡迎使用下面提供的種子帳戶登入，看看我精選推薦的美食餐廳吧！  
( 登入後請別亂用阿！留給下一位使用者乾淨的環境 😉)
```
Email:ginger@mail.com
Password:123456
```
![畫面截圖](https://github.com/Lianginger/restaurant-list-II/blob/master/public/img/screenshot-index.jpg)

# 功能：
- 可以註冊帳號登入 / Facebook 快速登入
- 密碼要使用 bcrypt 處理
- 依餐廳名稱、餐廳類別搜尋餐廳
- 依餐廳名稱、類別及地區排序
- 瀏覽全部所有餐廳
- 能新增 / 瀏覽 / 修改 / 刪除一家餐廳的資訊
  
![網站功能](https://github.com/Lianginger/restaurant-list-II/blob/master/public/img/restaurant-feature.gif)

## 安裝前提
- [MongoDB 4.0 以上](https://docs.mongodb.com/manual/installation/)
- [Node.js](https://nodejs.org/en/download/)

## 如何安裝
開啟終端機(Terminal)，Clone 這個專案
```
git clone https://github.com/Lianginger/restaurant-list-II.git
```
進入檔案夾，並下載所有相依套件
```
cd restautant-list-II
npm install
```
## 啟動伺服器
執行 app.js 檔案
```
node app.js
```
當終端機(Terminal)出現以下字樣
```
The Express server is running
Mongodb is connected!
```
即表示伺服器與資料庫已啟動並連結成功，在瀏覽器輸入 [http://localhost:3000](http://localhost:3000) 就可以開始尋找美食餐廳嘍！