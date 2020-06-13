const mongoose = require('mongoose');

const photoSchema = mongoose.Schema({
    altAtt: { type: String, required: false },
    imgUrl: { type: String, required: true },
    sectionId: {type: String, required: true}
});

module.exports = mongoose.model('Photo', photoSchema);