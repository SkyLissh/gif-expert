import React, { ReactElement } from "react";

import "src/components/Search.css";

import Button from "src/components/Button";

interface Props {
	value: string;
	alt?: boolean;
	onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Search({ value, alt, onInput, onSubmit }: Props): ReactElement {
	const searchAlt = alt ? "search--alt" : "";

	return (
		<form className={`search ${searchAlt}`} onSubmit={onSubmit}>
			<input
				className="search__input"
				type="text"
				placeholder="Search amazing GIFs..."
				value={value}
				onChange={onInput}
			/>
			<Button iconStyle alt={alt}>
				<span className="material-icons">search</span>
			</Button>
		</form>
	);
}
