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

	function hideSearch(): void {
		refSearch.current?.classList.add("hidden");
		document.body.classList.remove("lock");
	}

	function showSearch(): void {
		refSearch.current?.classList.remove("hidden");
		document.body.classList.add("lock");
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
		e.preventDefault();
		hideSearch();
		history.push(`/search/${tag.toLocaleLowerCase()}`);
	}

	function handleSuggestion(value: string): void {
		setTag(value);
		hideSearch();
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
			<Button iconStyle onClick={showSearch}>
				<span className="material-icons">search</span>
			</Button>
			<SearchMenu ref={refSearch} onHide={hideSearch} onSuggestion={handleSuggestion}>
				<Search alt value={tag} onInput={handleTagChange} onSubmit={handleSubmit} />
			</SearchMenu>
		</nav>
	);
}
