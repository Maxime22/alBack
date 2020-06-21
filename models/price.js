const mongoose = require('mongoose');

const priceSchema = mongoose.Schema({
    priceImgUrl: { type: String, required: true },
    priceTitle: { type: String, required: true },
    content: { type: String, required: true },
    priceNumber: { type: String, required: true },
    orderInPrices: { type: String, required: true }
});

module.exports = mongoose.model('Price', priceSchema);