"use server";

import { db } from "@/lib/db";
import { getUserById } from "@/lib/queries/user";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function follow(userId: string, currentUserId: string) {
	let user: User | null;

	try {
		user = await getUserById(userId);

		if (!user) {
			return { error: "No user found" };
		}

		let currentUser = await getUserById(currentUserId);

		if (!currentUser) {
			return { error: "No user found" };
		}

		const isFollowing = new Set(user.followers).has(currentUser.id);

		if (!isFollowing) {
			await db.user.update({
				where: { id: user.id },
				data: {
					followers: { push: currentUser.id },
				},
			});

			await db.user.update({
				where: { id: currentUser.id },
				data: {
					followings: { push: user.id },
				},
			});
		} else {
			await db.user.update({
				where: { id: user.id },
				data: {
					followers: {
						set: user.followers.filter((id) => id !== currentUser!.id),
					},
				},
			});

			await db.user.update({
				where: { id: currentUser.id },
				data: {
					followings: {
						set: currentUser.followings.filter((id) => id !== user!.id),
					},
				},
			});
		}
	} catch (error) {
		return { error: "Something went wrong" };
	}

	revalidatePath(`/profile/${user!.username}`);
}
