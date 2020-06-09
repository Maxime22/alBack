const mongoose = require('mongoose');

const groupSectionSchema = mongoose.Schema({
    title: { type: String, required: true }
});

module.exports = mongoose.model('GroupSection', groupSectionSchema);