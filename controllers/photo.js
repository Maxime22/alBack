const Photo = require('../models/photo');
var ObjectId = require('mongodb').ObjectID;
const fs = require('fs');

exports.editPhotoSection = (req, res, next) => {

    // FORM DATAS NEED MULTER BECAUSE BODY PARSER DOESN'T HANDLE IT

    if (req.files){
        console.log(req.files)
    }

    let request = req.body;
    // let parseReq = JSON.parse(request);
    console.log("req body ", request);

    res.status(201).json({
        message: "coucou",
    });

    //METTRE EN DB

    // RECUPERER LES IDS DANS LA RES ?





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