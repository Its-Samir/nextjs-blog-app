import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { MessageCircle, ThumbsUp } from "lucide-react";

export default function DashboardPage() {
	return (
		<Card className="border-none">
			<div className="flex justify-between items-center p-4 border-0 border-b">
				<div className="flex flex-col gap-2">
					<CardTitle>Lorem ipsum dolor sit.</CardTitle>
					<CardContent className="flex gap-2 items-center">
						<Badge className="font-normal">Design</Badge>
						<span className="flex items-center gap-1 text-slate-500 text-sm">
							<ThumbsUp size={16} /> 0
						</span>
						<span className="flex items-center gap-1 text-slate-500 text-sm">
							<MessageCircle size={16} /> 0
						</span>
					</CardContent>
				</div>
				<div
					className="w-[7rem] h-[7rem] md:w-[5rem] md:h-[5rem]"
					style={{
						backgroundImage: `url("/header-image.jpg")`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>
			</div>
		</Card>
	);
}
