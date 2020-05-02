import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import api from '../helper/api';
import '../App.css';
import { Swipeable, direction } from 'react-deck-swiper';
import Card from '../components/card';
import Grid from '@material-ui/core/Grid';

const Main = ({ match }) => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getUsers();
	}, [match.params.id]);

	const getUsers = async () => {
		const response = await api.get('/user', {
			headers: { user: match.params.id },
		});

		console.log(response.data);

		setUsers(response.data);
	};

	const handleOnSwipe = (swipeDirection) => {
		if (swipeDirection === direction.RIGHT) {
			addLikeUser(users[0]._id);
		}

		if (swipeDirection === direction.LEFT) {
			addDislikeUser(users[0]._id);
		}

		setUsers((prev) => prev.slice(1));
	};

	const addLikeUser = async (id) => {
		await api.post(`/user/${id}/likes`, null, {
			headers: { user: match.params.id },
		});
	};

	const addDislikeUser = async (id) => {
		await api.post(`/user/${id}/dislikes`, null, {
			headers: { user: match.params.id },
		});
	};

	if (users.length > 0) {
		return (
			<>
				<Navbar />
				<div className="main-container">
					{users.length > 0 && (
						<Grid
							container
							spacing={3}
							style={{
								justifyContent: 'center',
								flexDirection: 'column',
								alignItems: 'center',
								display: 'flex',
							}}
						>
							<Grid
								item
								xs={12}
								style={{
									justifyContent: 'center',
									flexDirection: 'column',
									alignItems: 'center',
									display: 'flex',
								}}
							>
								<Swipeable onSwipe={handleOnSwipe}>
									<Card item={users[0]} />
								</Swipeable>
							</Grid>
						</Grid>
					)}
				</div>
				<Footer />
			</>
		);
	}
	return (
		<>
			<div className="empty-container" style={{ display: 'flex', flexDirection: 'column' }}>
				<Navbar />
				<div className="empty-container" style={{ display: 'flex', flexDirection: 'column' }}>
					<p>{JSON.stringify(users[0])}</p>

					{true && (
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
