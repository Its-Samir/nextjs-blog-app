import RegisterForm from "@/components/auth/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Auth - Register",
};

export default function RegisterPage() {
	return <RegisterForm />;
}
