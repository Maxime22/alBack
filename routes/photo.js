const express = require('express');
const router = express.Router();

// AUTH NEEDS TO BE BEFORE MULTER IN MIDDLEWARE ORDER
// const auth = require('../middleware/auth');

const multerPhotos = require('../middleware/multer-config-section-photos');

const photoCtrl = require('../controllers/photo')

// PUT /alBack/photos/sections/:id edit photos (and create) of one section
router.put('/sections/:id', multerPhotos, photoCtrl.editPhotoSection);

// GET /alBack/photos/sections/:id get photos from a section
router.get('/sections/:id', photoCtrl.getPhotoFromSection);

// GET /alBack/photos/deletePhotos/:id get photos from a section
router.post('/deletePhotos', photoCtrl.deletePhotosFromSection);

module.exports = router;