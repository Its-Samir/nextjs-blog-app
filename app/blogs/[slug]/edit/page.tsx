import BlogForm from "@/components/blog/blog-form";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
	const blogs = await db.blog.findMany({ select: { slug: true } });

	return blogs.map((blog) => ({ slug: blog.slug }));
}

export default async function BlogEditPage({
	params,
}: {
	params: { slug: string };
}) {
	const blog = await db.blog.findUnique({
		where: { slug: params.slug },
	});

	if (!blog) {
		notFound();
	}

	return <BlogForm blog={blog} />;
}
