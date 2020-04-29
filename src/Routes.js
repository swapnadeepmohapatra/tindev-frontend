import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';

const Routes = () => {
	return (
		<BrowserRouter>
			<Route path="/user/:id" exact component={Main} />
			<Route path="/" exact component={Login} />
		</BrowserRouter>
	);
};

export default Routes;
