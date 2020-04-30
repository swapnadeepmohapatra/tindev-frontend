import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<nav className="navMain">
			<div className="nav-wrapper">
				<Link to="/" className="brand-logo center">
					<img style={{ height: 50, marginTop: 10 }} src={require('../tinderLogo.png')} alt="Logo" />
				</Link>
			</div>
		</nav>
	);
}

export default Navbar;
