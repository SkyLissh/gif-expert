import { useEffect, useState } from "react";
import ClipboardJS from "clipboard";

export default function useClipboard(
	selector: string | Element | NodeListOf<Element>,
	onCopy: () => void
): string {
	const [message, setMessage] = useState("");

	useEffect(() => {
		console.log(selector);
		const clipboard = new ClipboardJS(selector);

		clipboard.on("success", (e: ClipboardJS.Event) => {
			e.clearSelection();
			setMessage("Copied to clipboard!");
			onCopy();
		});

		clipboard.on("error", (e: ClipboardJS.Event) => {
			setMessage("Something went wrong!");
			onCopy();
		});

		return () => {
			clipboard.destroy();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return message;
}
