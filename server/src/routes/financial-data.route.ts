import { Router } from 'express';
import * as financialDataController from '../controllers/financial-data.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js'; 

const router = Router();

router.post('/financialData', isAuthenticated, financialDataController.createFinancialData);
router.put('/financialData/:id', isAuthenticated, financialDataController.updateFinancialData);
router.delete('/financialData/:id', isAuthenticated, financialDataController.deleteFinancialData);
router.get('/financialData', financialDataController.getAllFinancialData);
router.get('/financialData/:id', financialDataController.getFinancialDataById);

export default router;
