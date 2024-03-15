import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Menus from "./menus";
import NavLink from "./nav-link";
import AuthModal from "@/components/auth/auth-modal";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { logOut } from "@/actions/auth/sign-out";

export default async function NavBar() {
	const session = await auth();

	let authContent: React.ReactNode;

	if (!session) {
		authContent = (
			<AuthModal>
				<Button size={"sm"} className="rounded-full">
					SignIn
				</Button>
			</AuthModal>
		);
	} else if (session.user) {
		authContent = (
			<Popover>
				<PopoverTrigger>
					<Avatar className="w-7 h-7 sm:w-5 sm:h-5">
						<AvatarImage
							src={session.user.image || ""}
							alt="avatar-img"
						/>
						<AvatarFallback className="bg-slate-400 text-white">
							{session.user.username?.slice(0, 1).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</PopoverTrigger>
				<PopoverContent asChild className="w-max p-0">
					<form action={logOut}>
						<Button size={"sm"}>Sign Out</Button>
					</form>
				</PopoverContent>
			</Popover>
		);
	}

	return (
		<nav className="flex justify-between items-center py-2">
			<Menus>
				<Menu />
			</Menus>
			<h1 className="text-2xl text-blue-500">logo</h1>
			<ul className="flex item-center justify-between gap-4 md:hidden">
				<NavLink path={"/"}>
					<li>Home</li>
				</NavLink>
				<NavLink path={"/posts"}>
					<li>Posts</li>
				</NavLink>
				<NavLink path={"/about"}>
					<li>About</li>
				</NavLink>
			</ul>
			{authContent}
		</nav>
	);
}
