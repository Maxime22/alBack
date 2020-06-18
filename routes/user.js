const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user')

// POST /alBack/users/signup
router.post('/signup', userCtrl.createUser);

router.post('/signin', userCtrl.signinUser);

module.exports = router;