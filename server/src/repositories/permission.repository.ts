import prisma from '../db.js';
import { Permission } from '@prisma/client';

export const createPermission = async (permission_name: string) => {
    return await prisma.permission.create({
        data: {
            permission_name,
        },
    });
};

export const updatePermission = async (
    id: string,
    permission_name?: string
) => {
    const data: any = {};
    if (permission_name !== undefined) data.permission_name = permission_name;

    return await prisma.permission.update({
        where: { id },
        data,
    });
};

export const deletePermission = async (id: string) => {
    return await prisma.permission.delete({
        where: { id },
    });
};

export const getAllPermissions = async () => {
    return await prisma.permission.findMany();
};

export const getPermissionById = async (id: string) => {
    return await prisma.permission.findUnique({
        where: { id },
    });
};
