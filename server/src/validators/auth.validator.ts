import {z} from "zod";

export const authLoginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string(),
    username: z.string()
        .min(3, { message: "Username must be at least 3 characters long" })
        .max(20, { message: "Username must be at most 20 characters long" }).optional(),
});

export const authSignUpSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string(),
    username: z.string()
        .min(3, { message: "Username must be at least 3 characters long" })
        .max(20, { message: "Username must be at most 20 characters long" }),
});

export type AuthLogin = z.infer<typeof authLoginSchema>
export type AuthSignup = z.infer<typeof authSignUpSchema>