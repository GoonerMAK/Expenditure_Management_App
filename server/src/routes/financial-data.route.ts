import { Router } from 'express';
import * as financialDataController from '../controllers/financial-data.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js'; 

export const financialDataRouter = Router();

financialDataRouter.post('/financialData', isAuthenticated, financialDataController.createFinancialData);
financialDataRouter.put('/financialData/:id', isAuthenticated, financialDataController.updateFinancialData);
financialDataRouter.delete('/financialData/:id', isAuthenticated, financialDataController.deleteFinancialData);
financialDataRouter.get('/financialData', financialDataController.getAllFinancialData);
financialDataRouter.get('/financialData/:id', financialDataController.getFinancialDataById);

