const express = require('express')
const api = require('./routes/index')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const multer = require('multer');

require('dotenv').config()
mongoose.connect(`mongodb://${process.env.DBUSER}:${process.env.DBPASS}@ds247449.mlab.com:47449/ecommyosa`)

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connect to database !!')
});

const app = express()

app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:false }))

app.use('/', api)

app.listen(3000, () => {
  console.log('App listening on port 3000')
})