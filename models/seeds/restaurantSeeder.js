const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantSeeder = require('./restaurantSeederData.json')
const restaurantArray = restaurantSeeder.results

mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongodb is connected!')
  Restaurant.insertMany(restaurantArray, function (error, docs) {
    console.log('Creating seeder data is finished!')
  })
});



