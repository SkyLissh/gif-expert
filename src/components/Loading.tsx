import React, { ReactElement } from "react";

import "src/components/Loading.css";

export default function Loading(): ReactElement {
	return (
		<div className="loading__container">
			<div className="loading">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}
