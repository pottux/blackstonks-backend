const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    date: Date,
    name: String,
    amount: Number,
})

transactionSchema.statics.format = (transaction) => {
    return {
        date: transaction.date,
        name: transaction.name,
        amount: transaction.amount
    }
}

const Transaction = mongoose.model('transactions', transactionSchema)

module.exports = Transaction;
