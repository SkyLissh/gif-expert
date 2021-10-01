import React, { ReactElement } from "react";

import "src/components/Search.css";

import Button from "src/components/Button";

interface Props {
	value: string;
	onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Search({ value, onInput, onSubmit }: Props): ReactElement {
	return (
		<form className="search" onSubmit={onSubmit}>
			<input
				className="search__input"
				type="text"
				placeholder="Search amazing GIFs..."
				value={value}
				onChange={onInput}
			/>
			<Button iconStyle>
				<span className="material-icons">search</span>
			</Button>
		</form>
	);
}
