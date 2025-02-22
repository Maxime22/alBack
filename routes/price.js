const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multerPrices = require('../middleware/multer-config-prices');

const priceCtrl = require('../controllers/price')

// PUT /alBack/prices/
router.put('/', auth, multerPrices, priceCtrl.editPrice);

router.get('/', priceCtrl.getPrice);

router.post('/deletePrices', auth, priceCtrl.deletePrices);

module.exports = router;