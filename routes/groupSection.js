const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const groupSectionCtrl = require('../controllers/groupSection')

// POST /alBack/groupSections save a new groupSection
router.post('/', auth, groupSectionCtrl.createGroupSection);

// GET /alBack/groupSections get all groupSections
router.get('/' + '', groupSectionCtrl.getAllGroupSections);

// get (with a post) ONE GROUPSECTION
router.post('/getOneGroupSectionWithTitle', groupSectionCtrl.getOneGroupSectionWithTitle);

// PUT /alBack/groupSections/:id edit one groupSection
router.put('/:id', auth, groupSectionCtrl.editOneGroupSection);

// DELETE /alBack/groupSections/:id delete one section
router.delete('/:id', auth, groupSectionCtrl.deleteOneGroupSection);

module.exports = router;