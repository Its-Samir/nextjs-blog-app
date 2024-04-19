import SingleBlog from "@/components/blog/single-blog";
import { db } from "@/lib/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
	const blogs = await db.blog.findMany({ select: { slug: true } });

	return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const blog = await db.blog.findUnique({
		where: { slug: params.slug },
		select: { title: true, content: true },
	});

	if (!blog) {
		notFound();
	}

	return {
		title: blog.title,
		description: blog.content,
	};
}

export default async function BlogPage({
	params,
}: {
	params: { slug: string };
}) {
	const blog = await db.blog.findUnique({
		where: { slug: params.slug },
		include: {
			user: {
				select: { name: true, username: true, image: true },
			},
			comments: true,
		},
	});

	if (!blog) {
		notFound();
	}

	return <SingleBlog {...blog} />;
}
