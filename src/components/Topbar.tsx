import React, { ReactElement } from "react";
import "./Topbar.css";
import { Button } from "./Button";
import Search from "./Search";

interface Props {}

export default function Topbar(props: Props): ReactElement {
	return (
		<nav className="topbar">
			<h1 className="topbar__title">GIF Expert</h1>
			<Button iconStyle>
				<span className="material-icons">search</span>
			</Button>
		</nav>
	);
}
