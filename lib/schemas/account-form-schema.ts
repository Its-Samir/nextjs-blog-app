import { z } from "zod";

export const accountFormSchema = z.object({
	username: z.string().min(1, {
		message: "Username is required",
	}),
	name: z.string().min(1, {
		message: "Name is required",
	}),
	bio: z.string().min(3, {
		message: "Bio should be more than 2 character",
	}),
});
