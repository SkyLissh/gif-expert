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

	function toggleSearch(): void {
		refSearch.current?.classList.toggle("hidden");
		document.body.classList.toggle("lock");
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
		e.preventDefault();
		toggleSearch();
		console.log(tag);
		history.push(`/search/${tag}`);
	}

	function handleSuggestion(value: string): void {
		setTag(value);
		toggleSearch();
		history.push(`/search/${value}`);
	}

	return (
		<nav className="topbar">
			<h1 className="topbar__title">
				<Link className="topbar__link" to="/">
					GIF Expert
				</Link>
			</h1>
			<Search value={tag} onInput={handleTagChange} onSubmit={handleSubmit} />
			<Button iconStyle onClick={toggleSearch}>
				<span className="material-icons">search</span>
			</Button>
			<SearchMenu ref={refSearch} onHide={toggleSearch} onSuggestion={handleSuggestion}>
				<Search alt value={tag} onInput={handleTagChange} onSubmit={handleSubmit} />
			</SearchMenu>
		</nav>
	);
}
