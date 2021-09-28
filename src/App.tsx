import React, { ReactElement } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Topbar from "src/components/Topbar";
import HomePage from "src/pages/HomePage";
import SearchPage from "src/pages/SearchPage";

export default function App(): ReactElement {
	return (
		<Router>
			<Topbar />
			<Switch>
				<Route path="/" exact>
					<HomePage />
				</Route>
				<Route path="/search/:tag">
					<SearchPage />
				</Route>
			</Switch>
		</Router>
	);
}
