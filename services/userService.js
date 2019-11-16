const { mockData, getCategory } = require('../utils')

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
    recurringExpenses[expense.name]['amount'] = expense.amount
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
mockData.filter(expense => expense.name === "asd")
    .forEach(expense => addRecurringExpense(expense))

// console.log(recurringExpenses['asd'])

addRating('asd', 4, 1573923306)
addRating('asd', 2, 1573776000)

console.log(JSON.stringify(recurringExpenses,null,4))

