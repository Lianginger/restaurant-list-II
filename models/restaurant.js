const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RestaurantSchema = new Schema({
  name: String,
  name_en: String,
  category: String,
  image: String,
  location: String,
  phone: String,
  google_map: String,
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  description: String
})

module.exports = mongoose.model('Restaurant', RestaurantSchema)