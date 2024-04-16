"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { storage } from "@/lib/firebase";
import { blogFormSchema } from "@/lib/schemas/blog-form-schema";
import { Blog } from "@prisma/client";
import { deleteObject, ref } from "firebase/storage";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function createOrUpdateBlog(
	values: z.infer<typeof blogFormSchema>,
	blogData?: Blog
) {
	let blog: Blog;

	try {
		const validation = blogFormSchema.safeParse(values);

		if (!validation.success) {
			return { error: "Invalid inputs" };
		}

		const session = await auth();

		if (!session || !session.user) {
			return { error: "Not authenticated" };
		}

		const { title, content, category, image, tags } = validation.data;

		if (blogData && blogData.id) {
			if (session.user.id !== blogData.userId) {
				return { error: "Unauthorized" };
			}

			if (blogData.image !== image) {
				const storageRef = ref(storage, `${blogData.image}`);
				if (storageRef.toString()) await deleteObject(storageRef);
			}

			blog = await db.blog.update({
				where: { id: blogData.id },
				data: {
					...blogData,
					title,
					content,
					tags,
					image,
					category,
				},
			});
		} else {
			const slug = `${title
				.split(" ")
				.join("-")
				.toLowerCase()}-${crypto.randomUUID()}`;

			/* assuming reading speed 200 words per minute */
			const readingTime =
				content.split(" ").length / 200 >= 1
					? `${Math.round(content.split(" ").length / 200)} min read`
					: `${Math.round(
							(content.split(" ").length / 200) * 60
					  )} sec read`;

			blog = await db.blog.create({
				data: {
					title,
					slug,
					user: { connect: { id: session.user.id } },
					readingTime,
					content,
					category,
					image,
				},
			});
		}
	} catch (error) {
		return { error: "Something went wrong" };
	}

	revalidatePath("/");
	redirect(`/blogs/${blog.slug}`);
}
