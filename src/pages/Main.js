import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const Main = ({ match }) => {
	return (
		<>
			<div className="main-container" style={{ display: 'flex', flexDirection: 'column' }}>
				<Navbar />
				<div className="main-container" style={{ display: 'flex', flexDirection: 'column' }}>
					{true && (
						<>
							<div className="oops">OOPS!</div>
							<div className="empty">No more devs! :(</div>
							<div className="empty" style={{ fontWeight: 'normal' }}>
								There's no one new around you.
							</div>
						</>
					)}
					{false && (
						<>
							<div className="oops">OOPS!</div>
							<div className="empty">No more devs! :(</div>
							<div className="empty" style={{ fontWeight: 'normal' }}>
								There's no one new around you.
							</div>
						</>
					)}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Main;
