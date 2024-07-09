import prisma from '../db.js';
import { User } from '@prisma/client';


export const createUser = async (
    username: string,
    password: string,
    email: string,
    name: string,
    role_id: string,
    role_name: string,
    age?: string,
    gender?: string,
    nationality?: string
) => {
    return await prisma.user.create({
        data: {
            username,
            password,
            email,
            name,
            age,
            gender,
            nationality,
            role_name,
            role: {
                connect: {
                    id: role_id
                }
            }
        },
    });
};

export const updateUser = async (
    id: string,
    data: {
        username?: string,
        password?: string,
        email?: string,
        name?: string,
        role_id?: string,
        role_name?: string,
        age?: string,
        gender?: string,
        nationality?: string
    }
) => {
    return await prisma.user.update({
        where: { id },
        data,
    });
};

export const deleteUser = async (id: string) => {
    return await prisma.user.delete({
        where: { id },
    });
};

export const getAllUsers = async () => {
    return await prisma.user.findMany();
};

export const getUserById = async (id: string) => {
    return await prisma.user.findUnique({
        where: { id },
    });
};

export const getUserByUsername = async (username: string) => {
    return await prisma.user.findUnique({
        where: { username },
    });
};

export const getUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: { email },
    });
};