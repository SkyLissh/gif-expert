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
	onProgress?: ImagesLoaded.ImagesLoadedListener;
}

export default function MasonryLayout(props: Props): ReactElement {
	const refMasonry = useRef<HTMLUListElement>(null);

	useEffect(() => {
		if (refMasonry.current) {
			const masonry = new Masonry(refMasonry.current, {
				itemSelector: `.${props.itemSelector}`,
				columnWidth: `.${props.columnWidth}`,
				gutter: props.gutter,
				percentPosition: props.percentPosition
			});

			imagesLoaded(refMasonry.current).on("progress", (instance, image) => {
				image!.img.parentElement!.style.removeProperty("height");
				image!.img.parentElement!.className = image!.isLoaded
					? props.itemSelector
					: `${props.itemSelector} ${props.itemSelector}--broken`;
				masonry.layout!();
			});
		}
	}, [refMasonry, props]);

	return (
		<ul className={props.className} ref={refMasonry}>
			{typeof props.columnWidth === "string" && <div className={props.columnWidth}></div>}
			{props.children}
		</ul>
	);
}
