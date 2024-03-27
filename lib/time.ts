export function formatTime(createdAt: Date) {
	return Intl.DateTimeFormat("en-IN", {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(new Date(createdAt));
}
