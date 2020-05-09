import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Chat from './pages/Chat';
import ProfileView from './pages/ProfileView';

const Routes = () => {
	return (
		<BrowserRouter>
			<Route path="/user/:id" exact component={Main} />
			<Route path="/" exact component={Login} />
			<Route path="/chat/:receiverId/:senderId" exact component={Chat} />
			<Route path="/view/user/:meId/:userName/:userId" exact component={ProfileView} />
		</BrowserRouter>
	);
};

export default Routes;
