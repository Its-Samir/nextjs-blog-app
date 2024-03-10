export default function getRandomColor(category: string) {
    const colors = ["text-red-500", "text-blue-500", "text-green-500", "text-yellow-500"];
    const color = category === "design" ?
        colors[3] :
        category === "development" ?
            colors[2] :
            category === "health" ?
                colors[1] :
                colors[0];

    return color;
} 