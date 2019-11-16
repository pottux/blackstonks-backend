const expenseRouter = require('express').Router()
const { getRecurringExpensesArray } = require('../services/userService')

expenseRouter.get('/', async (req, res) => res.status(200).json(getRecurringExpensesArray()))

module.exports = expenseRouter