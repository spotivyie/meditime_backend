import express from 'express';
import multer from 'multer';
import { register, login, logout, updateProfile } from '../controllers/authController.js';
import { authenticate } from '../middlewares/authMiddleware.js'; 

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post('/register', upload.single('photo'), register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticate, (req, res) => {
  res.json(req.user); 
});
router.put('/update-profile',authenticate,upload.single('photo'),updateProfile);

export default router;
