import { User } from '@prisma/client';
import * as userRepository from '../repositories/user.repository.js';

export const createUser = async (
    username: string,
    password: string,
    email: string,
    name: string,
    role_id: string,
    age?: string,
    gender?: string,
    nationality?: string
) => {
    try {
        const user = await userRepository.createUser(username, password, email, name, role_id, age, gender, nationality);
        return user;
    } catch (error) {
        throw new Error(`Failed to create user: ${error}`);
    }
};

export const updateUser = async (
    id: string,
    username?: string,
    password?: string,
    email?: string,
    name?: string,
    role_id?: string,
    age?: string,
    gender?: string,
    nationality?: string
) => {
    try {
        const updatedUser = await userRepository.updateUser(id, username, password, email, name, role_id, age, gender, nationality);
        if (!updatedUser) {
            throw new Error(`User with id ${id} not found`);
        }
        return updatedUser;
    } catch (error) {
        throw new Error(`Failed to update user: ${error}`);
    }
};

export const deleteUser = async (id: string) => {
    try {
        const deletedUser = await userRepository.deleteUser(id);
        if (!deletedUser) {
            throw new Error(`User with id ${id} not found`);
        }
        return deletedUser;
    } catch (error) {
        throw new Error(`Failed to delete user: ${error}`);
    }
};

export const getAllUsers = async () => {
    try {
        const users = await userRepository.getAllUsers();
        return users;
    } catch (error) {
        throw new Error(`Failed to fetch users: ${error}`);
    }
};

export const getUserById = async (id: string) => {
    try {
        const user = await userRepository.getUserById(id);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    } catch (error) {
        throw new Error(`Failed to fetch user: ${error}`);
    }
};
