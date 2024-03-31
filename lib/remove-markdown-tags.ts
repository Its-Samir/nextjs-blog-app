export default function removeMarkdownTags(markdownText: string) {
	// Remove bold
	markdownText = markdownText.replace(/\*\*(.*?)\*\*/g, "$1");
	// Remove italic
	markdownText = markdownText.replace(/\*([^*]+)\*/g, "$1");
	// Remove headings
	markdownText = markdownText.replace(/#{1,6}\s(.*?)\n/g, "$1 ");
	// Remove quotations and flatten them into a single line
	markdownText = markdownText.replace(/^\>\s*(.*?)(\n|$)/gm, "$1 ");
	// Remove links
	markdownText = markdownText.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
	// Remove inline code
	markdownText = markdownText.replace(/`([^`]+)`/g, "$1");
	// Remove block code
	markdownText = markdownText.replace(/```[^]+?```/g, "");

	// Remove line breaks and multiple spaces
	markdownText = markdownText.replace(/\n/g, " ");
	markdownText = markdownText.replace(/\s+/g, " ");

	return markdownText.trim();
}
