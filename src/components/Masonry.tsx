import React, { ReactElement, useEffect } from "react";
import "./Masonry.css";
import MasonryLayout from "masonry-layout";
import imagesLoaded from "imagesloaded";

import { API_KEY } from "../environment";
import useFetch from "../hooks/useFetch";
import GifResponse from "../models/GifResponse";

export default function Masonry(): ReactElement {
	const url = new URL("https://api.giphy.com/v1/gifs/trending");
	url.searchParams.append("api_key", API_KEY);
	url.searchParams.append("limit", "20");

	const { data: gifs, error } = useFetch<GifResponse>(url.toString());

	useEffect(() => {
		if (gifs) {
			const masonry = new MasonryLayout(".masonry", {
				itemSelector: ".masonry__item",
				columnWidth: ".masonry--resizer",
				percentPosition: true,
				gutter: 16
			});

			const imgLoad = imagesLoaded(".masonry");

			imgLoad.on("progress", (instance, image) => {
				console.log(image?.isLoaded);
				image!.img.parentElement!.className = image!.isLoaded
					? "masonry__item"
					: "masonry__item masonry__item--broken";
				// masonry.reloadItems?.();
				masonry.layout!();
			});
		}
	}, [gifs]);

	if (error) {
		return <div>Error: {error.message}</div>;
	}
	if (!gifs) {
		return <div>Loading...</div>;
	}

	return (
		<main className="masonry__container">
			<h2 className="masonry__title">
				<span className="masonry__icon material-icons">trending_up</span>Trending
			</h2>
			<div className="masonry">
				<div className="masonry--resizer"></div>
				{gifs.data.map((gif) => (
					<div className="masonry__item masonry__item--loading" key={gif.id}>
						<img
							className="masonry__img"
							src={gif.images.downsized.url}
							alt={gif.title}
							loading="lazy"
						/>
					</div>
				))}
			</div>
		</main>
	);
}
