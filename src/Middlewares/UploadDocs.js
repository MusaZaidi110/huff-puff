const multer = require('multer');
const { paths, allowedTypes, limits } = require('../Utils/Configs/UploadConfig');
const { Logger } = require('../Utils/Logger');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, paths.temp);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// File filter
const fileFilter = (allowedMimeTypes) => (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    Logger.warn(`Rejected file type: ${file.mimetype}`);
    cb(new Error('Invalid file type'), false);
  }
};

// Middleware instances
module.exports = {
  singleImage: multer({
    storage,
    fileFilter: fileFilter(allowedTypes.images),
    limits: { fileSize: limits.image }
  }).single('image'),

  singleFile: multer({
    storage,
    fileFilter: fileFilter(allowedTypes.documents),
    limits: { fileSize: limits.document }
  }).single('file'),

  multipleImages: multer({
    storage,
    fileFilter: fileFilter(allowedTypes.images),
    limits: { fileSize: limits.image, files: 10 }
  }).array('images', 10),

  multipleFiles: multer({
    storage,
    fileFilter: fileFilter([...allowedTypes.images, ...allowedTypes.documents]),
    limits: { fileSize: limits.document, files: 10 }
  }).array('files', 10)
};