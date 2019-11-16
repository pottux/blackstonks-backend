const mongoose = require('mongoose')
const Transaction = require('./models/Transaction')

const old = mongoose.model('payments', new mongoose.Schema({
  date: String,
  name: String,
  human_amount: String,
  amount: Number,
}))

const dates = [
  '2019-11-03T00:00:00',
  '2019-10-03T00:00:00',
  '2019-09-03T00:00:00',
  '2019-08-03T00:00:00',
  '2019-07-03T00:00:00',
  '2019-06-03T00:00:00',
  '2019-05-03T00:00:00',
  '2019-04-03T00:00:00',
  '2019-03-03T00:00:00',
  '2019-02-03T00:00:00',
  '2019-01-03T00:00:00'
]

module.exports.pushData = async () => {
  const go = []
  await Transaction.deleteMany()
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

module.exports.listData = async () => {
  const result = await Transaction.find({})
  return result
}

module.exports.putData = async () => {
  dates.forEach(async (e) => {
    const t = new Transaction({
      date: e,
      name: 'HBO',
      amount: -1195,
    })
    await t.save()
  })
}

module.exports.filterDb = async () => {
  const result = await Transaction.find({})
  const filtered = result.filter(e => !e.name.includes('Komp25'))
  //const filtered = result.filter(e => e.amount < 0)
  await Transaction.deleteMany()
  filtered.forEach(async (e) => {
    const t = new Transaction({
      date: e.date,
      name: e.name,
      amount: e.amount,
    })
    await t.save()
  })
  return filtered
}