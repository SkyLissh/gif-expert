import React, { ReactElement } from "react";
import "src/components/Button.css";

interface Props {
	iconStyle?: boolean;
	onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
	children: React.ReactNode;
}

export default function Button(props: Props): ReactElement {
	return (
		<button
			className={props.iconStyle ? "button button--icon" : "button"}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}
