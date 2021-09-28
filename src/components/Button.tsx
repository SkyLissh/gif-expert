import React from "react";
import "src/components/Button.css";

interface Props {
	iconStyle?: boolean;
	children: React.ReactNode;
}

export const Button = (props: Props) => {
	return (
		<button className={props.iconStyle ? "button button--icon" : "button"}>
			{props.children}
		</button>
	);
};
