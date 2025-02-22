const mongoose = require('mongoose');

const groupSectionSchema = mongoose.Schema({
    title: { type: String, required: true },
    sectionsIds: { type: Array, required: false },
    isVisibleInMenu: { type: Boolean, required: true },
    content: { type: String, required: false }
});

module.exports = mongoose.model('GroupSection', groupSectionSchema);