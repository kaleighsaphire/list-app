const Note = require('../models/note')

module.exports = {
    getEdit: (req, res) => {
        const id = req.params.id
        Note.find({}, (err, notes) => {
            res.render('edit.ejs', {
            Notes: notes, noteId: id
            })
        })
    },
    deleteNote: (req, res) => {
        const id = req.params.id
        Note.findByIdAndRemove(id, err => {
            if (err) return res.status(500).send(err)
            res.redirect('/')
        })
    },
    updateNote: (req, res) => {
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
    }
}