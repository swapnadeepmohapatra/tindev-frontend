import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import Sidebar from './sidebar';

function Navbar({ isHome, user }) {
	useEffect(() => {
		let sidenav = document.querySelector('#slide-out');
		M.Sidenav.init(sidenav, {});
	}, []);

	return (
		<>
			<nav className="navMain">
				<div className="nav-wrapper">
					{isHome && user && (
						<a href="#" data-target="slide-out" className="sidenav-trigger show-on-large">
							{/*  show-on-large to show on big screens */}
							<i className="material-icons">menu</i>
						</a>
					)}
					<Link to="/" className="brand-logo center">
						<img style={{ height: 50, marginTop: 10 }} src={require('../tinderLogo.png')} alt="Logo" />
					</Link>
				</div>
			</nav>
			{isHome && <Sidebar user={user} />}
		</>
	);
}

export default Navbar;
