import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { auth } from "@/auth";
import AuthModal from "../auth/auth-modal";
import Link from "next/link";

export default async function Header() {
	const session = await auth();
	let buttonContent: React.ReactNode;

	if (!session || !session.user) {
		buttonContent = (
			<AuthModal>
				<Button size={"sm"} className="rounded-full">
					Start Writing
				</Button>
			</AuthModal>
		);
	} else if (session && session.user) {
		buttonContent = (
			<Button size={"sm"} className={`rounded-full`}>
				<Link href={"/blogs/new"}>Start Writing</Link>
			</Button>
		);
	}

	return (
		<Card className="rounded-none shadow-none flex justify-between px-4 py-3 md:pt-[2rem] items-center border-none md:flex-col md:items-start">
			<div className="flex flex-col gap-4 items-start w-[60%] md:w-full">
				<h1 className="text-5xl text-neutral-800 font-sans font-bold md:text-3xl">
					Stay Creative and Updated.
				</h1>
				<p className="text-slate-600 md:text-sm">
					A place to find your next inspiration, where creativity and mindfulness come together.
				</p>
				{buttonContent}
			</div>
			<div className="w-[33%] md:w-[75%]">
				<Image
					src={"/header-image.jpg"}
					alt="img"
					width={500}
					height={500}
					style={{ width: "auto", height: "auto" }}
					priority
				/>
			</div>
		</Card>
	);
}
