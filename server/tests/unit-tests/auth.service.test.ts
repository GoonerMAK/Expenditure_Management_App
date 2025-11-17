import * as authService from '../../src/services/auth.service.js'
import * as authRepository from '../../src/repositories/auth.repository.js';
import * as userRepository from '../../src/repositories/user.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('../../src/repositories/auth.repository.js');
jest.mock('../../src/repositories/user.repository.js');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');


describe('authService', () => {
  
  beforeEach(() => {
    jest.clearAllMocks(); 
  });


  describe('signUp', () => {
    it('should throw an error if the email already exists', async () => {
      (userRepository.getUserByEmail as jest.Mock).mockResolvedValue({ email: 'test@example.com' });
      (userRepository.getUserByUsername as jest.Mock).mockResolvedValue(null);

      await expect(authService.signUp('test@example.com', 'password', 'username'))
        .rejects
        .toThrow('Email already exists');
    });

    it('should throw an error if the username already exists', async () => {
      (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(null);
      (userRepository.getUserByUsername as jest.Mock).mockResolvedValue({ username: 'testuser' });

      await expect(authService.signUp('new@example.com', 'password', 'testuser'))
        .rejects
        .toThrow('Username already exists');
    });

    it('should create a new user successfully', async () => {
      (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(null);
      (userRepository.getUserByUsername as jest.Mock).mockResolvedValue(null);
      (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (authRepository.signUp as jest.Mock).mockResolvedValue({ id: '123', email: 'new@example.com', username: 'newuser' });

      const result = await authService.signUp('new@example.com', 'password', 'newuser');
      expect(result.user).toEqual({ id: '123', email: 'new@example.com', username: 'newuser' });
    });

    it('should handle errors thrown during signUp', async () => {
      (userRepository.getUserByEmail as jest.Mock).mockRejectedValue('Database error');

      await expect(authService.signUp('new@example.com', 'password', 'newuser'))
        .rejects
        .toThrow('Failed to create user: Database error');
    });
  });



  describe('logIn', () => {
    it('should throw an error if the email does not exist', async () => {
      (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(null);

      await expect(authService.logIn('nonexistent@example.com', 'password'))
        .rejects
        .toThrow("Email doesn't exist");
    });

    it('should throw an error if the password is incorrect', async () => {
      (userRepository.getUserByEmail as jest.Mock).mockResolvedValue({ email: 'test@example.com', password: 'hashedPassword' });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(authService.logIn('test@example.com', 'wrongpassword'))
        .rejects
        .toThrow('Wrong Password');
    });

    it('should return user and token if login is successful', async () => {
      (userRepository.getUserByEmail as jest.Mock).mockResolvedValue({ id: '123', email: 'test@example.com', password: 'hashedPassword' });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('token');

      const result = await authService.logIn('test@example.com', 'password');
      expect(result).toEqual({ user: { id: '123', email: 'test@example.com', password: 'hashedPassword' }, token: 'token' });
    });

    it('should handle errors thrown during logIn', async () => {
      (userRepository.getUserByEmail as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(authService.logIn('test@example.com', 'password'))
        .rejects
        .toThrow('Failed to sign in: Database error');
    });
  });



  describe('getAuthenticatedUser', () => {
    it('should throw an error if the user cannot be found', async () => {
      (authRepository.getUserById as jest.Mock).mockResolvedValue(null);

      await expect(authService.getAuthenticatedUser('nonexistentId'))
        .rejects
        .toThrow('Failed to get user information');
    });

    it('should return user if found', async () => {
      (authRepository.getUserById as jest.Mock).mockResolvedValue({ id: '123', email: 'test@example.com', username: 'testuser' });

      const result = await authService.getAuthenticatedUser('123');
      expect(result).toEqual({ id: '123', email: 'test@example.com', username: 'testuser' });
    });

    it('should handle errors thrown during getAuthenticatedUser', async () => {
      (authRepository.getUserById as jest.Mock).mockRejectedValue('Database error');

      await expect(authService.getAuthenticatedUser('123'))
        .rejects
        .toThrow('Failed to get user information');
    });
  });



  describe('logOut', () => {
    it('should return success message on logout', async () => {
      const result = await authService.logOut();
      expect(result).toEqual({ message: 'Logged out fully' });
    });

    it('should handle errors thrown during logOut', async () => {
      jest.spyOn(authService, 'logOut').mockRejectedValue(new Error('Failed to log out'));

      await expect(authService.logOut())
        .rejects
        .toThrow('Failed to log out');
    });
  });

  
});
