/* eslint-disable no-throw-literal */
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwtManager = require('../../../managers/jwtManager')
// const nodemailer = require('nodemailer')
const emailManager = require('../../../managers/emailManger')

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

  // var transport = nodemailer.createTransport({
  //   host: 'sandbox.smtp.mailtrap.io',
  //   port: 2525,
  //   auth: {
  //     user: 'e700b59a131edb',
  //     pass: '74e03746be33a1',
  //   },
  // })

  // await transport.sendMail({
  //   to: createdUser.email,
  //   from: 'info@expensetracker.com',
  //   text: 'welcome to Expense Tracker PRO. we hope you enjoy computing your expenses.',
  //   html: '<h1>welcome to Expense Tracker PRO.<h1> <br> <br> we hope you enjoy computing your expenses.',
  //   subject: 'Welcome to Expense Tracker PRO!',
  // })

  await emailManager(
    createdUser.email,
    'welcome to Expense Tracker PRO. we hope you enjoy computing your expenses.',
    '<h1>welcome to Expense Tracker PRO.<h1> <br> <br> we hope you enjoy computing your expenses.',
    'Welcome to Expense Tracker PRO!'
  )

  res.status(201).json({
    staus: 'Success!',
    massage: 'User regsitered successfully!',
    accessToken: accessToken,
  })
}

module.exports = register
