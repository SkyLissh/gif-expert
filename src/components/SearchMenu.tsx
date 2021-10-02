import React from "react";
import { useQuery } from "react-query";

import "src/components/SearchMenu.css";
import { API_KEY } from "src/environment";

import Button from "src/components/Button";

interface Props {
	// value: string;
	children: React.ReactNode;
	// onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onHide: () => void;
	// onSearch: (value?: string, e?: React.FormEvent<HTMLFormElement>) => void;
	// onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	onSuggestion: (value: string) => void;
}

const SearchMenu = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
	const url: string = `https://api.giphy.com/v1/trending/searches?api_key=${API_KEY}`;

	const { data, error } = useQuery<string[]>("terms", fetchTerms);

	async function fetchTerms(): Promise<string[]> {
		const res = await fetch(url);
		return (await res.json()).data;
	}

	if (error instanceof Error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div className="search-menu__overlay hidden" ref={ref}>
			<div className="search-menu">
				<header className="search-menu__header">
					<Button alt iconStyle onClick={props.onHide}>
						<span className="material-icons">arrow_back_ios</span>
					</Button>

					{props.children}
				</header>
				<ul className="suggest__list">
					{data?.map((term: string) => (
						<li
							className="suggest__item"
							key={term}
							onClick={() => props.onSuggestion(term)}
						>
							{term}
							<span className="material-icons">chevron_right</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
});

export default SearchMenu;
