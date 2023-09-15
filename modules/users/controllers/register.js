/* eslint-disable no-throw-literal */
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwtManager = require('../../../managers/jwtManager')


const register = async (req, res) => {
  const usersModel = mongoose.model('users')

  const { name, email, password, confirm_password, balance } = req.body

  //vallidations..
  if (!name) throw 'Name is required!'
  if (!email) throw 'Email is required!'
  if (!password) throw 'Password is required!'
  if (password.length < 5) throw 'Password must be at least 5 characters long.'
  if (password !== confirm_password)
    throw 'Password and Confirm password does not match!'

  const getDuplicateEmail = await usersModel.findOne({
    email: email,
  })
  if (getDuplicateEmail) throw 'This email already exist!'

const hashedPassword = await bcrypt.hash(password, 12)


  const createdUser = await usersModel.create({
    name: name,
    email: email,
    password: hashedPassword,
    balance: balance,
  })

  const accessToken = jwtManager(createdUser)

  res.status(201).json({
    staus: 'Success!',
    massage: 'User regsitered successfully!',
    accessToken: accessToken
  })
}

module.exports = register
