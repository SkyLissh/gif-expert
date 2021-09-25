import React, { ReactElement } from "react";
import "src/components/Masonry.css";

import GifList from "src/components/GifList";

interface Props {
	width: number;
}

export default function GifSection({ width }: Props): ReactElement {
	return (
		<main className="masonry__container">
			<h2 className="masonry__title">
				<span className="masonry__icon material-icons">trending_up</span>Trending
			</h2>
			<GifList width={width} />
		</main>
	);
}
