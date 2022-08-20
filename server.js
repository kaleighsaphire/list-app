// Declare Variables
const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()
const Note = require('./models/note')
const PORT = 3000

//Set Middlewares
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.DB_CONNECTION, 
    { useNewUrlParser: true },
    () => {console.log(`Connected to database`)}
) 

app.get('/', async (req, res) => {
    try {
       Note.find({}, (err, notess) => {
            res.render('index.ejs', { Notes: notes })
        })
    } catch (err) {
        if (err) return res.status(500).send(err)
    }
})

// Connect to server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
