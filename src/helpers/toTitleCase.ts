export default function toTitleCase(str: string): string {
	return str.replace(/\w\S*/g, function (txt: string): string {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}
