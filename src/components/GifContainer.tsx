import React, { ReactElement, useRef } from "react";

import useWindowSize from "src/hooks/useWindowSize";
import useClipboard from "src/hooks/useClipboard";

import GifList from "src/components/GifList";
import Tooltip from "src/components/Tooltip";

interface Props {
	title: string;
	icon: string;
	url: string;
}

export default function GifContainer({ title, icon, url }: Props): ReactElement {
	const tooltipRef = useRef<HTMLDivElement>(null);
	const message = useClipboard(".gif__item", handleCopy);
	const { width } = useWindowSize();

	function handleCopy(): void {
		tooltipRef.current?.classList.remove("tooltip--hidden");
		setTimeout(() => {
			tooltipRef.current?.classList.add("tooltip--hidden");
		}, 2000);
	}

	return (
		<main className="gif__container">
			<h2 className="gif__title">
				<span className="gif__icon material-icons">{icon}</span>
				{title}
			</h2>
			<GifList width={width} url={url} />
			<Tooltip text={message} ref={tooltipRef} />
		</main>
	);
}
