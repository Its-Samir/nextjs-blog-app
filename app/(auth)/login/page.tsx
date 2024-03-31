import LoginForm from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Auth - Login",
};

export default function LoginPage() {
	return <LoginForm />;
}
