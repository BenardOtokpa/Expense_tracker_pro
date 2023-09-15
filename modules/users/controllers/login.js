/* eslint-disable no-throw-literal */
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwtManager = require('../../../managers/jwtManager')

const login = async (req, res) => {
  const usersModel = mongoose.model('users')

  const { email, password } = req.body

  const getUser = await usersModel.findOne({
    email: email,
  })
  if (!getUser) throw 'This email does not exist in the system!'

  const comparePassword = await bcrypt.compare(password, getUser.password)

  console.log(getUser.password)
  if (!comparePassword) throw 'Email and Password do not match!'

  const accessToken = jwtManager(getUser)

  //succees response..
  res.status(200).json({
    status: 'Sucess!',
    message: 'Login Successfull!',
    accessToken: accessToken,
  })
}

module.exports = login
