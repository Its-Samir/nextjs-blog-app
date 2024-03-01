import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
    return (
        <form action="">
            <div className="my-4 flex items-center justify-center border p-2 rounded-md">
                <Search />
                <Input placeholder="Search posts" className="border-none focus-visible:ring-offset-0 focus:ring-0 focus-visible:ring-0" />
            </div>
        </form>
    )
}
