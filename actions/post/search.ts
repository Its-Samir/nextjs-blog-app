"use server";

import { redirect } from "next/navigation";

interface SearchPostFormState {
    error?: string
}

export async function searchPost(prevState: SearchPostFormState, formData: FormData) {
    const query = formData.get("query");

    if (typeof query !== "string") {
        return {
            error: "Invalid query",
        };
    }

    if (!query) redirect(`/posts`);

    redirect(`/posts?search=${query}`);
}