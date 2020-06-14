const Photo = require('../models/photo');
var ObjectId = require('mongodb').ObjectID;
const fs = require('fs');

exports.editPhotoSection = (req, res, next) => {

    // FORM DATAS NEED MULTER BECAUSE BODY PARSER DOESN'T HANDLE IT

    let photosValues = JSON.parse(req.body.photosValues);
    photosValues.forEach(photoValue => {
        let realFilename = "";
        for (let index = 0; index < req.files.length; index++) {
            const element = req.files[index];
            if (element.originalname === photoValue.filename) {
                realFilename = element.filename
                break;
            }
        }
        photoValue['photoImgUrl'] = `${req.protocol}://${req.get('host')}/images/sections/photos/${realFilename}`
    });

    console.log("photosValues ", photosValues)

    // WE DON'T WANT TO SEND THE FILENAME IN THE DB
    photosValues.forEach(photoValue => {
        delete photoValue.filename;
    });

    // WE WANT TO CREATE THE PHOTOS OR UPDATE THEM AND MAYYYBEEEEEE RECEIVE THE IDS IN THE RESPONSE
    let photosCreatedAndUpdatedArray = [];
    let errorsApi = [];
    photosValues.forEach(photoValue => {
        if (photoValue._id) {
            Photo.updateOne({ _id: photoValue._id }, photoValue).then(
                (data) => {
                    photosCreatedAndUpdatedArray.push(data)
                }
            ).catch(
                (error) => {
                    errorsApi.push(error)
                }
            );
        } else {
            // TODO
            // A MON AVIS CA PLANTE CAR CA VA DANS LE ERROR A CAUSE DU MODEL QUI N'EST PAS BON, PUISQUE LE FIRST SAVE NE FONCTIONNE PAS
            let photo = new Photo(photoValue);
            photo.save()
                .then((data) => {
                    photosCreatedAndUpdatedArray.push(data)
                })
                .catch(error => {
                    errorsApi.push(error)
                });
        }

    });

    if (errorsApi.length > 0) {
        res.status(400).json({ errorsApi:errorsApi });
    } else {
        res.status(201).json({
            photosCreatedAndUpdatedArray: photosCreatedAndUpdatedArray,
            message: "Photos created and/or updated!"
        });
    }
};