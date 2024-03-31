import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";

export default function AccountPage() {
	return (
		<Card>
			<CardContent>
				<div className="flex flex-col gap-2">
					<label>Email</label>
					<Input
						defaultValue={"test@test.com"}
						className="focus:ring-0 focus:outline-none"
					/>
				</div>
			</CardContent>
		</Card>
	);
}
