const ratingRouter = require('express').Router()
const { addRating } = require('../services/userService')

ratingRouter.post('/', async (req, res) => {
    const { name, rating } = req.body
    name && rating && addRating(name, rating, Date.now())
    res.status(200).send()
})

module.exports = ratingRouter