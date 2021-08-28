import React from "react";
import { API_KEY } from "./environment";
import useFetch from "./hooks/useFetch";

import "./App.css";
import GifResponse from "./models/GifResponse";

function App() {
	const url = new URL("https://api.giphy.com/v1/gifs/search");
	url.searchParams.set("q", "cat");
	url.searchParams.append("api_key", API_KEY);
	url.searchParams.set("limit", "10");
	// const URI = `https://api.giphy.com/v1/gifs/search?q=${"dragon"}&api_key=${API_KEY}&limit=100&offset=0`;

	const { data: gifs, error } = useFetch<GifResponse>(url.toString());

	if (error) {
		return <div>Error: {error.message}</div>;
	}
	if (!gifs) {
		return <div>Loading...</div>;
	}

	return (
		<div className="App">
			<header className="App-header">
				{console.log(gifs.data[0].images.original.url)}
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
