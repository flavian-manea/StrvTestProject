const mongoose = require('mongoose')

// simple schema representing an user with 'emai' and 'password'
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('User', userSchema)