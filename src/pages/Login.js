import React, { useState } from 'react';
import Navbar from '../components/navbar';
import '../App.css';
import Footer from '../components/footer';
import api from '../helper/api';

const Login = ({ history }) => {
	const [username, setUsername] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();

		const response = await api.post('/user', {
			username,
		});
		console.log(response.data);

		const { _id } = response.data;

		history.push(`/user/${_id}`);
	};

	return (
		<>
			<div className="login-container" style={{ display: 'flex', flexDirection: 'column' }}>
				<Navbar isHome={false} />
				<div className="login-container">
					<form onSubmit={handleSubmit}>
						<h3>Find Your Coding Partner</h3>
						<p>Find the perfect match for your code</p>
						<input
							value={username}
							placeholder="GitHub username"
							onChange={(event) => setUsername(event.target.value)}
						/>
						<button type="submit">SIGN UP</button>
					</form>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Login;
