const mongoose = require('mongoose');

const sectionSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
});

module.exports = mongoose.model('Section', sectionSchema);

// const sectionSchema = mongoose.Schema({
//     title: { type: String, required: true },
//     content: { type: String, required: true },
//     visible: { type: Boolean},
//     linkedToGSection: { type: Number},
//     imageNames: { type: Array},
// });