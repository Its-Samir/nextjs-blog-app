import { z } from "zod";

export const PostFormSchema = z.object({
    title: z.string().min(3, { message: "Title is required" }),
    content: z.string().min(10, { message: "Content should be more than 10 character long" }),
    category: z.string().min(1, { message: "Category is required" }),
    image: z.optional(z.string()),
});