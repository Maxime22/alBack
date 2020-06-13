const express = require('express');
const router = express.Router();

// AUTH NEEDS TO BE BEFORE MULTER IN MIDDLEWARE ORDER
// const auth = require('../middleware/auth');

const multerPhotos = require('../middleware/multer-config-section-photos');

const photoCtrl = require('../controllers/photo')

// PUT /alBack/photos/sections/:id edit photos of one section
router.put('/sections/:id', multerPhotos, photoCtrl.editPhotoSection);

module.exports = router;