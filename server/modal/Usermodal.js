const mongoose = require('mongoose')

const modal = mongoose.Schema({
    fullname:String,
    email: { type: String, unique: true },
    password : String,
    retypepassword : String,
})

const UserSchema = mongoose.model('loginusers', modal)
module.exports = UserSchema