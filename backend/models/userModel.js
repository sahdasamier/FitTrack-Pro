const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,//attention S in string uppercase
    required: true
  }
})

module.exports = mongoose.model('User', userSchema)
