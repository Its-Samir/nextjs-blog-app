import ResetForm from "@/components/auth/required-reset-form";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Get reset mail",
	description: "Get a verification reset mail.",
};

export default function ResetPage() {
	return <ResetForm />;
}
