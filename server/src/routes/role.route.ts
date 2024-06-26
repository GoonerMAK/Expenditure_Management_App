import { Router } from 'express';
import * as roleController from '../controllers/role.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js'; 

const router = Router();

router.post('/roles', isAuthenticated, roleController.createRole);
router.put('/roles/:id', isAuthenticated, roleController.updateRole);
router.delete('/roles/:id', isAuthenticated, roleController.deleteRole);
router.get('/roles', roleController.getAllRoles);
router.get('/roles/:id', roleController.getRoleById);

export default router;
