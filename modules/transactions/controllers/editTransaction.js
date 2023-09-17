const mongoose = require('mongoose')
const validator = require('validator')

const editTransaction = async (req, res) => {
  const transactionsModel = mongoose.model('transactions')

  const { transaction_id,remarks,} = req.body
  if (!transaction_id) throw 'Transaction Id is required!'

  if (!validator.isMongoId(transaction_id.toString()))
    throw 'Please provide a valid Id!'

 

const getTransaction = await transactionsModel.findOne({
    _id: transaction_id,
})
if (!getTransaction) throw 'Transaction not found!'

if (getTransaction.transaction_type === 'income') {

  await transactionsModel.updateOne(
    {
      _id: transaction_id,
    },
    {
      remarks,
    },
    { runValidators: true }
  )
  res.status(200).json({
    status: 'success',
    message: 'edit successfully!',
  })
}
}

module.exports = editTransaction
