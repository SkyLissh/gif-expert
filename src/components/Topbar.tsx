import React, { ReactElement, useState } from "react";
import { Link } from "react-router-dom";

import "src/components/Topbar.css";

import { Button } from "src/components/Button";
import Search from "src/components/Search";

export default function Topbar(): ReactElement {
	const [tag, setTag] = useState<string>("");

	function handleTagChange(e: React.ChangeEvent<HTMLInputElement>): void {
		setTag(e.target.value);
	}

	return (
		<nav className="topbar">
			<h1 className="topbar__title">
				<Link className="topbar__link" to="/">
					GIF Expert
				</Link>
			</h1>
			<Search handleTagChange={handleTagChange} tag={tag} />
			<Button iconStyle>
				<Link to={`/search/${tag}`}>
					<span className="material-icons">search</span>
				</Link>
			</Button>
		</nav>
	);
}
