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
        // WE NEED TO KEEP THE PHOTOIMGURL IF THERE IS NO NEW FILENAME
        if (realFilename !== "") {
            photoValue['photoImgUrl'] = `${req.protocol}://${req.get('host')}/images/sections/photos/${realFilename}`
        }
    });

    // WE DON'T WANT TO SEND THE FILENAME IN THE DB
    photosValues.forEach(photoValue => {
        delete photoValue.filename;
    });

    // WE WANT TO CREATE THE PHOTOS OR UPDATE THEM AND MAYYYBEEEEEE RECEIVE THE IDS IN THE RESPONSE
    let photosCreatedAndUpdatedArray = [];
    let errorsApi = [];
    photosValues.forEach(photoValue => {
        if (photoValue._id) {
            Photo.findOne({
                _id: photoValue._id
            }).then(
                (photo) => {
                    if (photo['photoImgUrl'] !== photoValue['photoImgUrl']) {
                        const filename = photo['photoImgUrl'].split('/images/sections/photos/')[1];
                        fs.unlink(`images/sections/photos/${filename}`, () => {
                            Photo.updateOne({ _id: photoValue._id }, photoValue).then(
                                (data) => {
                                    photosCreatedAndUpdatedArray.push(data)
                                }
                            ).catch(
                                (error) => {
                                    errorsApi.push(error)
                                }
                            );
                        });
                    } else {
                        Photo.updateOne({ _id: photoValue._id }, photoValue).then(
                            (data) => {
                                photosCreatedAndUpdatedArray.push(data)
                            }
                        ).catch(
                            (error) => {
                                errorsApi.push(error)
                            }
                        );
                    }
                }
            ).catch(
                (error) => {
                }
            );

        } else {
            let photo = new Photo(photoValue);
            photo.save()
                .then((data) => {
                    console.log("data ", data)
                    photosCreatedAndUpdatedArray.push(data)
                })
                .catch(error => {
                    console.log("error photooos ", error)
                    errorsApi.push(error)
                });
        }
    });

    console.log("errorsApi ", errorsApi)
    if (errorsApi.length > 0) {
        res.status(400).json({ errorsApi: errorsApi });
    } else {
        res.status(201).json({
            photosCreatedAndUpdatedArray: photosCreatedAndUpdatedArray,
            message: "Photos created and/or updated!"
        });
    }
};

exports.getPhotoFromSection = (req, res, next) => {
    const sectionId = req.params.id;
    Photo.find({ sectionId: { $in: [sectionId] } }).then(photos => {
        res.status(201).json({
            photos: photos,
        });
    });
}

exports.deletePhotosFromSection = (req, res, next) => {
    const photosToDelete = req.body;

    for (let index = 0; index < photosToDelete.length; index++) {
        photosToDelete[index] = ObjectId(photosToDelete[index]);
    }

    photosToDelete.forEach(photoId => {
        Photo.deleteOne({ _id: photoId })
                    .then(() => {})
                    .catch(error => res.status(400).json({ error }));
    });

    res.status(201).json({ message: 'Photos supprimées !' });

}