import React, { ReactElement } from "react";
import "./Masonry.css";

import { API_KEY } from "../environment";
import useFetch from "../hooks/useFetch";
import GifResponse from "../models/GifResponse";

export default function Masonry(): ReactElement {
	const url = new URL("https://api.giphy.com/v1/gifs/trending");
	url.searchParams.append("api_key", API_KEY);
	url.searchParams.append("limit", "20");

	const { data: gifs, error } = useFetch<GifResponse>(url.toString());

	if (error) {
		return <div>Error: {error.message}</div>;
	}
	if (!gifs) {
		return <div>Loading...</div>;
	}

	return (
		<main className="masonry">
			<h2 className="masonry__title">
				<span className="masonry__icon material-icons">trending_up</span>Trending
			</h2>
			<div className="masonry__container">
				{gifs.data.map((gif) => (
					<div className="masonry__item" key={gif.id}>
						<img className="masonry__img" src={gif.images.original.url} alt={gif.title} />
					</div>
				))}
			</div>
		</main>
	);
}
