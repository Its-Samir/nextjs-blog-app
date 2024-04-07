import { z } from "zod";

export const accountFormSchema = z.object({
	username: z.string().min(1, {
		message: "Username is required",
	}),
	name: z.string().min(1, {
		message: "Name is required",
	}),
	bio: z.optional(z.string()),
	avatar: z.optional(z.string()),
});
