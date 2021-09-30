import React from "react";
import { useQuery } from "react-query";

import "src/components/SearchMenu.css";
import { API_KEY } from "src/environment";

import Search from "src/components/Search";
import Loading from "src/components/Loading";
import Button from "src/components/Button";

interface Props {
	onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onHide: () => void;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	tag: string;
}

const SearchMenu = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
	const url: string = `https://api.giphy.com/v1/trending/searches?api_key=${API_KEY}`;

	const { data, error, isLoading } = useQuery<string[]>("terms", fetchTerms);

	async function fetchTerms(): Promise<string[]> {
		const res = await fetch(url);
		return (await res.json()).data;
	}

	if (error instanceof Error) {
		return <div>Error: {error.message}</div>;
	}

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div className="search-menu hidden" ref={ref}>
			<header className="search-menu__header">
				<Button iconStyle onClick={props.onHide}>
					<span className="material-icons">arrow_back_ios</span>
				</Button>

				<Search
					handleTagChange={props.onSearch}
					onSubmit={props.onSubmit}
					tag={props.tag}
				/>
			</header>
			<ul>
				{data?.map((term: string) => (
					<li key={term}>{term}</li>
				))}
			</ul>
		</div>
	);
});

export default SearchMenu;
