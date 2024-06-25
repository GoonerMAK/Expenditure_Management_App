import { Router } from 'express';
import * as roleController from '../controllers/role.controller.js';

const router = Router();

router.post('/roles', roleController.createRole);
router.put('/roles/:id', roleController.updateRole);
router.delete('/roles/:id', roleController.deleteRole);
router.get('/roles', roleController.getAllRoles);
router.get('/roles/:id', roleController.getRoleById);

export default router;
