import * as permissionService from '../../src/services/permission.service.js';
import * as permissionRepository from '../../src/repositories/permission.repository.js';

jest.mock('../../src/repositories/permission.repository.js');


describe('Permission Service', () => {

  afterEach(() => {
    jest.resetAllMocks();
  });



  describe('createPermission', () => {
    it('should create a permission successfully', async () => {
      const permission_name = 'create_project';
      const mockPermission = { id: '1', permission_name };

      (permissionRepository.createPermission as jest.Mock).mockResolvedValue(mockPermission);

      const result = await permissionService.createPermission(permission_name);

      expect(result).toEqual(mockPermission);
      expect(permissionRepository.createPermission).toHaveBeenCalledWith(permission_name);
    });

    it('should throw an error if creation fails', async () => {
      (permissionRepository.createPermission as jest.Mock).mockRejectedValue('Database error');

      await expect(permissionService.createPermission('create_project'))
        .rejects
        .toThrow('Failed to create permission: Database error');
    });
  });



  describe('updatePermission', () => {
    it('should update a permission successfully', async () => {
      const id = '1';
      const permission_name = 'delete_project';
      const mockPermission = { id, permission_name };

      (permissionRepository.updatePermission as jest.Mock).mockResolvedValue(mockPermission);

      const result = await permissionService.updatePermission(id, permission_name);

      expect(result).toEqual(mockPermission);
      expect(permissionRepository.updatePermission).toHaveBeenCalledWith(id, permission_name);
    });

    it('should pass undefined name through when none is given', async () => {
      const id = '1';
      const mockPermission = { id, permission_name: 'create_project' };

      (permissionRepository.updatePermission as jest.Mock).mockResolvedValue(mockPermission);

      const result = await permissionService.updatePermission(id);

      expect(result).toEqual(mockPermission);
      expect(permissionRepository.updatePermission).toHaveBeenCalledWith(id, undefined);
    });

    it('should throw an error if the permission does not exist', async () => {
      const id = '1';

      (permissionRepository.updatePermission as jest.Mock).mockResolvedValue(null);

      await expect(permissionService.updatePermission(id, 'delete_project'))
        .rejects
        .toThrow(`Failed to update permission: Error: Permission with id ${id} not found`);
    });

    it('should throw an error if update fails', async () => {
      (permissionRepository.updatePermission as jest.Mock).mockRejectedValue('Database error');

      await expect(permissionService.updatePermission('1', 'delete_project'))
        .rejects
        .toThrow('Failed to update permission: Database error');
    });
  });



  describe('deletePermission', () => {
    it('should delete a permission successfully', async () => {
      const id = '1';
      const mockPermission = { id, permission_name: 'create_project' };

      (permissionRepository.deletePermission as jest.Mock).mockResolvedValue(mockPermission);

      const result = await permissionService.deletePermission(id);

      expect(result).toEqual(mockPermission);
      expect(permissionRepository.deletePermission).toHaveBeenCalledWith(id);
    });

    it('should throw an error if the permission does not exist', async () => {
      const id = '1';

      (permissionRepository.deletePermission as jest.Mock).mockResolvedValue(null);

      await expect(permissionService.deletePermission(id))
        .rejects
        .toThrow(`Failed to delete permission: Error: Permission with id ${id} not found`);
    });

    it('should throw an error if deletion fails', async () => {
      (permissionRepository.deletePermission as jest.Mock).mockRejectedValue('Database error');

      await expect(permissionService.deletePermission('1'))
        .rejects
        .toThrow('Failed to delete permission: Database error');
    });
  });



  describe('getAllPermissions', () => {
    it('should return all permissions successfully', async () => {
      const mockPermissions = [
        { id: '1', permission_name: 'create_project' },
        { id: '2', permission_name: 'delete_project' }
      ];

      (permissionRepository.getAllPermissions as jest.Mock).mockResolvedValue(mockPermissions);

      const result = await permissionService.getAllPermissions();

      expect(result).toEqual(mockPermissions);
      expect(permissionRepository.getAllPermissions).toHaveBeenCalled();
    });

    it('should return an empty list when no permissions exist', async () => {
      (permissionRepository.getAllPermissions as jest.Mock).mockResolvedValue([]);

      const result = await permissionService.getAllPermissions();

      expect(result).toEqual([]);
    });

    it('should throw an error if fetching permissions fails', async () => {
      (permissionRepository.getAllPermissions as jest.Mock).mockRejectedValue('Database error');

      await expect(permissionService.getAllPermissions())
        .rejects
        .toThrow('Failed to fetch permissions: Database error');
    });
  });



  describe('getPermissionById', () => {
    it('should return permission by id successfully', async () => {
      const id = '1';
      const mockPermission = { id, permission_name: 'create_project' };

      (permissionRepository.getPermissionById as jest.Mock).mockResolvedValue(mockPermission);

      const result = await permissionService.getPermissionById(id);

      expect(result).toEqual(mockPermission);
      expect(permissionRepository.getPermissionById).toHaveBeenCalledWith(id);
    });

    it('should throw an error if the permission does not exist', async () => {
      const id = '1';

      (permissionRepository.getPermissionById as jest.Mock).mockResolvedValue(null);

      await expect(permissionService.getPermissionById(id))
        .rejects
        .toThrow(`Failed to fetch permission: Error: Permission with id ${id} not found`);
    });

    it('should throw an error if fetching the permission fails', async () => {
      (permissionRepository.getPermissionById as jest.Mock).mockRejectedValue('Database error');

      await expect(permissionService.getPermissionById('1'))
        .rejects
        .toThrow('Failed to fetch permission: Database error');
    });
  });


});
