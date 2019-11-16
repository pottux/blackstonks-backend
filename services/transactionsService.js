const Transaction = require('../models/Transaction')

module.exports.getTransactionsMonth = async (months) => {
  const endDate = new Date()
  endDate.setMonth(endDate.getMonth() - months)
  const transactions = await Transaction.find({
    date: {
      '$gte': endDate,
      '$lte': Date.now()
    }
  }).sort([['date', -1]])
  return transactions.map(Transaction.format)
}

module.exports.getAll = async () => {
  const transactions = await Transaction.find({})
  return transactions.map(Transaction.format)
}