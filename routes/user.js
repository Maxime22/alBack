const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user')

// POST /alBack/users/signup
router.post('/signup', userCtrl.createUser);

router.post('/signin', userCtrl.signinUser);

// PUT /alBack/users/editAnne/id
router.put('/editAnne/:id', auth, userCtrl.editUser);

module.exports = router;