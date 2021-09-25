import React, { ReactElement, UIEvent } from "react";

import Topbar from "src/components/Topbar";
import GifSection from "src/components/GifSection";

export default function App(): ReactElement {
	return (
		<div className="App" onScroll={scroll}>
			<Topbar />
			<GifSection />
		</div>
	);
}

function scroll(e: UIEvent<HTMLElement>): void {
	console.log(e.target);
}
