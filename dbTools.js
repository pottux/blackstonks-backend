const mongoose = require('mongoose')
const Transaction = require('../models/Transaction')

const old = mongoose.model('payments', new mongoose.Schema({
  date: String,
  name: String,
  human_amount: String,
  amount: Number,
}))

module.exports.pushData = () => {
  const result = await old.find({})
  result.forEach(async (e) => {
    const d = e.date.split('-')
    const dates = d[1] + '-' + d[0] + '-' + d[2]
    const t = new Transaction({
      date: Date.parse(dates),
      name: e.name,
      amount: e.amount,
    })
    await t.save()
  })
}

module.exports.filterDb = () => {
  const result = await transactionsService.getAll()
  const filtered = result.filter(e => e.amount < 0)
  await Transaction.deleteMany()
  filtered.forEach(async (e) => {
    const t = new Transaction({
      date: e.date,
      name: e.name,
      amount: e.amount,
    })
    await t.save()
  })
}