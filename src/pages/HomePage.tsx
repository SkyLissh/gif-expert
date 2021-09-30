import React, { ReactElement } from "react";
import "src/pages/GifPage.css";

import { API_KEY } from "src/environment";
import useWindowSize from "src/hooks/useWindowSize";

import GifList from "src/components/GifList";

export default function HomePage(): ReactElement {
	const urlTrend: string = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=20`;

	const { width } = useWindowSize();

	return (
		<main className="gif__container">
			<h2 className="gif__title">
				<span className="gif__icon material-icons">trending_up</span>Trending
			</h2>
			<GifList width={width} url={urlTrend} />
		</main>
	);
}
