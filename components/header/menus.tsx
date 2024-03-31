import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import NavLink from "./nav-link";

export default function Menus({ children }: { children: React.ReactNode }) {
	return (
		<Dialog>
			<DialogTrigger className="hidden md:block">{children}</DialogTrigger>
			<DialogContent>
				<Card className="border-none shadow-none mt-4">
					<ul className="flex flex-col justify-between gap-4">
						<NavLink path={"/"}>
							<li>Home</li>
						</NavLink>
						<NavLink path={"/blogs"}>
							<li>Blogs</li>
						</NavLink>
						<NavLink path={"/about"}>
							<li>About</li>
						</NavLink>
					</ul>
				</Card>
			</DialogContent>
		</Dialog>
	);
}
