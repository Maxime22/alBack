const GroupSection = require('../models/groupSection');

exports.getAllGroupSections = (req, res, next) => {
    GroupSection.find().then(
        (groupSections) => {
            res.status(200).json(groupSections);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.createGroupSection = (req, res, next) => {
    const groupSectionReq = req.body;
    let groupSection = new GroupSection(groupSectionReq);
    groupSection.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteOneGroupSection = (req, res, next) => {
    GroupSection.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({
                message: 'Group Section deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.editOneGroupSection = (req, res, next) => {
    let groupSectionReq = req.body;
    groupSectionReq['_id']=req.params.id;
    let groupSection = new GroupSection(groupSectionReq);
    GroupSection.updateOne({ _id: req.params.id }, groupSection).then(
        () => {
            res.status(201).json({
                message: 'Group Section updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getOneGroupSectionWithTitle = (req, res, next) => {
    let sectionReq = req.body;
    GroupSection.findOne({ title: req.body.title }).then(
        (groupSection) => {
            res.status(200).json(groupSection);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};