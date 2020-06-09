const Section = require('../models/section');

exports.createSection = (req, res, next) => {
    const sectionReq = req.body;
    // delete sectionReq._id;
    let section = new Section(sectionReq); // sometimes {...sectionReq}, depends what is the req
    section.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

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

exports.editOneSection = (req, res, next) => {
    let sectionReq = req.body;
    // updateOne needs the id in the section to update it
    sectionReq['_id']=req.params.id;
    let section = new Section(sectionReq);
    Section.updateOne({ _id: req.params.id }, section).then(
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
};

exports.deleteOneSection = (req, res, next) => {
    Section.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({
                message: 'Section deleted!'
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