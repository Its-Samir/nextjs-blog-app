import BlogForm from "@/components/blog/blog-form";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Create new blog",
};

export default function CreateBlogPage() {
	return <BlogForm />;
}
