const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 1. Configure the secure local /uploads directory
const uploadDir = path.join(__dirname, '../../uploads');

// Ensure the directory exists automatically
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 2. Define Storage Engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); 
    },
    filename: (req, file, cb) => {
        // Create a unique filename to prevent overwriting: timestamp-randomString.extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// 3. Define File Filter (PDFs, JPGs, PNGs only)
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|pdf/;
    // Check extension
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime type
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDFs, JPGs, and PNGs are allowed.'));
    }
};

// 4. Initialize Multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB strict limit to protect your server
    },
    fileFilter: fileFilter
});

module.exports = upload;