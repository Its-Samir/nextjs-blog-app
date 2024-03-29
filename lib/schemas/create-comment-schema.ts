import { z } from "zod";

export const CreateCommentFormSchema = z.object({
	text: z.string().min(1, { message: "Emtpy comment not allowed" }),
});
