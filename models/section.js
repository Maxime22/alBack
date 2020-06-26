const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const sectionSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    isVisibleInMenu: {type: Boolean, required: true},
    orderInHeaderMenu: {type: String, required: false},
    templatePhotos: {type: String, required: false},
    mainImgUrl: {type: String, required: false},
});

module.exports = mongoose.model('Section', sectionSchema);