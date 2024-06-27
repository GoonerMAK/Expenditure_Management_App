import prisma from '../db.js';


export const signUp = async (
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