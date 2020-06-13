const mongoose = require('mongoose');
const GroupSection = require('../models/groupSection');
mongoose.set('useFindAndModify', false);

const sectionSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    isVisibleInMenu: {type: Boolean, required: true},
    orderInHeaderMenu: {type: String, required: false},
    mainImgUrl: {type: String, required: false},
});

module.exports = mongoose.model('Section', sectionSchema);

// const sectionSchema = mongoose.Schema({
//     title: { type: String, required: true },
//     content: { type: String, required: true },
//     visible: { type: Boolean},
//     linkedToGSection: { type: Number},
//     imageNames: { type: Array},
// });