import {z} from "zod";

export const categorySchema = z.object({
    category_name: z.string()
        .min(3, { message: "Category name must be at least 3 characters long" })
        .max(20, { message: "Category name must be at most 20 characters long" }),
});

export type Category = z.infer<typeof categorySchema>