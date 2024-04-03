import { z } from "zod";

export const createCommentFormSchema = z.object({
	text: z.string().min(1, { message: "Emtpy field not allowed" }),
});
