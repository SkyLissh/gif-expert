export default function getWidth(screenWidth: number, w: number, h: number): number {
	const elementWidth = (screenWidth - 48) / 2;
	return Number(((elementWidth / w) * h).toFixed(2));
}
