"use server";

import { redirect } from "next/navigation";

interface SearchBlogFormState {
    error?: string
}

export async function searchBlog(prevState: SearchBlogFormState, formData: FormData) {
    const query = formData.get("query");

    if (typeof query !== "string") {
        return {
            error: "Invalid query",
        };
    }

    if (!query) redirect(`/blogs`);

    redirect(`/blogs?search=${query}`);
}