import { Router } from 'express';
import * as financialDataController from '../controllers/financial-data.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js'; 
import { validateRequest } from '../middlewares/validator.middleware.js';
import { financialDataSchema } from '../validators/financial-data.validator.js';

export const financialDataRouter = Router();

financialDataRouter.post('/financialData', isAuthenticated, validateRequest(financialDataSchema), financialDataController.createFinancialData);
financialDataRouter.put('/financialData/:id', isAuthenticated, validateRequest(financialDataSchema), financialDataController.updateFinancialData);
financialDataRouter.delete('/financialData/:id', isAuthenticated, financialDataController.deleteFinancialData);
financialDataRouter.get('/financialData', financialDataController.getAllFinancialData);
financialDataRouter.get('/financialData/:id', financialDataController.getFinancialDataById);

