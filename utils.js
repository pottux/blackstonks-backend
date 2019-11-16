var _ = require('lodash');

const mock = [
    {
        name: 'netflix',
        amount: 12.99,
        date: 1573923306,
    },
    {
        name: 'spotify',
        amount: 12.99,
        date: 1573776000,
    },
    {
        name: 'netflix',
        amount: 12.99,
        date: 1573766123,
    },
    {
        name: 'asd',
        amount: 12.99,
        date: 1546300800,
    },
    {
        name: 'asd',
        amount: 12.99,
        date: 1548979200,
    },
]

const expenseIsRecurring = (expenseArray) => {
    if (expenseArray.length <= 1) {
        return false
    }

    // only consider expenses one month apart for now
    // for demo purposes accept 27-32 day difference as a month
    const MIN_DAYS = 27*24*60*60
    const MAX_DAYS = 32*24*60*60
    
    const a = [...expenseArray].sort((A,B) => B.date-A.date)
    for (let i=0; i < a.length-1; i++) {
        if (a[i+1].date < a[i].date-MAX_DAYS || a[i+1].date > a[i].date-MIN_DAYS) {
            // out of date range
            return false
        }
    }
    return true
}


const getRecurringExpenses = (expenses) => {
    const recurringVendorNames = []
    const expensesByVendorName = _.groupBy(expenses, 'name')
    for (let expenseVendorName of Object.keys(expensesByVendorName)) {
        if (expenseIsRecurring(expensesByVendorName[expenseVendorName])) {
            recurringVendorNames.push(expenseVendorName)
        }
    }
    return recurringVendorNames
}

console.log(getRecurringExpenses(mock))