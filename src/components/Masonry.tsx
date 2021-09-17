import React, { Dispatch, ReactElement, useEffect, useState } from "react";
import "./Masonry.css";

import { API_KEY } from "../environment";
import useFetch from "../hooks/useFetch";

import GifResponse from "../models/GifResponse";
import MasonryLayout from "./MasonryLayout";
import Gif from "../models/Gif";

function changeUrl(url: string, setUrl: Dispatch<React.SetStateAction<string>>): void {
	const updateUrl = new URL(url);
	const offset: number = Number(updateUrl.searchParams.get("offset")!);

	updateUrl.searchParams.set("offset", (offset + 20).toString());

	setUrl(updateUrl.toString());
	console.log(url);
}

function addGifs(gifs: Gif[], data: GifResponse): Gif[] {
	if (gifs.length === 0) {
		return data.data;
	} else {
		return gifs.concat(data.data);
	}
}

export default function Masonry(): ReactElement {
	const initUrl = new URL("https://api.giphy.com/v1/gifs/trending");
	initUrl.searchParams.append("api_key", API_KEY);
	initUrl.searchParams.append("limit", "15");
	initUrl.searchParams.append("offset", "0");

	const [url, setUrl] = useState<string>(initUrl.toString());

	const { data, error } = useFetch<GifResponse>(url.toString());
	const [gifs, setGifs] = useState<Gif[]>([]);

	useEffect(() => {
		console.log(data);
		if (data) {
			setGifs((g) => addGifs(g, data));
			// } else if (data && gifs.length === 0) {
			// 	setGifs(data.data);
		}
	}, [data]);

	if (error) {
		return <div>Error: {error.message}</div>;
	}
	if (gifs.length === 0) {
		return <div>Loading...</div>;
	}

	return (
		<main className="masonry__container">
			<h2 className="masonry__title">
				<span className="masonry__icon material-icons">trending_up</span>Trending
			</h2>
			<button onClick={() => changeUrl(url, setUrl)}>Change url</button>
			<MasonryLayout
				className="masonry"
				itemSelector="masonry__item"
				columnWidth="masonry--resizer"
				gutter={16}
				percentPosition={true}
			>
				{gifs.map((gif) => (
					<li
						className="masonry__item masonry__item--loading"
						key={`${data?.meta.response_id}-${gif.id}`}
						id={`${data?.meta.response_id}-${gif.id}`}
					>
						<img
							className="masonry__img"
							src={gif.images.original.webp}
							alt={gif.title}
							loading="lazy"
						/>
					</li>
				))}
			</MasonryLayout>
		</main>
	);
}
