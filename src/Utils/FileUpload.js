const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const upload = multer({
  dest: 'temp/',
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
    files: 10 // Max 10 files
  },
  fileFilter: (req, file, cb) => {
    // Allow only image files
    if (!file.mimetype.match(/^image\/(jpeg|png|gif|webp|svg\+xml)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

const getBaseUrl = (req) => {
  return `${req.protocol}://${req.get('host')}`;
};

/**
 * Uploads images to the server and returns their URLs
 * @param {Object} req - Express request object
 * @param {string} subfolder - Subfolder within uploads directory (e.g., 'categories')
 * @returns {Promise<Array<string>>} Array of image URLs
 */
const uploadImages = async (req, subfolder = '') => {
  if (!req.files || req.files.length === 0) {
    throw new Error('No files were uploaded');
  }

  const uploadDir = path.join(__dirname, '../Media_Assets', subfolder);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const BASE_URL = getBaseUrl(req);
  const uploadedUrls = [];

  try {
    for (const file of req.files) {
      const ext = path.extname(file.originalname).toLowerCase();
      const filename = `${uuidv4()}${ext}`;
      const filePath = path.join(uploadDir, filename);

      // Move file from temp to permanent location
      fs.renameSync(file.path, filePath);

      // Construct URL (relative to public folder)
      const relativePath = path.join('uploads', subfolder, filename).replace(/\\/g, '/');
      const url = `${BASE_URL}/${relativePath}`;
      
      uploadedUrls.push(url);
    }

    return uploadedUrls;
  } catch (error) {
    // Cleanup any files that might have been uploaded
    uploadedUrls.forEach(url => {
      const filePath = path.join(__dirname, '../Media_Assets', new URL(url).pathname);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
    throw error;
  }
};

/**
 * Deletes an image file from the server
 * @param {string} imageUrl - The URL of the image to delete
 */
const deleteImage = (imageUrl) => {
  try {
    if (!imageUrl) return;
    
    const urlObj = new URL(imageUrl);
    const filePath = path.join(__dirname, '../Media_Assets', urlObj.pathname);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};

module.exports = {
  upload,
  uploadImages,
  deleteImage
};



// const express = require('express');
// const router = express.Router();
// const { upload, uploadImages } = require('../utils/imageUpload');
// const Category = require('../models/Category');

// // Create category with image
// router.post('/categories', upload.array('images', 1), async (req, res) => {
//   try {
//     const imageUrls = await uploadImages(req, 'categories');
    
//     const category = await Category.create({
//       name: req.body.name,
//       description: req.body.description,
//       image_url: imageUrls[0], // Store first image URL
//       is_active: true,
//       display_order: req.body.display_order || 0
//     });

//     res.status(201).json(category);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Update category image
// router.put('/categories/:id/image', upload.array('images', 1), async (req, res) => {
//   try {
//     // Get existing category
//     const category = await Category.findByPk(req.params.id);
//     if (!category) {
//       return res.status(404).json({ error: 'Category not found' });
//     }

//     // Delete old image if exists
//     if (category.image_url) {
//       deleteImage(category.image_url);
//     }

//     // Upload new image
//     const imageUrls = await uploadImages(req, 'categories');
//     category.image_url = imageUrls[0];
//     await category.save();

//     res.json(category);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });