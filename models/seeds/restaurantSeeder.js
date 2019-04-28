const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantSeeder = require('./restaurantSeederData.json')
const restaurantArray = restaurantSeeder.results
const userSeeder = require('./userSeederData.json')
const userArray = userSeeder.results

// mongoose.connect('mongodb://localhost/restaurant_list', {
//   useNewUrlParser: true,
//   useCreateIndex: true
// })
// const db = mongoose.connection

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   console.log('Mongodb is connected!')
// })

module.exports = (() => {
  userArray.map(user => {
    const seederUser = user
    User.findOne({ email: user.email }).then(user => {
      if (user) {
        console.log('Seeder data already exists.')
      } else {
        const newUser = new User(seederUser)
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(newUser.password, salt, function (err, hash) {
            // Store hash in your password DB.
            if (err) throw err
            newUser.password = hash
            newUser.save().then(user => {
              const firstThreeRestaurants = restaurantArray.splice(0, 3)
              firstThreeRestaurants.map(restaurant => {
                const newRestaurant = new Restaurant(restaurant)
                newRestaurant.userId = user._id
                newRestaurant.save()
              })
            }).catch(err => console.log(err))
          })
        })
        console.log('Creating seeder data is finished!')
      }
    })
  })
})()



