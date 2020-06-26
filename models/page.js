const mongoose = require('mongoose');

const pageSchema = mongoose.Schema({
    mainImgUrl: { type: String, required: false },
    typeOfTemplate: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    content2: { type: String, required: false }
});

module.exports = mongoose.model('Page', pageSchema);