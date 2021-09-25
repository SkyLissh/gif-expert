export default function getHeight(screenWidth: number, w: number, h: number): number {
	console.log(screenWidth);
	const contentWidth = screenWidth < 769 ? (screenWidth - 48) / 2 : (1200 - 48) / 4;
	return Number(((contentWidth / w) * h).toFixed(2));
}
