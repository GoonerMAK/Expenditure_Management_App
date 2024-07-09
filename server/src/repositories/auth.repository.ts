import prisma from '../db.js';


export const signUp = async (
    email: string,
    password: string,
    username: string,
) => {
    const readOnlyRole = await prisma.role.findUnique({
        where: {
            role_name: "Read-only",
        },
    });

    return await prisma.user.create({
        data: {
            email,
            password,
            username,
            role_name: "Read-only",  
            role: { connect: { id: readOnlyRole.id } }, 
        },
    });
};


export const logIn = async (
    email: string,
    password: string,
) => {
    return await prisma.user.create({
        data: {
            email,
            password,
        },
    });
};


export const getUserById = async (
    userId: string,
) => {
    return await prisma.user.findUnique({ 
        where: { 
            id: userId
        } 
    });
};