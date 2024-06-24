import { Router } from 'express';
import * as permissionController from '../controllers/permission.controller.js';

const router = Router();

router.post('/permissions', permissionController.createPermission);
router.put('/permissions/:id', permissionController.updatePermission);
router.delete('/permissions/:id', permissionController.deletePermission);
router.get('/permissions', permissionController.getAllPermissions);
router.get('/permissions/:id', permissionController.getPermissionById);

export default router;
