import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

export const authRouter = Router();

authRouter.post('/signup', authController.signUp);
authRouter.post('/login', authController.logIn);
authRouter.post('/logout', authController.logOut);
authRouter.get('/user', isAuthenticated, authController.getAuthenticatedUser);