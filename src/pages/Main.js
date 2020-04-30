import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import '../App.css';
import api from '../helper/api';

const Main = ({ match }) => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getUsers();
	}, [match.params.id]);

	const getUsers = async () => {
		const response = await api.get('/user', {
			headers: { user: match.params.id },
		});

		setUsers(response.data);
	};

	return (
		<>
			<div className="main-container" style={{ display: 'flex', flexDirection: 'column' }}>
				<Navbar />
				<div className="main-container" style={{ display: 'flex', flexDirection: 'column' }}>
					<p>{JSON.stringify(users[0])}</p>

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
