"use server";

import { auth, signOut } from "@/auth";
import { db } from "@/lib/db";
import { getUserById } from "@/lib/queries/user";

export async function deleteUser(userId: string) {
	try {
		const session = await auth();

		if (!session || !session.user) {
			return { error: "Not authenticated" };
		}

		const user = await getUserById(userId);

		if (!user) {
			return { error: "No user found" };
		}

		if (session.user.id !== user.id) {
			return { error: "Unauthorized" };
		}

		await db.user.delete({ where: { id: user.id } });

	} catch (error) {
		return { error: "Something went wrong" };
	}

	await signOut({
		redirectTo: "/register",
	});
}
