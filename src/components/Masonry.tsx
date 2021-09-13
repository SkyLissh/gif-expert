import React, { Dispatch, ReactElement, useState } from "react";
import "./Masonry.css";

import { API_KEY } from "../environment";
import useFetch from "../hooks/useFetch";
import GifResponse from "../models/GifResponse";
import MasonryLayout from "./MasonryLayout";

type Props = {
	itemSelector: string;
	columnWidth: number | string;
	gutter: number;
	percentPosition: boolean;
};

export default function Masonry(props: Props): ReactElement {
	const initUrl = new URL("https://api.giphy.com/v1/gifs/trending");
	initUrl.searchParams.append("api_key", API_KEY);
	initUrl.searchParams.append("limit", "13");
	const [url, setUrl] = useState<string>(initUrl.toString());

	const { data: gifs, error } = useFetch<GifResponse>(url.toString());

	if (error) {
		return <div>Error: {error.message}</div>;
	}
	if (!gifs) {
		return <div>Loading...</div>;
	}

	return (
		console.log(gifs),
		(
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
					{gifs.data.map((gif) => (
						<li
							className={`masonry__item masonry__item--loading masonry__item--loading-${Math.round(
								Math.random() * 3 + 1
							)}`}
							key={gif.id}
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
		)
	);
}

function changeUrl(url: string, setUrl: Dispatch<React.SetStateAction<string>>): void {
	const initUrl = new URL(url);
	initUrl.searchParams.append("offset", 20 + "");
	setUrl(initUrl.toString());
	console.log(url);
}
