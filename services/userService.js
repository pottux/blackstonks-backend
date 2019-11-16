const { getRecurringExpenses } = require('../utils')
const { getTransactionsMonth, getTransactionsByName } = require('./transactionsService')
const { getAllCategories } = require('./categoriesService')
const mockRatings = require('../ratings.json')
const recurringExpenses = {}

const addRecurringExpense = async (expense, categories) => {
    if (!(expense.name in recurringExpenses)) {
        const category = categories.filter(e => e.service.includes(expense.name.toLowerCase())).pop()
        recurringExpenses[expense.name] = {
            expenses: [],
            ratings: [],
            amount: null,
            category: category ? category.name : 'other'
        }
    }
    recurringExpenses[expense.name]['expenses'].push(expense)
    recurringExpenses[expense.name]['amount'] = expense.amount
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
}

const initialize = () => {
    getAllCategories().then(categories => {
        getTransactionsMonth(3)
            .then(expenses => getRecurringExpenses(expenses))
            .then(expenses => getTransactionsByName([...new Set(expenses.map(expense => expense.name))]))
            .then(expenses => expenses.forEach(expense => addRecurringExpense({
                name: expense.name,
                amount: expense.amount / 100,
                date: expense.date.getTime()
            }, categories)))
            .then(() => {
                for (let key of Object.keys(mockRatings)) {
                    for (let rating of mockRatings[key]) {
                        addRating(rating.name, rating.rating, rating.date)
                    }
                }

            })
    })
}

exports.initialize = initialize
exports.getRecurringExpensesArray = getRecurringExpensesArray
exports.addRecurringExpense = addRecurringExpense
exports.addRating = addRating