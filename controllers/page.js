const Page = require('../models/page');
var ObjectId = require('mongodb').ObjectID;
const fs = require('fs');

exports.getAllPages = (req, res, next) => {
    Page.find().then(
        (pages) => {
            res.status(200).json(pages);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.createPage = (req, res, next) => {
    let pageReq =
    {
        ...JSON.parse(req.body.page),
        mainImgUrl: `${req.protocol}://${req.get('host')}/images/pages/${req.file.filename}`
    };

    let page = new Page(pageReq);

    page.save()
        .then(() => res.status(201).json({ message: 'Page créée !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getOnePageWithId = (req, res, next) => {
    Page.findOne({ _id: ObjectId(req.body.id) }).then(
        (page) => {
            res.status(200).json(page);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.editOnePage = (req, res, next) => {
    let pageReq = req.file ?
        {
            ...JSON.parse(req.body.page),
            mainImgUrl: `${req.protocol}://${req.get('host')}/images/pages/${req.file.filename}`
        } : req.body;

    pageReq['_id'] = req.params.id;
    let page = new Page(pageReq);

    Page.findOne({ _id: req.params.id })
        .then(pageFound => {
            let filename = "";
            let path = "";
            if (pageFound.mainImgUrl) {
                filename = pageFound.mainImgUrl.split('/images/pages/')[1];
                path = `images/pages/${filename}`;
            }
            if (filename !== "" && req.file && fs.existsSync(path)) {
                fs.unlink(`images/pages/${filename}`, () => {
                    updateOneWithId(req.params.id, page, res);
                });
            } else {
                updateOneWithId(req.params.id, page, res);
            }
        })
        .catch(error => res.status(500).json({ error }));
};

updateOneWithId = (paramId, page, res) => {
    Page.updateOne({ _id: paramId }, page).then(
        () => {
            res.status(201).json({
                message: 'Page updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}