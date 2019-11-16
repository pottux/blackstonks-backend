const { mockData, getCategory, getRecurringExpenses } = require('../utils')
const { getTransactionsMonth } = require('./transactionsService')
const recurringExpenses = {}

const addRecurringExpense = (expense) => {
    if (!(expense.name in recurringExpenses)) {
        recurringExpenses[expense.name] = {
            expenses: [],
            ratings: [],
            amount: null,
            category: getCategory(expense.name)
        }
    }
    recurringExpenses[expense.name]['expenses'].push(expense)
    recurringExpenses[expense.name]['amount'] = expense.amount / 100
}

const addRating = (expenseName, rating, date) => {
    if (!expenseName in recurringExpenses) {
        return
    }
    recurringExpenses[expenseName]['ratings'].push({
        rating,
        date
    })
    console.log(JSON.stringify(recurringExpenses,null, 4))
}

const initialize = () => {
    getTransactionsMonth(3)
        .then(expenses => getRecurringExpenses(expenses))
        .then(expenses => expenses.forEach(expense => addRecurringExpense(expense)))
        .then(() => console.log(JSON.stringify(recurringExpenses, null, 4)))
}

exports.initialize = initialize
exports.recurringExpenses = recurringExpenses
exports.addRecurringExpense = addRecurringExpense
exports.addRating = addRating