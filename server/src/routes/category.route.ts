import { Router } from 'express';
import * as categoryController from '../controllers/category.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js'; 

const router = Router();

router.post('/categories', isAuthenticated, categoryController.createCategory);
router.put('/categories/:id', isAuthenticated, categoryController.updateCategory);
router.delete('/categories/:id', isAuthenticated, categoryController.deleteCategory);
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById);

export default router;
