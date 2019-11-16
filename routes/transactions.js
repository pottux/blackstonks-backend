const transactionRouter = require('express').Router()
const transactionsService = require('../services/transactionsService')

//Query months ie. ?months=1
transactionRouter.get('/', async (req, res) => {
  const months = req.query.months || 12
  const result = await transactionsService.getTransactionsMonth(months)
  res.json(result)
})

transactionRouter.get('/all', async (req, res) => {
  const result = await transactionsService.getAll()
  res.json(result)
})

module.exports = transactionRouter