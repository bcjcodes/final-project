const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const bodyParser = require('body-parser')
const app = express()

//Initialized Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Call in the routes
const orders = require('./routes/api/orders')

//DB Config
const db = process.env.MONGO_URI

//Connect MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database Connected'))
  .catch(err => console.log(err))

//Use called routes
app.use('/api/orders', orders)

const port = process.env.PORT
//Listen to port
app.listen(port, () => console.log(`Server is listening at ${port}`))
