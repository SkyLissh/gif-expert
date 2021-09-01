import React, { ReactElement } from "react";
import "./Search.css";
import { Button } from "./Button";

interface Props {}

export default function Search(props: Props): ReactElement {
	return (
		<form className="search">
			<input
				className="search__input"
				type="text"
				id="search"
				placeholder="Search amazing GIFs..."
			/>
			<Button iconStyle>
				<span className="material-icons">search</span>
			</Button>
		</form>
	);
}
