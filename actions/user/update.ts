"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { accountFormSchema } from "@/lib/schemas/account-form-schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function updateUser(values: z.infer<typeof accountFormSchema>) {
	try {
		const validationResult = accountFormSchema.safeParse(values);

		if (!validationResult.success) {
			return { error: "Invalid inputs" };
		}

		const session = await auth();

		if (!session || !session.user) {
			return { error: "Not authenticated" };
		}

		const { username, name, bio, avatar } = validationResult.data;

		await db.user.update({
			where: { id: session.user.id },
			data: {
				username,
				name,
				bio,
				image: avatar ? avatar : session.user.image,
			},
		});

	} catch (error) {
		return { error: "Something went wrong" };
	}

	revalidatePath("/profile/me", "layout");
}
