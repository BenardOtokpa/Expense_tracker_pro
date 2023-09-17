/* eslint-disable no-throw-literal */
const mongoose = require('mongoose')
// const nodemailer = require('nodemailer')
const emailManager = require('../../../managers/emailManger')


const forgotPassword = async (req, res) => {
  const usersModel = mongoose.model('users')

  const { email } = req.body

  if (!email) throw 'Email is required!'

  const getUser = await usersModel.findOne({
    email: email,
  })

  if (!getUser) throw 'This email does not exist in the system!'

  const resetCode = Math.floor(10000 + Math.random() * 90000)

  await usersModel.updateOne(
    {
      email: email,
    },
    {
      reset_code: resetCode,
    },
    {
      runValidators: true,
    }
  )

//   var transport = nodemailer.createTransport({
//     host: 'sandbox.smtp.mailtrap.io',
//     port: 2525,
//     auth: {
//       user: 'e700b59a131edb',
//       pass: '74e03746be33a1',
//     },
//   })

//   await transport.sendMail({
//     to: email,
//     from: 'info@expensetracker.com',
//     text: 'Your reset Password Code is '+ resetCode,
//     html:'Your reset Password Code is '+ resetCode,
//     subject: 'Password reset - expense tracker pro',
//   })


  await emailManager(email, 'Your reset Password Code is '+ resetCode, 'Your reset Password Code is '+ resetCode, 'Password reset - expense tracker pro')

  res.status(200).json({
    status: 'Reset code has being sent to your email address!',
  })
}

module.exports = forgotPassword
