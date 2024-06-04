import BarLoading from "./bar-loader";

export default function LoadingPage() {
	return (
		<div className="mt-[5rem] flex flex-col gap-2 items-center justify-center">
			<div className="animate-pulse">
				<h1 className="text-neutral-800 font-sans font-bold text-2xl">
					BlogIt
				</h1>
			</div>
			<BarLoading />
		</div>
	);
}
