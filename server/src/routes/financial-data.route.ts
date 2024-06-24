import { Router } from 'express';
import * as financialDataController from '../controllers/financial-data.controller.js';

const router = Router();

router.post('/financialData', financialDataController.createFinancialData);
router.put('/financialData/:id', financialDataController.updateFinancialData);
router.delete('/financialData/:id', financialDataController.deleteFinancialData);
router.get('/financialData', financialDataController.getAllFinancialData);
router.get('/financialData/:id', financialDataController.getFinancialDataById);

export default router;
