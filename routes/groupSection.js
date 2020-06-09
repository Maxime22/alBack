const express = require('express');
const router = express.Router();

const groupSectionCtrl = require('../controllers/groupSection')

// POST /alBack/groupSections save a new groupSection
router.post('/', groupSectionCtrl.createGroupSection);

// GET /alBack/groupSections get all groupSections
router.get('/' + '', groupSectionCtrl.getAllGroupSections);

// PUT /alBack/sections/:id edit one groupSection
router.put('/:id', groupSectionCtrl.editOneGroupSection);

// DELETE /alBack/groupSections/:id delete one section
router.delete('/:id', groupSectionCtrl.deleteOneGroupSection);

module.exports = router;