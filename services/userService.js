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
            part: recurringExpenses[key].amount / Object.values(recurringExpenses)
                .filter(x => x.category ===recurringExpenses[key].category)
                .map(x => x.amount)
                .reduce((a,b) => a+b,0),
            ratingMean:recurringExpenses[key]['ratings'].map(x => x.rating).reduce((a,c) => a+c,0)/recurringExpenses[key]['ratings'].length,
            ...recurringExpenses[key]
        })
    }

    for (let i = 0; i < agg.length; i++) {
        const jee = agg[i]
        const sameCategory = agg
            .filter(x => x.category === jee.category)
            .filter(x => x.name !== jee.name)
        const morePoints = sameCategory
            .filter(x => x.ratingMean > jee.ratingMean)
        
        const colorByPoints = jee.ratingMean > 3 ? 3 :
        jee.ratingMean > 2 ? 2 :
        1

        const colorBySameCategory = Math.max(4 - Math.max(1, morePoints.length), 1)

        agg[i] = {
            ...jee,
            color: Math.min(colorByPoints, colorBySameCategory),
            colorByCategory: colorBySameCategory < colorByPoints,
        }
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
            .then(() => console.log(JSON.stringify(recurringExpenses,null,4)))
    })
}

exports.initialize = initialize
exports.getRecurringExpensesArray = getRecurringExpensesArray
exports.addRecurringExpense = addRecurringExpense
exports.addRating = addRating