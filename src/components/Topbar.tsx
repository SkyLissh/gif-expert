import React, { ReactElement, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "src/components/Topbar.css";

import Button from "src/components/Button";
import Search from "src/components/Search";
import SearchMenu from "src/components/SearchMenu";

export default function Topbar(): ReactElement {
	const [tag, setTag] = useState<string>("");
	const history = useHistory();
	const refSearch = useRef<HTMLDivElement>(null);

	function handleTagChange(e: React.ChangeEvent<HTMLInputElement>): void {
		setTag(e.target.value);
	}

	function toggleSearchMenu(): void {
		refSearch.current?.classList.toggle("hidden");
	}

	function onSubmit(e: React.FormEvent<HTMLFormElement>): void {
		e.preventDefault();
		toggleSearchMenu();
		setTag("");
		history.push(`/search/${tag}`);
	}

	return (
		<nav className="topbar">
			<h1 className="topbar__title">
				<Link className="topbar__link" to="/">
					GIF Expert
				</Link>
			</h1>
			<Search tag={tag} handleTagChange={handleTagChange} onSubmit={onSubmit} />
			<Button iconStyle onClick={toggleSearchMenu}>
				<span className="material-icons">search</span>
			</Button>
			<SearchMenu
				ref={refSearch}
				tag={tag}
				onSearch={handleTagChange}
				onHide={toggleSearchMenu}
				onSubmit={onSubmit}
			/>
		</nav>
	);
}
