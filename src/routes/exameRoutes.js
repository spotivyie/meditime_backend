import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  createExame,
  getExamesByPaciente,
  updateStatus,
  uploadResultado,
  getExameById
} from '../controllers/exameController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/resultados/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}_${file.fieldname}${ext}`);
  },
});

const upload = multer({ storage });

router.post('/exames', authenticate, createExame);  
router.get('/exames/:pacienteId', authenticate, getExamesByPaciente);
router.patch('/exames/:id/status', authenticate, updateStatus);
router.post('/exames/:id/upload', authenticate, upload.single('resultado'), uploadResultado);
router.get('/exames/detail/:id', authenticate, getExameById);

export default router;
