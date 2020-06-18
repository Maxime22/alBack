const User = require('../models/user');

exports.createUser = (req, res, next) => {
    const userReq = req.body;
    let user = new User(userReq);

    // WE NEED TO CRYPT BEFORE SAVING

    user.save()
        .then(() => res.status(201).json({ message: 'User enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.signinUser = (req, res, next) => {
    const userReq = req.body;
    let user = new User(userReq);

    // CHECK IF IT IS FINE IN THE DB

    // User.findOne({
    //     _id: req.params.id
    // }).then(
    //     (section) => {
    //         res.status(200).json(section);
    //     }
    // ).catch(
    //     (error) => {
    //         res.status(404).json({
    //             error: error
    //         });
    //     }
    // );
};

