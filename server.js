const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectDB = require('./config/db')
require('dotenv').config({path: './config/.env'})
const Note = require('./models/note')
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

app.get('/', async (req, res) => {
    try {
       Note.find({}, (err, notes) => {
            res.render('index.ejs', { Notes: notes })
        })
    } catch (err) {
        console.log(err)
    }
})

app.post('/', async (req, res) => {
    const note = new Note(
        {
            title: req.body.title,
            content: req.body.content,
        }
    )
    try {
        await note.save()
        console.log(note)
        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
})

// Edit or Update Method
app
    .route('/edit/:id')
    .get((req, res) => {
        const id = req.params.id
        Note.find({}, (err, notes) => {
            res.render('edit.ejs', {
                Notes: notes, noteId: id
            })
        })
    })
    .post((req, res) => {
        const id = req.params.id
        Note.findByIdAndUpdate(
            id,
            {
                title: req.body.title,
                content: req.body.content
            },

            err => {
                if (err) return res.status(500).send(err);
                res.redirect("/");
            });
    });

// Delete Note
app
    .route('/remove/:id')
    .get((req, res) => {
        const id = req.params.id
        Note.findByIdAndRemove(id, err => {
            if (err) return res.status(500).send(err);
            res.redirect('/')
        })
    })


// Connect to server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
