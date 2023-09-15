/* eslint-disable no-throw-literal */
const mongoose = require('mongoose')
const validator = require('validator')

const addIncome = async (req, res) => {
  const usersModel = mongoose.model('users')
  const tranactionsModel = mongoose.model('transactions')

  const { amount, remarks } = req.body

  if (!amount) throw 'amount is required!'
  if (!remarks) throw 'Remarks is required!'
  if (remarks.lenth < 5) throw 'Remarks should be at least 5 characters long!'

  if (!validator.isNumeric(amount.toString()))
    throw 'amount Must be a valid Number!'
  if (amount < 0) throw 'Amount must not be Negative!'

  await tranactionsModel.create({
    user_id: req.user._id,
    amount: amount,
    remarks: remarks,
    transaction_type: 'income',
  })

  await usersModel.updateOne(
    {
      _id: req.user._id,
    },
    {
      $inc: {
        balance: amount,
      },
    },
    {
      runValidators: true,
    }
  )

  res.status(200).json({
    status: 'Success!',
    message: 'Income added successfuly!',
  })
}

module.exports = addIncome
