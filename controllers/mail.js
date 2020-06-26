var nodemailer = require('nodemailer');
const configMail = require('./configMail.js');

exports.sendMail = (req, res, next) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'portfolio.annel@gmail.com',
            pass: String(configMail.password)
        }
    });
    var mailOptions = {
        from: req.body.email,
        to: 'pro.alods@gmail.com',
        subject: req.body.subject + ' from ' + req.body.name,
        text: req.body.message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(400).json({
                error: error
            });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({
                message: 'Email envoyé !'
            });
        }
    });
};