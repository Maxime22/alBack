const mongoose = require('mongoose');

const photoSchema = mongoose.Schema({
    photoImgUrl: { type: String, required: true },
    photoTitle: { type: String, required: true },
    typeOfPhoto: { type: String, required: true },
    sectionId: { type: String, required: true },
    orderInPhotos: { type: String, required: true }
});

module.exports = mongoose.model('Photo', photoSchema);