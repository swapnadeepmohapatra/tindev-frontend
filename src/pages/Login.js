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
		if (username.trim() !== '') {
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
					<div className="preloader-wrapper big active">
						<div className="spinner-layer spinner-blue">
							<div className="circle-clipper left">
								<div className="circle"></div>
							</div>
							<div className="gap-patch">
								<div className="circle"></div>
							</div>
							<div className="circle-clipper right">
								<div className="circle"></div>
							</div>
						</div>

						<div className="spinner-layer spinner-red">
							<div className="circle-clipper left">
								<div className="circle"></div>
							</div>
							<div className="gap-patch">
								<div className="circle"></div>
							</div>
							<div className="circle-clipper right">
								<div className="circle"></div>
							</div>
						</div>

						<div className="spinner-layer spinner-yellow">
							<div className="circle-clipper left">
								<div className="circle"></div>
							</div>
							<div className="gap-patch">
								<div className="circle"></div>
							</div>
							<div className="circle-clipper right">
								<div className="circle"></div>
							</div>
						</div>

						<div className="spinner-layer spinner-green">
							<div className="circle-clipper left">
								<div className="circle"></div>
							</div>
							<div className="gap-patch">
								<div className="circle"></div>
							</div>
							<div className="circle-clipper right">
								<div className="circle"></div>
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
