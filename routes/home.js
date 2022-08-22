// Handles homepage GET request
// Handles POST request for adding a new note

const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')

router.get('/', homeController.getIndex)
router.post('/', homeController.createNote)
 

module.exports = router