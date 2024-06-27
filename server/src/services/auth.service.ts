import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import * as authRepository from '../repositories/auth.repository.js';
import * as userRepository from '../repositories/user.repository.js';

dotenv.config();

export const signUp = async (
    email: string,
    password: string,
) => {
    try {
        const existingUserByEmail = await userRepository.getUserByEmail(email);

        if (existingUserByEmail) {
            throw new Error('Email already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await authRepository.signUp(email, hashedPassword);

        return {user};
    } catch (error) {
        throw new Error(`Failed to create user: ${error}`);
    }
};



export const logIn = async (
    email: string,
    password: string,
) => {
    try {
        const user = await userRepository.getUserByEmail(email);

        if (!user) {
            throw new Error(`Email doesn't exist`);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error(`Wrong Password`);
        }

        const token = jwt.sign( { id: user.id, email: user.email }, process.env.SECRET, { expiresIn: '3d' } );

        return { user, token };
    } catch (error) {
        throw new Error(`Failed to sign in: ${error.message}`);
    }
};