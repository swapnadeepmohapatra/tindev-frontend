import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<nav className="navMain">
			<div className="nav-wrapper">
				<a href="#" className="brand-logo center">
					<Link to="/">
						<img style={{ height: 50, marginTop: 10 }} src={require('../tinderLogo.png')} alt="Logo" />
					</Link>
				</a>
			</div>
		</nav>
	);
}

export default Navbar;
