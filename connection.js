const mongoose = require('mongoose')

const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD

const dbUrl = process.env.DB_URL
const db = process.env.DB_NAMEn
console.log()

if (!username || !password) {
    throw new Error('DB username and/or password missing! Please give the username and the password as environment variables')
}

const url = `mongodb+srv://${username}:${password}@cluster0-gtbny.mongodb.net/test?retryWrites=true&w=majority`

exports.connect = () => {
    mongoose.connect(url, (error) => {
        if (error) {
            throw error
        }
        console.log('Connected to the database successfully!')
    })
}

