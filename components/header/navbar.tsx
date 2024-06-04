import { Feather, LogOut, User } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Menus from "./menus";
import NavLink from "./nav-link";
import AuthModal from "@/components/auth/auth-modal";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logOut } from "@/actions/auth/sign-out";
import Link from "next/link";

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
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Avatar className="w-7 h-7 cursor-pointer">
						<AvatarImage
							src={session.user.image || ""}
							alt="avatar-img"
						/>
						<AvatarFallback className="bg-slate-400 text-white">
							{session.user.username?.slice(0, 1).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<Link
							href={`/blogs/new`}
							className="flex items-center w-full"
						>
							<Feather className="mr-2" size={12} />
							<span>Write</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link
							href={`/profile/me`}
							className="flex items-center w-full"
						>
							<User className="mr-2" size={12} />
							<span>Profile</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<form action={logOut} className="w-full">
							<button type="submit" className="flex items-center w-full">
								<LogOut className="mr-2" size={12} />
								<span>Sign Out</span>
							</button>
						</form>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}

	return (
		<nav className="flex justify-between items-center py-2">
			<Menus>
				<Menu />
			</Menus>
			<h1 className="text-2xl text-blue-500">
				<Link href={"/"}>BlogIt</Link>
			</h1>
			<ul className="flex item-center justify-between gap-4 md:hidden">
				<li>
					<NavLink path={"/"}>Home</NavLink>
				</li>
				<li>
					<NavLink path={"/blogs"}>Blogs</NavLink>
				</li>
				<li>
					<NavLink path={"/about"}>About</NavLink>
				</li>
			</ul>
			{authContent}
		</nav>
	);
}
