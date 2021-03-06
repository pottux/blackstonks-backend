const Transaction = require('../models/Transaction')

module.exports.getTransactionsMonth = async (months) => {
  const endDate = new Date()
  endDate.setMonth(endDate.getMonth() - months)
  try {
    const transactions = await Transaction.find({
      date: {
        '$gte': endDate,
        '$lte': Date.now()
      }
    }).sort([['date', -1]])
    return transactions.map(Transaction.format)
  } catch (error) {
    return error
  }
}

module.exports.getTransactionsByName = async (query) => {
  try {
    const transactions = await Transaction.find({ name: { $regex: query.join('|'), $options: 'i' } })
    return transactions.map(Transaction.format)
  } catch (error) {
    return error
  }
}

module.exports.getAll = async () => {
  try {
    const transactions = await Transaction.find({}).sort([['date', -1]])
    return transactions.map(Transaction.format)
  } catch (error) {
    return error
  }
}