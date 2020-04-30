import React from 'react';

function Navbar() {
	return (
		<nav className="navMain">
			<div class="nav-wrapper">
				<a href="#" class="brand-logo center">
					<img style={{ height: 50, marginTop: 10 }} src={require('../tinderLogo.png')} alt="Logo" />
				</a>
			</div>
		</nav>
	);
}

export default Navbar;
