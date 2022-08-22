// Rendering edit page
// Handles editing and deleting notes


const express = require('express')
const router = express.Router()
const editController = require('../controllers/edit')

router.get('/:id', editController.getEdit)
router.get('/remove/:id', editController.deleteNote)
router.post('/:id', editController.updateNote)

module.exports = router