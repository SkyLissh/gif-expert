import React, { ReactElement, UIEvent } from "react";

import Topbar from "src/components/Topbar";
import GifSection from "src/components/GifSection";

import useWindowSize from "src/hooks/useWindowSize";

export default function App(): ReactElement {
	const { width } = useWindowSize();

	return (
		<div className="App" onScroll={scroll}>
			<Topbar width={width} />
			<GifSection width={width} />
		</div>
	);
}

function scroll(e: UIEvent<HTMLElement>): void {
	console.log(e.target);
}
