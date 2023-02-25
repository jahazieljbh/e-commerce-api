// Refactorización:
import multer from "multer";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const AVATAR_DIR = join(__dirname, "..", "public", "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, AVATAR_DIR), 
  filename: (req, file, cb) =>
    cb(null, `${req.user._id}${extname(file.originalname)}`), 
});

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/.(jpg|jpeg|png)$/))
    return cb(new Error("Please upload an image file"));

  cb(null, true);
};

const upload = multer({ storage, limits: { fileSize: 1000000 }, fileFilter }); 

export default upload;
