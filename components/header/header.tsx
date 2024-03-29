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
		<Card className="rounded-none shadow-none flex justify-between px-4 py-3 md:pt-[2rem] items-center border-none flex-wrap">
			<div className="flex flex-col gap-4 items-start w-[40rem]">
				<h1 className="text-5xl text-slate-600 md:text-3xl">
					Lorem ipsum dolor sit amet.
				</h1>
				<p className="text-slate-500 md:text-sm">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</p>
				{buttonContent}
			</div>
			<div className="w-[30rem]">
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
