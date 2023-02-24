import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join('public', 'avatar'));
  },
  filename(req, file, cb) {
    cb(null, `${req.user._id}.jpg`);
  }
});

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error('Please upload an image file'));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1000000 // 1MB
  },
  fileFilter
});

export default upload;