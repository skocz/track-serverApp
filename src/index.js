const port = process.env.MONGO_URI
require('./models/User')
require('./models/Track')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')
const requireAuth = require('./middlewares/requireAuth')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)

mongoose.connect(process.env.DB_URL)

mongoose.connection.on('connected', () => {
  console.log('connected to mongoose')
})

mongoose.connection.on('error', (err) => {
  console.error('connected mongoose error: error', err)
})

app.get('/', requireAuth, (req, res) => {
  res.send(`your email is: ${req.user.email}`)
})

app.listen(3000, () => {
  console.log('listen on port 3000')
})
