# GingerFood 美食餐廳清單網站
這是一個使用 Express + MongoDB 打造的美食餐廳清單網站，包含了許多我精選推薦的美食餐廳，擁有最完整的分門別類餐廳資訊，包含：評分、類別、地址、電話等，讓您輕鬆找到好店。  

![畫面截圖](https://github.com/Lianginger/restaurant-list-II/blob/master/public/img/screenshot-index.jpg)

# 功能：
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
## 匯入種子檔案
執行 restaurantSeeder.js 檔案，匯入精選餐廳資料
```
node .\models\seeds\restaurantSeeder.js
```
當終端機(Terminal)出現以下字樣
```
Mongodb is connected!
Creating seeder data is finished!
```
即表示種子資料已新增完成，按下 ctrl + c 結束執行

## 啟動伺服器
執行 app.js 檔案
```
node app.js
```
當終端機(Terminal)出現以下字樣
```
The Express server is running on http://localhost:3000
Mongodb is connected!
```
即表示伺服器與資料庫已啟動並連結成功，在瀏覽器輸入 [http://localhost:3000](http://localhost:3000) 就可以開始尋找美食餐廳嘍！