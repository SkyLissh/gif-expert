import React, { ReactElement } from "react";

import { API_KEY } from "src/environment";

import GifContainer from "src/components/GifContainer";

export default function HomePage(): ReactElement {
	const urlTrend: string = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=20`;

	return <GifContainer title="Trending" url={urlTrend} icon="trending_up" />;
}
