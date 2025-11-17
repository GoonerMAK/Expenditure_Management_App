import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js'; 
import { validateRequest, validateParams } from '../middlewares/validator.middleware.js';
import { createUserSchema, updateUserSchema, userParamsSchema } from '../validators/user.validator.js';

export const userRouter = Router();

userRouter.post('/users', isAuthenticated, validateRequest(createUserSchema), userController.createUser);
userRouter.put('/users/:id', isAuthenticated, validateParams(userParamsSchema), validateRequest(updateUserSchema), userController.updateUser);
userRouter.delete('/users/:id', isAuthenticated, validateParams(userParamsSchema), userController.deleteUser);
userRouter.get('/users/usernames', isAuthenticated, userController.getAllUsernames);
userRouter.get('/users', isAuthenticated, userController.getAllUsers);
userRouter.get('/users/:id', isAuthenticated, validateParams(userParamsSchema), userController.getUserById);

