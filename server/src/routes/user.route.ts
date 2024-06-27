import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js'; 

export const userRouter = Router();

userRouter.post('/users', isAuthenticated, userController.createUser);
userRouter.put('/users/:id', isAuthenticated, userController.updateUser);
userRouter.delete('/users/:id', isAuthenticated, userController.deleteUser);
userRouter.get('/users', userController.getAllUsers);
userRouter.get('/users/:id', userController.getUserById);

