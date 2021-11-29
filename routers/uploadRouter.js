import multer from 'multer';
import express from 'express';
import { isAuth } from '../utils.js';

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage});

const fileFilter =(req, file, cb)=>{
  const allowedFileTypes=['images/jpeg','images/jpg','images/png'];
  if (allowedFileTypes.inclides(file.mimetype)){
    cb(null, true);
  }else{
    cb(null,false);
  }
}
uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default uploadRouter;
