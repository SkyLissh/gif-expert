import React, { ReactElement } from "react";
import getWidth from "src/helpers/getWidth";

import Gif from "src/models/Gif";

interface Props {
	gif: Gif;
	screenWidth: number;
}

export default function GifItem(props: Props): ReactElement {
	return (
		<li
			className="masonry__item masonry__item--loading"
			key={props.gif.id}
			style={{
				height: getWidth(
					props.screenWidth,
					Number(props.gif.images.original.width),
					Number(props.gif.images.original.height)
				)
			}}
		>
			<img
				className="masonry__img"
				src={props.gif.images.original.webp}
				alt={props.gif.title}
				loading="lazy"
			/>
		</li>
	);
}
