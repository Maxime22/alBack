const Section = require('../models/section');
const GroupSection = require('../models/groupSection');
var ObjectId = require('mongodb').ObjectID;
const fs = require('fs');

exports.createSection = (req, res, next) => {
    const sectionReq = req.body;
    let section = new Section(sectionReq); // sometimes {...sectionReq}, depends what is the req
    section.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.editOneSection = (req, res, next) => {
    // THE IMAGE IS ALREADY UPLOADED WHEN WE ARRIVE HERE

    // WHAT IS IN REQ IF I USE 2 MULTERS ?

    let sectionReq = req.file ?
        {
            ...JSON.parse(req.body.section),
            mainImgUrl: `${req.protocol}://${req.get('host')}/images/sections/${req.file.filename}`
        } : req.body;

    // updateOne needs the id in the section to update it
    sectionReq['_id'] = req.params.id;
    let section = new Section(sectionReq);

    Section.findOne({ _id: req.params.id })
        .then(sectionFound => {
            let filename = "";
            if (sectionFound.mainImgUrl) {
                filename = sectionFound.mainImgUrl.split('/images/sections/')[1];
            }
            // IF AN IMAGE EXISTS (filename) and we have a new image (req.file) WE DELETE the old one WITH UNLINK OTHERWISE WE JUST UPDATE
            if (filename !== "" && req.file) {
                fs.unlink(`images/sections/${filename}`, () => {
                    updateOneWithId(req.params.id, section, res);
                });
            } else {
                updateOneWithId(req.params.id, section, res);
            }
        })
        .catch(error => res.status(500).json({ error }));
};

updateOneWithId = (paramId, section, res) => {
    Section.updateOne({ _id: paramId }, section).then(
        () => {
            res.status(201).json({
                message: 'Section updated successfully!'
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

exports.findOneSection = (req, res, next) => {
    Section.findOne({
        _id: req.params.id
    }).then(
        (section) => {
            res.status(200).json(section);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.deleteOneSection = (req, res, next) => {
    const sectionId = req.params.id;
    // WE DELETE THE ID IN ALL ARRAY SECTIONSIDS OF THE GROUPSECTIONS (like a cascade in php)
    // https://dev.to/kwabenberko/implementing-sql--like-cascades-in-mongoose-bap
    GroupSection.find({ sectionsIds: { $in: [sectionId] } }).then(groupSections => {
        Promise.all(
            groupSections.map(groupSection =>
                GroupSection.findOneAndUpdate(
                    { _id: groupSection._id },
                    { $pull: { sectionsIds: sectionId } },
                    { new: true }
                )
            )
        );
    });

    Section.findOne({ _id: sectionId })
        .then(section => {
            const filename = section.mainImgUrl.split('/images/sections/')[1];
            fs.unlink(`images/${filename}`, () => {
                Section.deleteOne({ _id: sectionId })
                    .then(() => res.status(200).json({ message: 'Section supprimée !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));

};

exports.getAllSections = (req, res, next) => {
    Section.find().then(
        (sections) => {
            res.status(200).json(sections);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getSeveralSections = (req, res, next) => {
    let arrayOfIds = req.body['sectionsIds'];
    for (let index = 0; index < arrayOfIds.length; index++) {
        arrayOfIds[index] = ObjectId(arrayOfIds[index]);
    }
    Section.find({
        _id: {
            $in: arrayOfIds
        }
    }).then(
        (sections) => {
            res.status(200).json(sections);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getOneSectionWithTitle = (req, res, next) => {
    let sectionReq = req.body;
    Section.findOne({ title: String(req.body.title) }).then(
        (section) => {
            res.status(200).json(section);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};