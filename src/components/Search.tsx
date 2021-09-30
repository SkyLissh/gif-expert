import React, { ReactElement } from "react";
import "src/components/Search.css";
import Button from "src/components/Button";

interface Props {
	handleTagChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	tag: string;
}

export default function Search({ handleTagChange, onSubmit, tag }: Props): ReactElement {
	return (
		<form className="search" onSubmit={onSubmit}>
			<input
				className="search__input"
				type="text"
				placeholder="Search amazing GIFs..."
				value={tag}
				onInput={handleTagChange}
			/>
			<Button iconStyle>
				<span className="material-icons">search</span>
			</Button>
		</form>
	);
}
