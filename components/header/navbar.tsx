import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Menus from "./menus";
import NavLink from "./nav-link";
import AuthModal from "@/components/auth/auth-modal";

export default function NavBar() {
    return (
        <nav className="flex justify-between items-center py-2">
            <Menus>
                <Menu />
            </Menus>
            <h1 className="text-2xl text-blue-500">logo</h1>
            <ul className="flex item-center justify-between gap-4 md:hidden">
                <NavLink path={"/"}><li>Home</li></NavLink>
                <NavLink path={"/posts"}><li>Posts</li></NavLink>
                <NavLink path={"/about"}><li>About</li></NavLink>
            </ul>
            <AuthModal>
                <Button className="rounded-full">SignIn</Button>
            </AuthModal>
        </nav>
    )
}
