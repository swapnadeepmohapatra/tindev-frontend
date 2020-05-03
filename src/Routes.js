import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Chat from './pages/Chat';

const Routes = () => {
	return (
		<BrowserRouter>
			<Route path="/user/:id" exact component={Main} />
			<Route path="/" exact component={Login} />
			<Route path="/chat/:receiverId/:senderId" exact component={Chat} />
		</BrowserRouter>
	);
};

export default Routes;
