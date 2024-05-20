"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { loginFormSchema } from "@/lib/schemas/login-form-schema";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { getAccountByUserId } from "@/lib/queries/account";
import { getUserByEmail } from "@/lib/queries/user";

export async function login(values: z.infer<typeof loginFormSchema>) {
	let redirectUrl;

	try {
		const validationResult = loginFormSchema.safeParse(values);

		if (!validationResult.success) {
			return { error: "Invalid inputs" };
		}

		const { email, password } = validationResult.data;

		const existingUser = await getUserByEmail(email);

		if (!existingUser) {
			return { error: "User not found" };
		}

		const userAccount = await getAccountByUserId(existingUser.id);

		if (userAccount && userAccount.type === "oauth") {
			return { error: "User is already registered with another method" };
		}

		const isCorrectPassword = await bcrypt.compare(
			password,
			existingUser.password!
		);

		if (!isCorrectPassword) {
			return { error: "Invalid credentials" };
		}

		try {
			redirectUrl = await signIn("credentials", {
				email,
				password,
				redirectTo: "/",
				redirect: false,
			});
		} catch (error) {
			return { error: "Failed to signed in, Try again later" };
		}
	} catch (error) {
		return { error: "Something went wrong" };
	}

	redirect(redirectUrl);
}
