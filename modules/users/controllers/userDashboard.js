const mongoose = require('mongoose')

const userDashboard = async (req, res) => {
  const usersModel = mongoose.model('users')
  const transactionsModel = mongoose.model('transactions')

  const getTrancation = await transactionsModel
    .find({
      user_id: req.user._id,
    })
    .sort('-createdAt')
    .limit(5)

  const getUser = await usersModel
    .findOne({
      _id: req.user._id,
    })
    .select('-password')

  res.status(200).json({
    status: 'Success',
    data: getUser,
    getTrancation,
  })
}

module.exports = userDashboard
