const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

router.get('/', (req, res) => {
  const searchKeyword = req.query.searchKeyword
  const searchKeywordRegExp = new RegExp(req.query.searchKeyword, 'i')
  const sortField = req.query.sortField || undefined
  const sortOrder = req.query.sortOrder || undefined
  const sortObject = {}
  sortObject[sortField] = sortOrder

  Restaurant
    .find({
      $or: [{ name: { $regex: searchKeywordRegExp } },
      { category: { $regex: searchKeywordRegExp } }]
    })
    .sort(sortObject)
    .exec((err, restaurants) => {
      if (err) return console.log(err)
      res.render('index', { restaurants, searchKeyword, sortField, sortOrder })
    })
})

module.exports = router