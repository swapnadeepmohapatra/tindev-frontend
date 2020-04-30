import React from 'react';
import Navbar from '../components/navbar';
import '../App.css';

const Login = () => {
	return (
		<div className="login-container" style={{ display: 'flex', flexDirection: 'column' }}>
			<Navbar />
		</div>
	);
};

export default Login;
