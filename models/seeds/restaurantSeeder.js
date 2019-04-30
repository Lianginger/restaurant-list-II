const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantSeeder = require('./restaurantSeederData.json')
const restaurantArray = restaurantSeeder.results
const userSeeder = require('./userSeederData.json')
const userArray = userSeeder.results

module.exports = (() => {
  userArray.map(user => {
    const seederUser = user
    User.findOne({ email: user.email }).then(user => {
      if (user) {
        console.log(`Seeder data ${user.email} already exists.`)
      } else {
        const newUser = new User(seederUser)
        newUser.save().then(user => {
          const firstThreeRestaurants = restaurantArray.splice(0, 3)
          firstThreeRestaurants.map(restaurant => {
            const newRestaurant = new Restaurant(restaurant)
            newRestaurant.userId = user._id
            newRestaurant.save()
          })
          console.log(`Creating seeder data ${user.email} is finished!`)
        }).catch(err => console.log(err))

      }
    })
  })
})()



