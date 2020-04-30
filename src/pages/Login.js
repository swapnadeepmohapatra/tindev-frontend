import React from 'react';
import Navbar from '../components/navbar';
import '../App.css';
import Footer from '../components/footer';

const Login = () => {
	return (
		<>
			<div className="login-container" style={{ display: 'flex', flexDirection: 'column' }}>
				<Navbar />
				<div className="login-container">
					<form>
						{/* <h3>Coding Partner</h3> */}
						<h3>Find Your Coding Partner</h3>
						<p>Find the perfect match for your code</p>
						<input placeholder="GitHub username" />
						<button type="submit">SIGN UP</button>
					</form>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Login;
