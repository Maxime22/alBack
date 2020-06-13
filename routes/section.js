const express = require('express');
const router = express.Router();

// AUTH NEEDS TO BE BEFORE MULTER IN MIDDLEWARE ORDER
// const auth = require('../middleware/auth');

const multerSectionAdmin = require('../middleware/multer-config-section-mainImg');

const sectionCtrl = require('../controllers/section')

// POST /alBack/sections save a new section
// AUTH NEEDS TO BE BEFORE MULTER IN MIDDLEWARE ORDER
router.post('/', sectionCtrl.createSection);

// get (with a post) SEVERAL SECTIONS
router.post('/severalSections', sectionCtrl.getSeveralSections);

// get (with a post) ONE SECTION
router.post('/getOneSectionWithTitle', sectionCtrl.getOneSectionWithTitle);

// GET /alBack/sections/:id find one section
router.get('/:id', sectionCtrl.findOneSection);

// PUT /alBack/sections/:id edit one section
router.put('/:id', multerSectionAdmin, sectionCtrl.editOneSection);

// DELETE /alBack/sections/:id delete one section
router.delete('/:id', sectionCtrl.deleteOneSection);

// GET /alBack/sections get all sections
router.get('/' + '', sectionCtrl.getAllSections);

module.exports = router;