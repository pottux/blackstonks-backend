const mongoose = require('mongoose')

const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD

const dbUrl = process.env.DB_URL
const db = process.env.DB_NAME

if (!username || !password) {
    throw new Error('DB username and/or password missing! Please give the username and the password as environment variables')
}

const url = `mongodb://${username}:${password}@${dbUrl}/${db}?authSource=${db}&w=1`

exports.connect = () => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('connected to database')
    }).catch(err => {
        console.log(err)
    })
}
