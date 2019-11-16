const mongoose = require('mongoose')

const categoriesSchema = new mongoose.Schema({
    name: String,
    service: String,
})

categoriesSchema.statics.format = (category) => {
    return {
        name: category.name,
        service: category.service
    }
}

const Category = mongoose.model('categories', categoriesSchema)

module.exports = Category;
