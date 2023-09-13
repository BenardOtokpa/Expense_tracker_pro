const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
  name: {
    type: String,
    requird: [true, 'Name is required!'],
  },
  email: {
    type: String,
    required: [true, 'Email is required!'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
  },
  balance: {
    type: Number,
    required: [true, 'Balance is required!'],
    default: 0,
  },
})

const usersModel = mongoose.model('users', usersSchema)

module.exports = usersModel