"use server";

import crypto from "node:crypto";
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
			const slug = `${title.split(" ").join("-").toLowerCase()}-${crypto
				.randomBytes(6)
				.toString("hex")}`.replaceAll(":", "-");

			/* assuming reading speed 100 words per minute */
			const words = 100;
			const readingTime =
				content.split(" ").length / words >= 1
					? `${Math.round(content.split(" ").length / words)} min read`
					: `${Math.round(
							(content.split(" ").length / words) * 60
					  )} sec read`;

			blog = await db.blog.create({
				data: {
					title,
					slug,
					user: { connect: { id: session.user.id } },
					readingTime,
					tags,
					content,
					category,
					image,
				},
			});
		}

		revalidatePath(`/blogs/${blog.slug}`);
		return { slug: blog.slug };
	} catch (error) {
		return { error: "Something went wrong" };
	}
}
