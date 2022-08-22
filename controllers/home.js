const Note = require('../models/note')

module.exports = {
    getIndex: async (req, res) => {
        try {
            const notes = await
            Note.find()
                res.render('index.ejs', 
                { Notes: notes })
        } catch (err) {
            console.log(err)
        }
    },
    createNote: async (req, res) => {
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
    }
}
