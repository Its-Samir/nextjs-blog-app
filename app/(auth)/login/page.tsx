import LoginForm from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Auth - Login",
	description: "Login to start writing your blog",
};

export default function LoginPage() {
	return <LoginForm />;
}
