import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js'; 
import { validateRequest } from '../middlewares/validator.middleware.js';
import { createUserSchema, updateUserSchema } from '../validators/user.validator.js';

export const userRouter = Router();

userRouter.post('/users', isAuthenticated, validateRequest(createUserSchema), userController.createUser);
userRouter.put('/users/:id', isAuthenticated, validateRequest(updateUserSchema), userController.updateUser);
userRouter.delete('/users/:id', isAuthenticated, userController.deleteUser);
userRouter.get('/users/usernames', isAuthenticated, userController.getAllUsernames);
userRouter.get('/users', userController.getAllUsers);
userRouter.get('/users/:id', userController.getUserById);

