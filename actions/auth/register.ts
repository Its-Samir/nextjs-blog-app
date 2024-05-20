"use server";

import IActionsReturn from "@/types";
import bcrypt from "bcryptjs";
import { registerFormSchema } from "@/lib/schemas/register-form-schema";
import { z } from "zod";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export async function register(
	values: z.infer<typeof registerFormSchema>
): Promise<IActionsReturn> {
	try {
		const validationResult = registerFormSchema.safeParse(values);

		if (!validationResult.success) {
			return { error: "Invalid inputs" };
		}

		const { username, email, password } = validationResult.data;

		const existingUser = await db.user.findFirst({
			where: { OR: [{ email }, { username }] },
		});

		if (existingUser) {
			return { error: "Email or username is already in use" };
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		await db.user.create({
			data: {
				username,
				name: username,
				email,
				password: hashedPassword,
			},
		});
	} catch (error: unknown) {
		return { error: "Something went wrong" };
	}

	return redirect("/login");
}
