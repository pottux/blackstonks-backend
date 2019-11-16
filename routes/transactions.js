const transactionRouter = require('express').Router()
const Transaction = require('../models/Transaction')

transactionRouter.get('/all', async (req, res) => {
  const transactions = await Transaction.find({})
  res.json(transactions.map(Transaction.format))
})

module.exports = transactionRouter