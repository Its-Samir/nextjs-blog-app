"use client";

import { Button } from "@/components/ui/button";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogFooter,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteUser } from "@/actions/user/delete";
import { toast } from "sonner";

export default function DeleteAccountButton({ userId }: { userId: string }) {
	function handleClick() {
		deleteUser(userId)
			.then((data) => {
				if (data && data.error) {
					toast.error(data.error, {
						description:
							data.error === "Not authenticated"
								? "Please login to continue"
								: data.error === "Unauthorized"
								? "You don't have permission for this action"
								: "An error occurred",
					});
				}
			})
			.catch((err) => {
				toast.error("Error occurred", {
					description: "Something went wrong",
				});
			});
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant={"destructive"} className="w-max">
					Delete Account
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogTitle>Are you sure?</AlertDialogTitle>
				<AlertDialogFooter className="flex-row items-center gap-3 justify-end">
					<AlertDialogCancel className="m-0">Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleClick}>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
