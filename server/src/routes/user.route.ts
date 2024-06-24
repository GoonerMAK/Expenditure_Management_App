import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';

const router = Router();

router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);

export default router;
