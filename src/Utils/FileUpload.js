const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const MediaAsset = require('../Models/MediaAssets/MediaAsset.Model');

const upload = multer({
  dest: 'temp/',
  limits: {
    fileSize: 50 * 1024 * 1024,
    files: 10
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/^image\/(jpeg|png|gif|webp)$|^video\/(mp4|quicktime|x-msvideo)$/)) {
      return cb(new Error('Only image and video files are allowed!'), false);
    }
    cb(null, true);
  }
});

const getBaseUrl = (req) => {
  const protocol = req.protocol;
  const host = req.get('host');
  return `${protocol}://${host}`;
};

const uploadImages = async (req, subfolder = '', uploaded_by = null, context = null, is_temporary = false) => {
  try {
    if (!req.files || req.files.length === 0) {
      throw new Error('No media files uploaded');
    }

    const uploadDir = path.join(__dirname, '../uploads', subfolder);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const BASE_URL = getBaseUrl(req);

    const mediaAssets = await Promise.all(
      req.files.map(async file => {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
        const filePath = path.join(uploadDir, filename);

        fs.renameSync(file.path, filePath);

        const relativePath = path.join('uploads', subfolder, filename);
        const url = `${BASE_URL}/${relativePath.replace(/\\/g, '/')}`;

        await MediaAsset.create({
          id: uuidv4(),
          url,
          type: file.mimetype,
          filename,
          size: file.size,
          uploaded_by,
          context,
          is_temporary
        });
      })
    );

    return true;
  } catch (error) {
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
    throw error;
  }
};

const cleanUpUnusedMedia = async (thresholdDate) => {
  const oldAssets = await MediaAsset.findAll({
    where: {
      is_temporary: true,
      created_at: {
        [require('sequelize').Op.lt]: thresholdDate,
      },
    },
  });

  for (const asset of oldAssets) {
    const localPath = path.join(__dirname, '..', asset.url.replace(/^.*\/uploads\//, 'uploads/'));
    if (fs.existsSync(localPath)) {
      fs.unlinkSync(localPath);
    }
    await asset.destroy();
  }

  return oldAssets.length;
};

MediaAsset.addHook('afterDestroy', async (asset, options) => {
  const localPath = path.join(__dirname, '..', asset.url.replace(/^.*\/uploads\//, 'uploads/'));
  if (fs.existsSync(localPath)) {
    fs.unlinkSync(localPath);
  }
});

module.exports = {
  upload,
  uploadImages,
  cleanUpUnusedMedia
};
