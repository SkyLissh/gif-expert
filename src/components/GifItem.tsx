import React, { ReactElement } from "react";

import "src/components/GifItem.css";

import getHeight from "src/helpers/getHeight";
import Gif from "src/models/Gif";

interface Props {
	gif: Gif;
	screenWidth: number;
}

export default function GifItem(props: Props): ReactElement {
	return (
		<li
			className="gif__item gif__item--loading"
			key={props.gif.id}
			style={{
				height: getHeight(
					props.screenWidth,
					Number(props.gif.images.original.width),
					Number(props.gif.images.original.height)
				)
			}}
		>
			<img
				className="gif__img"
				src={props.gif.images.original.webp}
				alt={props.gif.title}
				loading="lazy"
			/>
		</li>
	);
}
