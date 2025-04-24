import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs'; // Import the fs module
import { isAdmin, isAuth } from '../utils.js';

const uploadRouter = express.Router();

// Use /var/data/uploads for Render (production) and ./uploads for local development
const isProduction = process.env.NODE_ENV === 'production';
const uploadDir = isProduction ? '/var/data/uploads' : 'uploads';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir); // Use the appropriate directory based on environment
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Ensure the upload directory exists
try {
  if (!fs.existsSync(uploadDir)) {
    console.log(`Creating upload directory at ${uploadDir}`);
    fs.mkdirSync(uploadDir, { recursive: true });
  }
} catch (error) {
  console.error('Failed to create upload directory:', error);
}

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Images only! (JPG, JPEG, PNG, GIF allowed)'));
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Upload multiple images endpoint
uploadRouter.post(
  '/',
  isAuth,
  isAdmin,
  upload.array('files', 10),
  (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ message: 'No files uploaded.' });
    }

    // Map through uploaded files and return their paths
    const fileUrls = req.files.map((file) => `/uploads/${file.filename}`);

    res.send({ urls: fileUrls });
  }
);

uploadRouter.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).send({ message: 'File upload error: ' + err.message });
  } else if (err) {
    res.status(400).send({ message: err.message });
  } else {
    next();
  }
});

export default uploadRouter;
