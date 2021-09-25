import React, { ReactElement } from "react";

import MasonryLayout from "src/components/MasonryLayout";
import GifResponse from "src/models/GifResponse";
import { QueryFunctionContext, useInfiniteQuery } from "react-query";
import GifItem from "src/components/GifItem";
import InfiniteScroll from "react-infinite-scroller";

export default function GifList(): ReactElement {
	const url: string = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_GIPHY_KEY}&limit=20`;
	const screenWidth = window.innerWidth;

	const gifsQuery = useInfiniteQuery("gifs", fetchGifs, {
		getNextPageParam: (lastPage, allPages) => {
			if (lastPage.pagination.offset < lastPage.pagination.total_count) {
				return lastPage.pagination.offset + 20;
			}
			return undefined;
		}
	});

	async function fetchGifs(queryOptions: QueryFunctionContext): Promise<GifResponse> {
		const res = await fetch(`${url}&offset=${queryOptions.pageParam}`);
		return (await res.json()) as GifResponse;
		// return { results, nextPage: pageParam + 1, totalPages: 100 };
	}

	if (gifsQuery.error instanceof Error) {
		return <div>Error: {gifsQuery.error.message}</div>;
	}

	// if (gifsQuery.isFetching) {
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
					page.data.map((gif) => (
						<GifItem key={gif.id} gif={gif} screenWidth={screenWidth} />
					))
				)}
			</MasonryLayout>
			{gifsQuery.isFetching && <div>Loading...</div>}
		</InfiniteScroll>
	);
}
