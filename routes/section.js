const express = require('express');
const router = express.Router();

const Section = require('../models/section');

// AUTH NEEDS TO BE BEFORE MULTER IN MIDDLEWARE ORDER
// const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');

const sectionCtrl = require('../controllers/section')

// POST /alBack/sections save a new section
// AUTH NEEDS TO BE BEFORE MULTER IN MIDDLEWARE ORDER
router.post('/', multer, sectionCtrl.createSection);

// GET /alBack/sections/:id find one section
router.get('/:id', sectionCtrl.findOneSection);

// PUT /alBack/sections/:id edit one section
router.put('/:id', sectionCtrl.editOneSection);

// DELETE /alBack/sections/:id delete one section
router.delete('/:id', sectionCtrl.deleteOneSection);

// GET /alBack/sections get all sections
router.get('/' + '', sectionCtrl.getAllSections);

module.exports = router;