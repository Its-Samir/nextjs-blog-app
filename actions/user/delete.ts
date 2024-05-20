"use server";

import { auth, signOut } from "@/auth";
import { db } from "@/lib/db";
import { storage } from "@/lib/firebase";
import { getUserById } from "@/lib/queries/user";
import { deleteObject, ref } from "firebase/storage";

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

		const users = await db.user.findMany({
			where: { followers: { has: user.id } },
		});

		users.length > 0 &&
			users.forEach(async (u) => {
				await db.user.update({
					where: { id: u.id },
					data: {
						followers: { set: u.followers.filter((id) => id != user.id) },
					},
				});
			});

		const blogs = await db.blog.findMany({
			where: { userId: user.id },
			select: { image: true },
		});

		blogs.length > 0 &&
			blogs.forEach(async (blog) => {
				const storageRefForBlogImg = ref(storage, `${blog.image}`);
				if (storageRefForBlogImg.toString()) {
					await deleteObject(storageRefForBlogImg);
				}
			});

		if (
			user.image &&
			!user.image.startsWith("https://avatars.githubusercontent")
		) {
			const storageRefUserAvatar = ref(storage, `${user.image}`);
			if (storageRefUserAvatar.toString()) {
				await deleteObject(storageRefUserAvatar);
			}
		}

		await db.user.delete({ where: { id: user.id } });
	} catch (error) {
		return { error: "Something went wrong" };
	} finally {
		await signOut({
			redirectTo: "/register",
		});
	}
	return { message: "User deleted" };
}
