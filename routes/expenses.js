const expenseRouter = require('express').Router()
const { recurringExpenses } = require('../services/userService')

expenseRouter.get('/', async (req, res) => res.status(200).json(recurringExpenses))

module.exports = expenseRouter