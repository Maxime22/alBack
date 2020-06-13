const Photo = require('../models/photo');
var ObjectId = require('mongodb').ObjectID;
const fs = require('fs');

exports.editPhotoSection = (req, res, next) => {

    let request = req.body;
    console.log(request);
    
    // let photos = [];

    // photos.forEach(photo => {
        
    // });

    // Photo.update({ _id: paramId }, section).then(
    //     () => {
    //         res.status(201).json({
    //             message: 'Photo updated successfully!'
    //         });
    //     }
    // ).catch(
    //     (error) => {
    //         res.status(400).json({
    //             error: error
    //         });
    //     }
    // );
};