const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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


  await usersModel.create({
    name: name,
    email: email,
    password: hashedPassword,
    balance: balance,
  })

  res.status(201).json({
    staus: 'Success!',
    massage: 'Useer regsitered successfully!',
  })
}

module.exports = register
