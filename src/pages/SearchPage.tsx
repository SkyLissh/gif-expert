import React, { ReactElement } from "react";
import { useParams } from "react-router";
import "src/components/Masonry.css";

import { API_KEY } from "src/environment";
import useWindowSize from "src/hooks/useWindowSize";

import GifList from "src/components/GifList";
import toTitleCase from "src/helpers/toTitleCase";

export default function SearchPage(): ReactElement {
	const { tag } = useParams<{ tag: string }>();

	const urlSearch: string = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${tag}&limit=20`;

	const { width } = useWindowSize();

	return (
		<main className="masonry__container">
			<h2 className="masonry__title">
				<span className="masonry__icon material-icons">search</span>
				{toTitleCase(tag)}
			</h2>
			<GifList width={width} url={urlSearch} />
		</main>
	);
}
