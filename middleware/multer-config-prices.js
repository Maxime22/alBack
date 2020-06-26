const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images/prices');
    },
    filename: (req, file, callback) => {
        // SPLIT AND JOIN ARE ALREADY DONE IN THE FRONT
        const name = file.originalname;
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage : storage }).array('prices'); // maybe needs another parameter (number of files accepted)