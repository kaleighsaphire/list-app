const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectDB = require('./config/db')
require('dotenv').config({path: './config/.env'})
// const Note = require('./models/note')
const homeRoutes = require('./routes/home')
const editRoutes = require('./routes/edit')
const PORT = 3000

connectDB()

// Set Middlewares
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// Set Routes
app.use('/', homeRoutes)
app.use('/edit', editRoutes)

// Connect to server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
