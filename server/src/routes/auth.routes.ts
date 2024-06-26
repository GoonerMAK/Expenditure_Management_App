import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';

const router = Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.logIn);

export default router;
