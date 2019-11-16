const { mockData, getCategory, getRecurringExpenses } = require('../utils')
const { getTransactionsMonth, getTransactionsByName } = require('./transactionsService')
const mockRatings = require('../ratings.json')
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

const getRecurringExpensesArray = () => {
    const agg = []
    for (let key of Object.keys(recurringExpenses)) {
        agg.push({
            name: key,
            ...recurringExpenses[key]
        })
    }
    return agg
}

const addRating = (expenseName, rating, date) => {
    if (!expenseName in recurringExpenses) {
        return
    }
    recurringExpenses[expenseName]['ratings'].push({
        rating,
        date
    })
    console.log(JSON.stringify(recurringExpenses, null, 4))
}

const initialize = () => {
    getTransactionsMonth(3)
        .then(expenses => getRecurringExpenses(expenses))
        .then(expenses => getTransactionsByName([...new Set(expenses.map(expense => expense.name))]))
        .then(expenses => expenses.forEach(expense => addRecurringExpense({
            ...expense,
            date: expense.date.getTime()
        })))
        .then(() => {
            for (let key of Object.keys(mockRatings)) {
                for (let rating of mockRatings[key]) {
                    addRating(rating.name, rating.rating, rating.date)
                }
            }

        })
        .then(() => console.log(JSON.stringify({ recurringExpenses }, null, 4)))
}

exports.initialize = initialize
exports.getRecurringExpensesArray = getRecurringExpensesArray
exports.addRecurringExpense = addRecurringExpense
exports.addRating = addRating