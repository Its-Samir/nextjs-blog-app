"use client";

import { useState, useTransition } from "react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { passwordResetFormSchema } from "@/lib/schemas/password-reset-schema";
import { resetPassword } from "@/actions/auth/reset-password";
import { BeatLoader } from "react-spinners";
import Wrapper from "./wrapper";
import FormStatus from "./form-status";

export default function PasswordResetForm({ token }: { token: string }) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState({ success: false, message: "" });
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm<z.infer<typeof passwordResetFormSchema>>({
		resolver: zodResolver(passwordResetFormSchema),
		defaultValues: {
			password: "",
		},
	});

	function onFormSubmit(values: z.infer<typeof passwordResetFormSchema>) {
		setShowPassword(false);

		startTransition(() => {
			resetPassword(values, token)
				.then((data) => {
					if (data.error) {
						setStatus({ message: data.error, success: false });
					} else if (data.success) {
						setStatus({ message: data.success, success: true });
					}
				})
				.catch((err) => {
					setStatus({
						message: err.message || "Something went wrong",
						success: false,
					});
				});
		});
	}

	return (
		<Wrapper
			url="/login"
			header="CHANGE PASSWORD"
			text="Go back to login."
			social={false}
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onFormSubmit)}
					className="flex flex-col gap-3"
				>
					<FormField
						name="password"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className="flex justify-between items-center">
									<span>Password</span>
									<div
										onClick={() => setShowPassword((p) => !p)}
										className="cursor-pointer text-black"
									>
										{showPassword ? "Hide" : "Show"}
									</div>
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										type={showPassword ? "text" : "password"}
										placeholder="▪▪▪▪▪▪"
										disabled={isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormStatus message={status.message} success={status.success} />
					<Button
						className="w-full"
						disabled={isPending}
						type="submit"
						size={"lg"}
						aria-label="Submit form"
					>
						{isPending ? (
							<BeatLoader color="white" size={8} />
						) : (
							"Change Password"
						)}
					</Button>
				</form>
			</Form>
		</Wrapper>
	);
}
