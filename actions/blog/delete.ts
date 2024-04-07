"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { storage } from "@/lib/firebase";
import { deleteObject, ref } from "firebase/storage";
import { revalidatePath } from "next/cache";

export async function deleteBlog(blogId: string) {
	try {
		const session = await auth();

		if (!session || !session.user) {
			return { error: "Not authenticatd" };
		}

		const blog = await db.blog.findUnique({
			where: { id: blogId },
		});

		if (!blog) {
			return { error: "No blog found" };
		}

		const storageRef = ref(storage, `${blog.image}`);
		if (storageRef.toString()) await deleteObject(storageRef);

		await db.blog.delete({
			where: { id: blog.id },
		});
	} catch (error) {
		return { error: "Something went wrong" };
	}

	revalidatePath(`/blogs`);
	revalidatePath(`/profile/me`);
}
