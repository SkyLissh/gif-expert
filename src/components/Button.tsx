import React, { ReactElement } from "react";
import "src/components/Button.css";

interface Props {
	iconStyle?: boolean;
	alt?: boolean;
	onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
	children: React.ReactNode;
}

export default function Button(props: Props): ReactElement {
	const buttonAlt = props.alt ? "button--alt" : "";
	const buttonStyle = props.iconStyle ? "button--icon" : "";

	return (
		<button className={`button ${buttonAlt} ${buttonStyle}`} onClick={props.onClick}>
			{props.children}
		</button>
	);
}
