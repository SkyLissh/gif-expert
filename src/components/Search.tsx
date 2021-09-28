import React, { ReactElement } from "react";
import "src/components/Search.css";
import { Button } from "src/components/Button";
import { useHistory } from "react-router-dom";

interface Props {
	handleTagChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	tag: string;
}

export default function Search({ tag, handleTagChange }: Props): ReactElement {
	const history = useHistory();

	function handleSearch(e: React.FormEvent<HTMLFormElement>): void {
		e.preventDefault();
		history.push(`/search/${tag}`);
	}

	return (
		<form className="search" onSubmit={handleSearch}>
			<input
				className="search__input"
				type="text"
				id="search"
				placeholder="Search amazing GIFs..."
				onInput={handleTagChange}
			/>
			<Button iconStyle>
				<span className="material-icons">search</span>
			</Button>
		</form>
	);
}
