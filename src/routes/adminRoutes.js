import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../utils/roles.js'
import { listUsers, createUser, updateUser, deleteUser } from '../controllers/adminController.js';

const router = express.Router();

router.use(authenticate, isAdmin);

router.get('/users', listUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
