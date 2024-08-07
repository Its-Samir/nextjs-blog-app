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
import { resetFormSchema } from "@/lib/schemas/reset-form-schema";
import { sendEmail } from "@/actions/auth/reset";
import { BeatLoader } from "react-spinners";
import Wrapper from "./wrapper";
import FormStatus from "./form-status";

export default function ResetForm() {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState({ success: false, message: "" });

	const form = useForm<z.infer<typeof resetFormSchema>>({
		resolver: zodResolver(resetFormSchema),
		defaultValues: {
			email: "",
		},
	});

	function onFormSubmit(values: z.infer<typeof resetFormSchema>) {
		startTransition(() => {
			sendEmail(values)
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
			header="VERIFY EMAIL"
			text="Go back to login."
			social={false}
		>
			<h1 className="bg-yellow-100 rounded-md px-4 py-2 text-yellow-600">
				Due to some of the restrictions we cannot perform this action, cause
				its built using the free tier.
			</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onFormSubmit)}
					className="flex flex-col gap-3"
				>
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
							"Confirm"
						)}
					</Button>
				</form>
			</Form>
		</Wrapper>
	);
}
