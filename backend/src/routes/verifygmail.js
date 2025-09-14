const express = require('express')
const router = express.Router()

const verifygmailController = require('../controllers/verifygmailController')

router.post('/send-otp', verifygmailController.sendOtp)
router.post('/verify-otp', verifygmailController.verifyOtp)

module.exports = router