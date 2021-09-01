import React, { ReactElement, UIEvent } from "react";

import Topbar from "./components/Topbar";
import Masonry from "./components/Masonry";

export default function App(): ReactElement {
	return (
		<div className="App" onScroll={scroll}>
			<Topbar />
			<Masonry />
		</div>
	);
}

function scroll(e: UIEvent<HTMLElement>): void {
	console.log(e.target);
}
