import React from 'react';
import '../App.css';

function Footer() {
	return (
		<footer className="page-footer">
			<div className="container">
				<div className="row">
					<div className="col">
						<h5 className="footer-head" style={{ textAlign: 'center' }}>
							Tindev
						</h5>
						<div className="col l6  offset-l3 s12">
							<p style={{ color: '#d9d9db', textAlign: 'center' }}>
								Researching co-worker is something difficult. Tindev offers you the opportunity to
								simply accelerate the process by finding out which is the best match.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="footer-copyright">
				<div className="container" style={{ color: '#aaa' }}>
					©2020 <b style={{ color: '#edf1f4' }}>Tindev.</b> All rights reserved.
				</div>
			</div>
		</footer>
	);
}

export default Footer;
