import { z } from "zod";

const genderEnum = z.enum(["Male", "Female", "Other"]);
const roleNamesEnum = z.enum(["Read-only", "Contributor", "Administrator"]); 

export const createUserSchema = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    name: z.string().min(1, { message: "Name is required" }),
    role_id: z.string().uuid({ message: "Invalid role ID" }),
    role_name: roleNamesEnum,
    age: z.string().optional(),
    gender: genderEnum.optional(),
    nationality: z.string().optional(),
});

export const updateUserSchema = z.object({
    id: z.string().uuid({ message: "Invalid user ID" }),
    data: z.object({
        username: z.string().min(2, { message: "Username must be at least 2 characters long" }).optional(),
        password: z.string().optional(),
        email: z.string().email({ message: "Invalid email address" }).optional(),
        name: z.string().min(1, { message: "Name is required" }).optional(),
        role_id: z.string().uuid({ message: "Invalid role ID" }).optional(),
        role_name: roleNamesEnum.optional(),
        age: z.string().optional(),
        gender: genderEnum.optional(),
        nationality: z.string().optional(),
    }),
});

export type UserCreate = z.infer<typeof createUserSchema>
export type UserUpdate = z.infer<typeof updateUserSchema>