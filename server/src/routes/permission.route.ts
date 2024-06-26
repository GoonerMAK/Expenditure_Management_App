import { Router } from 'express';
import * as permissionController from '../controllers/permission.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js'; 

const router = Router();

router.post('/permissions', isAuthenticated, permissionController.createPermission);
router.put('/permissions/:id', isAuthenticated, permissionController.updatePermission);
router.delete('/permissions/:id', isAuthenticated, permissionController.deletePermission);
router.get('/permissions', permissionController.getAllPermissions);
router.get('/permissions/:id', permissionController.getPermissionById);

export default router;
