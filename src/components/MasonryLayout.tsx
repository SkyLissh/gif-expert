import React, { ReactElement, useEffect, useRef } from "react";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

interface Props {
	children: React.ReactNode;
	className: string;
	itemSelector: string;
	columnWidth: number | string;
	gutter?: number;
	percentPosition?: boolean;
}

export default function MasonryLayout(props: Props): ReactElement {
	const refMasonry = useRef<HTMLUListElement>(null);

	function onLoad(
		instance: ImagesLoaded.ImagesLoaded,
		image?: ImagesLoaded.LoadingImage
	): void {
		image!.img.parentElement!.style.removeProperty("height");
		image!.img.parentElement!.className = image!.isLoaded
			? props.itemSelector
			: `${props.itemSelector} ${props.itemSelector}--broken`;
	}

	useEffect(() => {
		if (!refMasonry.current) return;

		new Masonry(refMasonry.current, {
			itemSelector: `.${props.itemSelector}`,
			columnWidth: `.${props.columnWidth}`,
			gutter: props.gutter,
			percentPosition: props.percentPosition
		});

		imagesLoaded(refMasonry.current).on("progress", onLoad);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props]);

	return (
		<ul className={props.className} ref={refMasonry}>
			{typeof props.columnWidth === "string" && <li className={props.columnWidth}></li>}
			{props.children}
		</ul>
	);
}
