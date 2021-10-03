import React from "react";

import "src/components/Tooltip.css";

interface Props {
	text: string;
}

const Tooltip = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
	return (
		<div className="tooltip tooltip--hidden" ref={ref}>
			<span className="tooltip__text">{props.text}</span>
		</div>
	);
});

export default Tooltip;
