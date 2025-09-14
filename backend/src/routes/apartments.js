const express = require('express')
const router = express.Router()
const apartmentController = require('../controllers/aparmentController')

router.get('/', apartmentController.getAllApartments)

module.exports = router