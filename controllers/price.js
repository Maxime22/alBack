const Price = require('../models/price');
var ObjectId = require('mongodb').ObjectID;
const fs = require('fs');

exports.editPrice = (req, res, next) => {

    let pricesValues = JSON.parse(req.body.pricesValues);
    pricesValues.forEach(priceValue => {
        let realFilename = "";
        for (let index = 0; index < req.files.length; index++) {
            const element = req.files[index];
            if (element.originalname === priceValue.filename) {
                realFilename = element.filename
                break;
            }
        }
        // WE NEED TO KEEP THE PHOTOIMGURL IF THERE IS NO NEW FILENAME
        if (realFilename !== "") {
            priceValue['priceImgUrl'] = `${req.protocol}://${req.get('host')}/images/prices/${realFilename}`
        }
    });

    // WE DON'T WANT TO SEND THE FILENAME IN THE DB
    pricesValues.forEach(priceValue => {
        delete priceValue.filename;
    });

    // WE WANT TO CREATE THE PHOTOS OR UPDATE THEM AND MAYYYBEEEEEE RECEIVE THE IDS IN THE RESPONSE
    let pricesCreatedAndUpdatedArray = [];
    let errorsApi = [];
    pricesValues.forEach(priceValue => {
        if (priceValue._id) {
            Price.findOne({
                _id: priceValue._id
            }).then(
                (price) => {
                    if (price['priceImgUrl'] !== priceValue['priceImgUrl']) {
                        const filename = price['priceImgUrl'].split('/images/prices/')[1];
                        fs.unlink(`images/prices/${filename}`, () => {
                            Price.updateOne({ _id: priceValue._id }, priceValue).then(
                                (data) => {
                                    pricesCreatedAndUpdatedArray.push(data)
                                }
                            ).catch(
                                (error) => {
                                    errorsApi.push(error)
                                }
                            );
                        });
                    } else {
                        Price.updateOne({ _id: priceValue._id }, priceValue).then(
                            (data) => {
                                pricesCreatedAndUpdatedArray.push(data)
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
            let price = new Price(priceValue);
            price.save()
                .then((data) => {
                    pricesCreatedAndUpdatedArray.push(data)
                })
                .catch(error => {
                    console.log("error prices ", error)
                    errorsApi.push(error)
                });
        }
    });

    if (errorsApi.length > 0) {
        res.status(400).json({ errorsApi: errorsApi });
    } else {
        res.status(201).json({
            pricesCreatedAndUpdatedArray: pricesCreatedAndUpdatedArray,
            message: "Prices created and/or updated!"
        });
    }
};

exports.getPrice = (req, res, next) => {
    Price.find().then(
        (prices) => {
            res.status(200).json(prices);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

exports.deletePrices = (req, res, next) => {
    const pricesToDelete = req.body;

    for (let index = 0; index < pricesToDelete.length; index++) {
        pricesToDelete[index] = ObjectId(pricesToDelete[index]);
    }

    pricesToDelete.forEach(priceId => {
        Price.deleteOne({ _id: priceId })
                    .then(() => {})
                    .catch(error => res.status(400).json({ error }));
    });

    res.status(201).json({ message: 'Prices supprimés !' });

}