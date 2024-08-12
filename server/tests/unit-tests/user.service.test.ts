import * as userService from '../../src/services/user.service.js';
import * as userRepository from '../../src/repositories/user.repository.js';
import bcrypt from 'bcrypt';

jest.mock('../../src/repositories/user.repository.js');
jest.mock('bcrypt');


describe('userService', () => {

   beforeEach(() => {
    jest.clearAllMocks();
  });



  describe('createUser', () => {
    it('should throw an error if the username already exists', async () => {
      (userRepository.getUserByUsername as jest.Mock).mockResolvedValue({ username: 'existingUser' });
      (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(null);

      await expect(userService.createUser('existingUser', 'password', 'test@example.com', 'Test User', 'roleId', 'roleName'))
        .rejects
        .toThrow('Username already exists');
    });

    it('should throw an error if the email already exists', async () => {
      (userRepository.getUserByUsername as jest.Mock).mockResolvedValue(null);
      (userRepository.getUserByEmail as jest.Mock).mockResolvedValue({ email: 'existing@example.com' });

      await expect(userService.createUser('newUser', 'password', 'existing@example.com', 'Test User', 'roleId', 'roleName'))
        .rejects
        .toThrow('Email already exists');
    });

    it('should create a new user successfully', async () => {
      (userRepository.getUserByUsername as jest.Mock).mockResolvedValue(null);
      (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (userRepository.createUser as jest.Mock).mockResolvedValue({ id: '123', username: 'newUser', email: 'new@example.com' });

      const result = await userService.createUser('newUser', 'password', 'new@example.com', 'Test User', 'roleId', 'roleName');
      expect(result).toEqual({ id: '123', username: 'newUser', email: 'new@example.com' });
    });

    it('should handle errors thrown during createUser', async () => {
      (userRepository.getUserByUsername as jest.Mock).mockRejectedValue('Database error');

      await expect(userService.createUser('newUser', 'password', 'new@example.com', 'Test User', 'roleId', 'roleName'))
        .rejects
        .toThrow('Failed to create user: Database error');
    });
  });



  describe('updateUser', () => {
    it('should throw an error if the user to update does not exist', async () => {
      (userRepository.updateUser as jest.Mock).mockResolvedValue(null);

      await expect(userService.updateUser('nonexistentId', 'newUser', 'newPassword', 'new@example.com', 'New Name', 'newRoleId', 'newRoleName'))
        .rejects
        .toThrow('User with id nonexistentId not found');
    });

    it('should update the user successfully', async () => {
      (userRepository.updateUser as jest.Mock).mockResolvedValue({ id: '123', username: 'updatedUser', email: 'updated@example.com' });
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

      const result = await userService.updateUser('123', 'updatedUser', 'newPassword', 'updated@example.com', 'Updated Name', 'newRoleId', 'newRoleName');
      expect(result).toEqual({ id: '123', username: 'updatedUser', email: 'updated@example.com' });
    });

    it('should handle errors thrown during updateUser', async () => {
      (userRepository.updateUser as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(userService.updateUser('123', 'newUser', 'newPassword', 'new@example.com', 'New Name', 'newRoleId', 'newRoleName'))
        .rejects
        .toThrow('Failed to update user: Database error');
    });
  });



  describe('deleteUser', () => {
    it('should throw an error if the user to delete does not exist', async () => {
      (userRepository.deleteUser as jest.Mock).mockResolvedValue(null);

      await expect(userService.deleteUser('nonexistentId'))
        .rejects
        .toThrow('User with id nonexistentId not found');
    });

    it('should delete the user successfully', async () => {
      (userRepository.deleteUser as jest.Mock).mockResolvedValue({ id: '123', username: 'deletedUser' });

      const result = await userService.deleteUser('123');
      expect(result).toEqual({ id: '123', username: 'deletedUser' });
    });

    it('should handle errors thrown during deleteUser', async () => {
      (userRepository.deleteUser as jest.Mock).mockRejectedValue('Database error');

      await expect(userService.deleteUser('123'))
        .rejects
        .toThrow('Failed to delete user: Database error');
    });
  });



  describe('getAllUsers', () => {
    it('should return a list of users', async () => {
      (userRepository.getAllUsers as jest.Mock).mockResolvedValue([
        { id: '123', username: 'user1' },
        { id: '456', username: 'user2' }
      ]);

      const result = await userService.getAllUsers();
      expect(result).toEqual([
        { id: '123', username: 'user1' },
        { id: '456', username: 'user2' }
      ]);
    });

    it('should handle errors thrown during getAllUsers', async () => {
      (userRepository.getAllUsers as jest.Mock).mockRejectedValue('Database error');

      await expect(userService.getAllUsers())
        .rejects
        .toThrow('Failed to fetch users: Database error');
    });
  });



  describe('getUserById', () => {
    it('should throw an error if the user cannot be found', async () => {
      (userRepository.getUserById as jest.Mock).mockResolvedValue(null);

      await expect(userService.getUserById('nonexistentId'))
        .rejects
        .toThrow('User with id nonexistentId not found');
    });

    it('should return the user if found', async () => {
      (userRepository.getUserById as jest.Mock).mockResolvedValue({ id: '123', username: 'foundUser' });

      const result = await userService.getUserById('123');
      expect(result).toEqual({ id: '123', username: 'foundUser' });
    });

    it('should handle errors thrown during getUserById', async () => {
      (userRepository.getUserById as jest.Mock).mockRejectedValue('Database error');

      await expect(userService.getUserById('123'))
        .rejects
        .toThrow('Failed to fetch user: Database error');
    });
  });



  describe('getAllUsernames', () => {
    it('should return a list of usernames', async () => {
      (userRepository.getAllUsernames as jest.Mock).mockResolvedValue([
        { id: '123', username: 'user1' },
        { id: '456', username: 'user2' }
      ]);

      const result = await userService.getAllUsernames();
      expect(result).toEqual([
        { id: '123', username: 'user1' },
        { id: '456', username: 'user2' }
      ]);
    });

    it('should handle errors thrown during getAllUsernames', async () => {
      (userRepository.getAllUsernames as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(userService.getAllUsernames())
        .rejects
        .toThrow('Failed to fetch usernames: Database error');
    });
  });



  describe('getUsersWithoutRoles', () => {
    it('should return a list of users without roles', async () => {
      (userRepository.getUsersWithoutRoles as jest.Mock).mockResolvedValue([
        { id: '123', username: 'user1' },
        { id: '456', username: 'user2' }
      ]);

      const result = await userService.getUsersWithoutRoles();
      expect(result).toEqual([
        { id: '123', username: 'user1' },
        { id: '456', username: 'user2' }
      ]);
    });

    it('should handle errors thrown during getUsersWithoutRoles', async () => {
      (userRepository.getUsersWithoutRoles as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(userService.getUsersWithoutRoles())
        .rejects
        .toThrow('Failed to fetch users without roles: Database error');
    });
  });

});
