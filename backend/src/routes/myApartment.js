const express = require('express')
const router = express.Router()

const myApartmentController = require('../controllers/myApartmentController')

router.post('/create', myApartmentController.upload.array("tempImages"), myApartmentController.create)
router.get('/categories', myApartmentController.categories)
router.get('/:id/edit', myApartmentController.edit)
router.delete('/delete/:id', myApartmentController.destroy)
router.get('/', myApartmentController.show)

module.exports = router