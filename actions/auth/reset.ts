"use server";

import IActionsReturn from "@/types";
import { z } from "zod";
import { sendResetPasswordEmail } from "@/lib/mail";
import { resetFormSchema } from "@/lib/schemas/reset-form-schema";
import { generateVerificationToken } from "@/lib/token";
import { getUserByEmail } from "@/lib/queries/user";

export async function sendEmail(
	values: z.infer<typeof resetFormSchema>
): Promise<IActionsReturn> {
	try {
		const validationResult = resetFormSchema.safeParse(values);

		if (!validationResult.success) {
			return { error: "Invalid inputs" };
		}

		const existingUser = await getUserByEmail(validationResult.data.email);

		if (!existingUser) {
			return { error: "User not found" };
		}

		const verificationToken = await generateVerificationToken(
			existingUser.email!
		);

		await sendResetPasswordEmail(
			verificationToken.email,
			verificationToken.token
		);

		return { success: "Verification email sent" };
	} catch (error) {
		return { error: "Something went wrong" };
	}
}
