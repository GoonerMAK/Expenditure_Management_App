import * as roleService from '../../src/services/role.service.js';
import * as roleRepository from '../../src/repositories/role.repository.js';

jest.mock('../../src/repositories/role.repository.js');


describe('Role Service', () => {
  
  afterEach(() => {
    jest.resetAllMocks();
  });



  describe('createRole', () => {
    it('should create a role successfully', async () => {
      const role_name = 'Admin';
      const mockRole = { id: '1', role_name };

      (roleRepository.createRole as jest.Mock).mockResolvedValue(mockRole);

      const result = await roleService.createRole(role_name);

      expect(result).toEqual(mockRole);
      expect(roleRepository.createRole).toHaveBeenCalledWith(role_name);
    });

    it('should throw an error if creation fails', async () => {
      (roleRepository.createRole as jest.Mock).mockRejectedValue('Database error');

      await expect(roleService.createRole('Admin'))
        .rejects
        .toThrow('Failed to create role: Database error');
    });
  });



  describe('updateRole', () => {
    it('should update a role successfully', async () => {
      const id = '1';
      const role_name = 'User';
      const mockRole = { id, role_name };

      (roleRepository.updateRole as jest.Mock).mockResolvedValue(mockRole);

      const result = await roleService.updateRole(id, role_name);

      expect(result).toEqual(mockRole);
      expect(roleRepository.updateRole).toHaveBeenCalledWith(id, role_name);
    });

    it('should throw an error if the role does not exist', async () => {
      const id = '1';

      (roleRepository.updateRole as jest.Mock).mockResolvedValue(null);

      await expect(roleService.updateRole(id, 'User'))
        .rejects
        .toThrow(`Role with id ${id} not found`);
    });

    it('should throw an error if update fails', async () => {
      const id = '1';

      (roleRepository.updateRole as jest.Mock).mockRejectedValue('Database error');

      await expect(roleService.updateRole(id, 'User'))
        .rejects
        .toThrow('Failed to update role: Database error');
    });
  });



  describe('deleteRole', () => {
    it('should delete a role successfully', async () => {
      const id = '1';
      const mockRole = { id, role_name: 'Admin' };

      (roleRepository.deleteRole as jest.Mock).mockResolvedValue(mockRole);

      const result = await roleService.deleteRole(id);

      expect(result).toEqual(mockRole);
      expect(roleRepository.deleteRole).toHaveBeenCalledWith(id);
    });

    it('should throw an error if the role does not exist', async () => {
      const id = '1';

      (roleRepository.deleteRole as jest.Mock).mockResolvedValue(null);

      await expect(roleService.deleteRole(id))
        .rejects
        .toThrow(`Role with id ${id} not found`);
    });

    it('should throw an error if deletion fails', async () => {
      const id = '1';

      (roleRepository.deleteRole as jest.Mock).mockRejectedValue('Database error');

      await expect(roleService.deleteRole(id))
        .rejects
        .toThrow('Failed to delete role: Database error');
    });
  });



  describe('getAllRoles', () => {
    it('should return all roles successfully', async () => {
      const mockRoles = [
        { id: '1', role_name: 'Admin' },
        { id: '2', role_name: 'User' }
      ];

      (roleRepository.getAllRoles as jest.Mock).mockResolvedValue(mockRoles);

      const result = await roleService.getAllRoles();

      expect(result).toEqual(mockRoles);
      expect(roleRepository.getAllRoles).toHaveBeenCalled();
    });

    it('should throw an error if fetching roles fails', async () => {
      (roleRepository.getAllRoles as jest.Mock).mockRejectedValue('Database error');

      await expect(roleService.getAllRoles())
        .rejects
        .toThrow('Failed to fetch roles: Database error');
    });
  });



  describe('getRoleById', () => {
    it('should return role by id successfully', async () => {
      const id = '1';
      const mockRole = { id, role_name: 'Admin' };

      (roleRepository.getRoleById as jest.Mock).mockResolvedValue(mockRole);

      const result = await roleService.getRoleById(id);

      expect(result).toEqual(mockRole);
      expect(roleRepository.getRoleById).toHaveBeenCalledWith(id);
    });

    it('should throw an error if the role does not exist', async () => {
      const id = '1';

      (roleRepository.getRoleById as jest.Mock).mockResolvedValue(null);

      await expect(roleService.getRoleById(id))
        .rejects
        .toThrow(`Role with id ${id} not found`);
    });

    it('should throw an error if fetching the role fails', async () => {
      const id = '1';

      (roleRepository.getRoleById as jest.Mock).mockRejectedValue('Database error');

      await expect(roleService.getRoleById(id))
        .rejects
        .toThrow('Failed to fetch role: Database error');
    });
  });



  describe('getUsersByRole', () => {
    it('should return users by role successfully', async () => {
      const mockRolesWithUsers = [
        { role_name: 'Admin', users: [{ username: 'john' }, { username: 'jane' }] },
        { role_name: 'User', users: [{ username: 'doe' }] }
      ];

      (roleRepository.getUsersByRole as jest.Mock).mockResolvedValue(mockRolesWithUsers);

      const result = await roleService.getUsersByRole();

      expect(result).toEqual([
        ['Admin', 'john', 'jane'],
        ['User', 'doe']
      ]);
      expect(roleRepository.getUsersByRole).toHaveBeenCalled();
    });

    it('should throw an error if getting users by role fails', async () => {
      (roleRepository.getUsersByRole as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(roleService.getUsersByRole())
        .rejects
        .toThrow('Failed to get users by role: Database error');
    });
  });



  describe('getUnassignedRolesByUserId', () => {
    it('should return unassigned roles by user id successfully', async () => {
      const user_id = '1';
      const mockUnassignedRoles = [
        { id: '2', role_name: 'User' },
        { id: '3', role_name: 'Guest' }
      ];

      (roleRepository.getUnassignedRolesByUserId as jest.Mock).mockResolvedValue(mockUnassignedRoles);

      const result = await roleService.getUnassignedRolesByUserId(user_id);

      expect(result).toEqual(mockUnassignedRoles);
      expect(roleRepository.getUnassignedRolesByUserId).toHaveBeenCalledWith(user_id);
    });

    it('should throw an error if fetching unassigned roles fails', async () => {
      const user_id = '1';

      (roleRepository.getUnassignedRolesByUserId as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(roleService.getUnassignedRolesByUserId(user_id))
        .rejects
        .toThrow('Failed to fetch unassigned roles: Database error');
    });
  });



  describe('getAssignedRolesByUserId', () => {
    it('should return assigned roles by user id successfully', async () => {
      const user_id = '1';
      const mockAssignedRoles = [
        { id: '2', role_name: 'User' }
      ];

      (roleRepository.getAssignedRolesByUserId as jest.Mock).mockResolvedValue(mockAssignedRoles);

      const result = await roleService.getAssignedRolesByUserId(user_id);

      expect(result).toEqual(mockAssignedRoles);
      expect(roleRepository.getAssignedRolesByUserId).toHaveBeenCalledWith(user_id);
    });

    it('should throw an error if getting assigned roles fails', async () => {
      const user_id = '1';

      (roleRepository.getAssignedRolesByUserId as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(roleService.getAssignedRolesByUserId(user_id))
        .rejects
        .toThrow(`Failed to get assigned roles for user with id ${user_id}: Database error`);
    });
  });


});
