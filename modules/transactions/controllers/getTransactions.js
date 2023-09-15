const mongoose = require('mongoose')

const getTransactions = async(req, res) => {

    const tranactionsModel = mongoose.model('transactions')

    const transactions = await tranactionsModel.find({
        user_id:req.user._id,
        ...req.query,
    })



    res.status(200).json({
        status: "Success!",
        message: "Transactions fetched successfully!",
        data: transactions
    })
}

module.exports = getTransactions