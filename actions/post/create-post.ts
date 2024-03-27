"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { PostFormSchema } from "@/lib/schemas/post-form-schema";
import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function createPost(values: z.infer<typeof PostFormSchema>) {
	let post: Post;

	try {
		const validation = PostFormSchema.safeParse(values);

		if (!validation.success) {
			return { error: "Invalid inputs" };
		}

		const session = await auth();

		if (!session || !session.user) {
			return { error: "Unauthorized" };
		}

		const { title, content, category, image } = validation.data;

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

		post = await db.post.create({
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

	} catch (error) {
		return { error: "Something went wrong" };
	}

	revalidatePath("/");
	redirect(`/posts/${post!.slug}`);
}
