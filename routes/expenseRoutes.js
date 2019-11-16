const express = require('express')

const Transactions = require('../models/Transactions')
const { getTransactionsByCurrentMonth } = require('../expensesService')

const router = express.Router()

const getTransactions = async () => {
  try {
    const transactions = await getTransactionsByCurrentMonth();
    res.status(200).send(transactions);
  } catch(err) {
    res.status(500).send(err)
  }
}

router.use('/getTransactions', getTransactions);

module.exports = router
