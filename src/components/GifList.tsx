import React, { ReactElement } from "react";

import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";

import MasonryLayout from "src/components/MasonryLayout";
import GifResponse from "src/models/GifResponse";
import GifItem from "src/components/GifItem";

interface Props {
	width: number;
	url: string;
}

export default function GifList({ width, url }: Props): ReactElement {
	const gifsQuery = useInfiniteQuery(
		"gifs",
		({ pageParam = 0 }) => fetchGifs(pageParam),
		{
			getNextPageParam: (lastPage) => {
				if (lastPage.pagination.offset < lastPage.pagination.total_count) {
					return lastPage.pagination.offset + 20;
				}
				return undefined;
			}
		}
	);

	async function fetchGifs(pageParam: number): Promise<GifResponse> {
		console.log(`Fetching url ${url}`);
		console.log(`Fetching page ${pageParam}`);
		const res = await fetch(`${url}&offset=${pageParam}`);
		return (await res.json()) as GifResponse;
	}

	if (gifsQuery.error instanceof Error) {
		return <div>Error: {gifsQuery.error.message}</div>;
	}

	// if (!gifsQuery.data) {
	// 	return <div>Loading...</div>;
	// }

	return (
		// ignore the warning about the infinite scroll
		<InfiniteScroll
			hasMore={gifsQuery.hasNextPage}
			loadMore={gifsQuery.fetchNextPage as (page: number) => void}
		>
			<MasonryLayout
				className="masonry"
				itemSelector="masonry__item"
				columnWidth="masonry--resizer"
				gutter={16}
				percentPosition={true}
			>
				{gifsQuery.data?.pages.map((page) =>
					page.data.map((gif) => <GifItem key={gif.id} gif={gif} screenWidth={width} />)
				)}
			</MasonryLayout>
			{gifsQuery.isFetching && <div>Loading...</div>}
		</InfiniteScroll>
	);
}
