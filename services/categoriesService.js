const Category = require('../models/Category')

module.exports.getAllCategories = async () => {
  try {
    const category = await Category.find({})
    return category.map(Category.format)
  } catch (error) {
    return error
  }
}