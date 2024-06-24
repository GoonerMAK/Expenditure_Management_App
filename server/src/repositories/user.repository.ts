import prisma from '../db.js';
import { User } from '@prisma/client';


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
    return await prisma.user.create({
        data: {
            username,
            password,
            email,
            name,
            role_id,
            age,
            gender,
            nationality,
        },
    });
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
    const data: any = {};
    if (username !== undefined) data.username = username;
    if (password !== undefined) data.password = password;
    if (email !== undefined) data.email = email;
    if (name !== undefined) data.name = name;
    if (role_id !== undefined) data.role_id = role_id;
    if (age !== undefined) data.age = age;
    if (gender !== undefined) data.gender = gender;
    if (nationality !== undefined) data.nationality = nationality;

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