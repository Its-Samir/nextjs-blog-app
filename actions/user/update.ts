"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { storage } from "@/lib/firebase";
import { accountFormSchema } from "@/lib/schemas/account-form-schema";
import { deleteObject, ref } from "firebase/storage";
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

		if (
			session.user.image &&
			avatar !== session.user.image &&
			!session.user.image.startsWith("https://avatars.githubusercontent")
		) {
			const storageRef = ref(storage, `${session.user.image}`);
			if (storageRef.toString()) await deleteObject(storageRef);
		}

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
