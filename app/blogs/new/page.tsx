import BlogForm from "@/components/blog/blog-form";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Create new blog",
	description: "Write new blog and learn",
};

export default function CreateBlogPage() {
	return <BlogForm />;
}
