const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const multerPage = require('../middleware/multer-config-page-mainImg');
const pageCtrl = require('../controllers/page')

// POST /alBack/pages save a new page
router.post('/', auth, multerPage, pageCtrl.createPage);

// get (with a post) ONE PAGE
router.post('/getOnePageWithId', pageCtrl.getOnePageWithId);

// get (with a post) ONE PAGE
router.post('/getOnePageWithTitle', pageCtrl.getOnePageWithTitle);

// edit one page
router.put('/:id', auth, multerPage, pageCtrl.editOnePage);

// GET /alBack/pages get all pages
router.get('/' + '', pageCtrl.getAllPages);

module.exports = router;