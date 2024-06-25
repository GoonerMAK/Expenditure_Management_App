import prisma from '../db.js';
import { Role } from '@prisma/client';

export const createRole = async (role_name: string) => {
    return await prisma.role.create({
        data: {
            role_name,
        },
    });
};

export const updateRole = async (
    id: string,
    role_name?: string
) => {
    const data: any = {};
    if (role_name !== undefined) data.role_name = role_name;

    return await prisma.role.update({
        where: { id },
        data,
    });
};

export const deleteRole = async (id: string) => {
    return await prisma.role.delete({
        where: { id },
    });
};

export const getAllRoles = async () => {
    return await prisma.role.findMany();
};

export const getRoleById = async (id: string) => {
    return await prisma.role.findUnique({
        where: { id },
    });
};
