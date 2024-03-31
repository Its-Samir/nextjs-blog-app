"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
	children,
	path,
}: {
	children: React.ReactNode;
	path: string;
}) {
	const pathname = usePathname();

	return (
		<Link
			className={`${
				pathname === path &&
				"bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
			} text-slate-500 py-1 px-4 rounded-full`}
			href={path}
		>
			{children}
		</Link>
	);
}
