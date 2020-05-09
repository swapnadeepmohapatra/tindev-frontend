import React, { useState } from 'react';
import Navbar from '../components/navbar';
import '../App.css';
import Footer from '../components/footer';
import api from '../helper/api';
import LoadingOverlay from 'react-loading-overlay';

const Login = ({ history }) => {
	const [username, setUsername] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (event) => {
		if (username.trim() != '') {
			event.preventDefault();
			setLoading(true);
			const response = await api.post('/user', {
				username,
			});

			const { _id } = response.data;
			setLoading(false);
			history.push(`/user/${_id}`);
		} else {
			event.preventDefault();
			alert('Enter your GitHub Username');
		}
	};

	return (
		<>
			<LoadingOverlay
				active={loading}
				spinner={
					<div class="preloader-wrapper big active">
						<div class="spinner-layer spinner-blue">
							<div class="circle-clipper left">
								<div class="circle"></div>
							</div>
							<div class="gap-patch">
								<div class="circle"></div>
							</div>
							<div class="circle-clipper right">
								<div class="circle"></div>
							</div>
						</div>

						<div class="spinner-layer spinner-red">
							<div class="circle-clipper left">
								<div class="circle"></div>
							</div>
							<div class="gap-patch">
								<div class="circle"></div>
							</div>
							<div class="circle-clipper right">
								<div class="circle"></div>
							</div>
						</div>

						<div class="spinner-layer spinner-yellow">
							<div class="circle-clipper left">
								<div class="circle"></div>
							</div>
							<div class="gap-patch">
								<div class="circle"></div>
							</div>
							<div class="circle-clipper right">
								<div class="circle"></div>
							</div>
						</div>

						<div class="spinner-layer spinner-green">
							<div class="circle-clipper left">
								<div class="circle"></div>
							</div>
							<div class="gap-patch">
								<div class="circle"></div>
							</div>
							<div class="circle-clipper right">
								<div class="circle"></div>
							</div>
						</div>
					</div>
				}
				className="login-container"
				style={{ display: 'flex', flexDirection: 'column' }}
			>
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
			</LoadingOverlay>
			<Footer />
		</>
	);
};

export default Login;
