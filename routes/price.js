const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multerPrices = require('../middleware/multer-config-prices');

const priceCtrl = require('../controllers/price')

// PUT /alBack/prices/:id edit photos (and create) of one section
router.put('/:id', auth, multerPrices, priceCtrl.editPrice);

router.get('/:id', priceCtrl.getPrice);

router.post('/deletePrices', auth, priceCtrl.deletePrices);

module.exports = router;