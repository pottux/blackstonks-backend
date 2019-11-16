const mongoose = require('mongoose')

const Transaction = mongoose.model('Transaction', new mongoose.Schema({
    //UserId and proper timestamp omitted for demo reasons
    name: String,
    amount: Number,
    type: String,
    month: Number,
    category: String,
}))

module.exports = Transaction;
