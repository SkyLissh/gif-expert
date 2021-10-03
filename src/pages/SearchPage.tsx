import React, { ReactElement } from "react";
import { useParams } from "react-router";

import { API_KEY } from "src/environment";
import toTitleCase from "src/helpers/toTitleCase";

import GifContainer from "src/components/GifContainer";

export default function SearchPage(): ReactElement {
	const { tag } = useParams<{ tag: string }>();

	const urlSearch: string = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${tag}&limit=20`;

	return <GifContainer title={toTitleCase(tag)} url={urlSearch} icon="search" />;
}
