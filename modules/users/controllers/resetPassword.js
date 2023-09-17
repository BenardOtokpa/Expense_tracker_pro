/* eslint-disable no-throw-literal */
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const emailManager = require('../../../managers/emailManger')
  
const resetPassword = async (req, res) => {
  const usersModel = mongoose.model('users')

  const { email, reset_code, new_password } = req.body

  if (!email) throw 'Email is required!'
  if (!reset_code) throw ' Reset code is Required!'
  if (!new_password) throw 'Please provide New password'
  if (new_password.length < 5)
    throw 'New password must be at least 5 characters long!'

  const getUserAndResetCode = await usersModel.findOne({
    email: email,
    reset_code: reset_code,
  })
  if (!getUserAndResetCode) throw 'Reset code does not match!'

  const hashedPassword = await bcrypt.hash(new_password, 12)

await usersModel.updateOne({
    email:email
},{
    password: hashedPassword,
    reset_code: ""
},{
    runValidators:true
})

await emailManager (
  email,
  'Your password has been changed successfully!. if you did not do that, please contact us!',
  '<h1>Your password has been changed successfully!.</h1> <br> <br> <h5>if you did not do that, please contact us!.</h5>',
  'Password reset successfully!'
)

  res.status(200).json({
    status:"Success!",
    message: 'Password reset successful!',
  })
}

module.exports = resetPassword
