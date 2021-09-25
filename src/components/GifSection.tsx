import React, { ReactElement } from "react";
import "src/components/Masonry.css";

import GifList from "src/components/GifList";

export default function GifSection(): ReactElement {
	return (
		<main className="masonry__container">
			<h2 className="masonry__title">
				<span className="masonry__icon material-icons">trending_up</span>Trending
			</h2>
			<GifList />
		</main>
	);
}
