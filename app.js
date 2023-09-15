require('express-async-errors')
const mongoose = require('mongoose')
const express = require('express')
const errorHandler = require('./handler/errorHandler')
const userRoutes = require('./modules/users/users.routes')
const transactionRoutes = require('./modules/transactions/transactions.routes')

const app = express()

require('dotenv').config()

mongoose
  .connect(process.env.mongo_connection, {})
  .then(() => {
    console.log('MongoDB connected Successfully!')
  })
  .catch(() => {
    console.log('MongDB connection Failed!')
  })

//Model initialization
require('./models/users.model');
require('./models/tranactions.model')

app.use(express.json())

//Routes..
app.use('/api/users', userRoutes)
app.use('/api/transactions', transactionRoutes)

// End of all routes...
app.use(errorHandler)

app.listen(8000, () => {
  console.log('Server started Successfully!')
})
