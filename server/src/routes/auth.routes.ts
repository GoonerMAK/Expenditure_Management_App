import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';

export const authRouter = Router();

authRouter.post('/signup', authController.signUp);
authRouter.post('/login', authController.logIn);

