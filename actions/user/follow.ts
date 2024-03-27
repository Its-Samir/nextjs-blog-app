"use server";

import { db } from "@/lib/db";
import { getUserById } from "@/lib/queries/user";
import { revalidatePath } from "next/cache";

export async function follow(userId: string, currentUserId: string) {
	let user;

	try {
		user = await getUserById(userId);

		if (!user) {
			return { error: "No user found" };
		}

		const isFollowing = new Set(user.followers).has(currentUserId);

		if (!isFollowing) {
			await db.user.update({
				where: { id: user.id },
				data: {
					followers: { push: currentUserId },
				},
			});

		} else {
			await db.user.update({
				where: { id: user.id },
				data: {
					followers: user.followers.filter(
						(id) => id !== currentUserId
					),
				},
			});
		}
	} catch (error) {
		return { error: "Something went wrong" };
	}

	revalidatePath(`/profile/${user!.username}`);
}
