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

const upload = multer({ storage: storage });

const handleFileUpload = upload.single('pdfFile');
// export default handleFileUpload;