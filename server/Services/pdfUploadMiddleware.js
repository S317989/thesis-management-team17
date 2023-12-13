const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        const newFileName = `${timestamp}_${file.originalname}`;
        cb(null, newFileName);
    },
});

const upload = multer({ storage: storage, limits: { fileSize: 8000000 } }, fileFilter = (req, file, cb) => {
    if (file.size > 8000000) {
        return cb(new Error('Il file supera la dimensione massima consentita.'));
    }

    if (!file.mimetype.startsWith('application/pdf')) {
        return cb(new Error('File must be PDF.'));
    }

    cb(null, true);

});

const handleFileUpload = upload.single('pdfFile');
module.exports = handleFileUpload;