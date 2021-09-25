import React, { ReactElement } from "react";
import "./Topbar.css";
import { Button } from "./Button";
import Search from "./Search";

interface Props {
	width: number;
}

export default function Topbar({ width }: Props): ReactElement {
	return (
		<nav className="topbar">
			<h1 className="topbar__title">GIF Expert</h1>
			<Search />
			{width > 768 ? (
				<Button>Try your look</Button>
			) : (
				<Button iconStyle>
					<span className="material-icons">search</span>
				</Button>
			)}
		</nav>
	);
}
