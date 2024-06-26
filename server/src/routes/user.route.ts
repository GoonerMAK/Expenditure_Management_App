import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js'; 

const router = Router();

router.post('/users', isAuthenticated, userController.createUser);
router.put('/users/:id', isAuthenticated, userController.updateUser);
router.delete('/users/:id', isAuthenticated, userController.deleteUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);

export default router;
