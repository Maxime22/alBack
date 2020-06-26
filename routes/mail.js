const express = require('express');
const router = express.Router();

const mailCtrl = require('../controllers/mail')

// POST /alBack/mail/contact
router.post('/contact', mailCtrl.sendMail);

module.exports = router;