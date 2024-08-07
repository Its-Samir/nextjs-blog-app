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
import { registerFormSchema } from "@/lib/schemas/register-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { register } from "@/actions/auth/register";
import { BeatLoader } from "react-spinners";
import Wrapper from "./wrapper";
import FormStatus from "./form-status";

export default function RegisterForm() {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState({ success: false, message: "" });
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm<z.infer<typeof registerFormSchema>>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	function onFormSubmit(values: z.infer<typeof registerFormSchema>) {
		setShowPassword(false);

		startTransition(() => {
			register(values)
				.then((data) => {
					if (data && data.error) {
						setStatus({ message: data.error, success: false });
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
			header="CREATE AN ACCOUNT"
			text="Already have an account?"
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onFormSubmit)}
					className="flex flex-col gap-3"
				>
					<FormField
						name="username"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="John"
										disabled={isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name="email"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="email"
										placeholder="john@email.com"
										disabled={isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
							"Create an Account"
						)}
					</Button>
				</form>
			</Form>
		</Wrapper>
	);
}
