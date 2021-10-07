import React, { ReactElement, useRef, useState } from "react";

import "src/components/GifItem.css";

import useIntersection from "src/hooks/useIntersection";

import getHeight from "src/helpers/getHeight";
import Gif from "src/models/Gif";

interface Props {
	gif: Gif;
	screenWidth: number;
}

export default function GifItem({ gif, screenWidth }: Props): ReactElement {
	const [inView, setInView] = useState(false);
	const imgRef = useRef<HTMLLIElement>(null);
	useIntersection(imgRef, () => setInView(true));

	return (
		<li
			className="gif__item gif__item--loading"
			key={gif.id}
			data-clipboard-text={gif.images.original.url}
			ref={imgRef}
			style={{
				height: getHeight(
					screenWidth,
					Number(gif.images.original.width),
					Number(gif.images.original.height)
				)
			}}
		>
			{inView && (
				<img className="gif__img" src={gif.images.original.webp} alt={gif.title} />
			)}
		</li>
	);
}
