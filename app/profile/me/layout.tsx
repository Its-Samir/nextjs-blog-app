import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import TabHandlerButtons from "../_components/tab-handler-buttons";
import { auth } from "@/auth";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();

	if (!session || !session.user) {
		return null;
	}

	return (
		<div className="w-[40rem] mx-auto md:w-auto">
			<Card className="flex flex-col gap-4 border-0 border-b shadow-none py-2 rounded-none">
				<Avatar className="w-[5rem] h-[5rem]">
					<AvatarImage src={session.user.image || ""} alt="" />
					<AvatarFallback>
						{session.user.username.slice(0, 1).toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<div className="flex items-end gap-4 justify-between font-sans text-slate-500">
					<div className="flex flex-col gap-2 justify-end">
						<span className="text-slate-700 font-semibold">
							{session.user.name!.toUpperCase()}
						</span>
						<span className="text-slate-500">
							@{session.user.username.toLowerCase()}
						</span>
						<p>{session.user.bio}</p>
					</div>
				</div>
			</Card>
			<div className="flex items-center gap-2 border-0 border-b my-2 py-2 rounded-none">
				<TabHandlerButtons />
			</div>
			{children}
		</div>
	);
}
