import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import api from '../helper/api';
import '../App.css';
import { Swipeable, direction } from 'react-deck-swiper';
import Card from '../components/card';
import Grid from '@material-ui/core/Grid';
import dislike from '../assets/dislike.svg';
import like from '../assets/like.svg';
import yes from '../assets/yes.svg';
import nope from '../assets/nope.svg';
import itsamatch from '../assets/itsamatch.png';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import KeyHandler, { KEYPRESS } from 'react-key-handler';

const Main = ({ match }) => {
	const [users, setUsers] = useState([]);
	const [userMatch, setUserMatch] = useState(null);
	const [meUser, setMeUser] = useState(null);

	useEffect(() => {
		getUsers();
	}, [match.params.id]);

	useEffect(() => {
		getMatch();
	}, [match.params.id]);

	const getUsers = async () => {
		const response = await api.get('/user', {
			headers: { user: match.params.id },
		});

		const myResponse = await api.get('/userById', {
			headers: { userid: match.params.id },
		});

		setUsers(response.data);
		setMeUser(myResponse.data);
	};

	const getMatch = () => {
		const socket = io(process.env.REACT_APP_SOCKET, {
			query: { user: match.params.id },
		});

		socket.on('match', (user) => {
			setUserMatch(user);
		});
	};

	const handleOnSwipe = (swipeDirection) => {
		if (swipeDirection === direction.RIGHT) {
			addLikeUser(users[0]._id);
		}

		if (swipeDirection === direction.LEFT) {
			addDislikeUser(users[0]._id);
		}
	};

	const addLikeUser = async (id) => {
		setUsers((prev) => prev.slice(1));

		await api.post(`/user/${id}/likes`, null, {
			headers: { user: match.params.id },
		});
	};

	const addDislikeUser = async (id) => {
		setUsers((prev) => prev.slice(1));

		await api.post(`/user/${id}/dislikes`, null, {
			headers: { user: match.params.id },
		});
	};

	if (userMatch) {
		return (
			<div className="match-container">
				<img src={itsamatch} alt="It's a match!" />
				<div>
					<img className="avatar" src={meUser.photo} alt="avatar" />
					<img className="avatar" src={userMatch.photo} alt="avatar" />
				</div>

				<strong>{userMatch.name}</strong>
				<p>{userMatch.bio}</p>
				<Link to={`/chat/${userMatch._id}/${meUser._id}`} className="contSwipe" type="button">
					Send Message
				</Link>
				<button
					className="sendMsg"
					type="button"
					onClick={() => {
						setUserMatch(null);
						window.location.reload();
					}}
				>
					Continue Swiping
				</button>
			</div>
		);
	}

	if (users.length > 0) {
		return (
			<>
				<KeyHandler
					keyEventName={KEYPRESS}
					keyEventName="keydown"
					keyValue={['ArrowLeft', 'ArrowRight']}
					onKeyHandle={(a) => {
						if (a.key === 'ArrowLeft') {
							addDislikeUser(users[0]._id);
						} else if (a.key === 'ArrowRight') {
							addLikeUser(users[0]._id);
						}
					}}
				/>
				{meUser && <Navbar isHome={true} user={meUser} uid={meUser._id} />}

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
								<div className="buttons">
									<button type="button" onClick={() => addDislikeUser(users[0]._id)}>
										<img src={dislike} className="btnDislike" alt="Dislike" />
									</button>

									<button type="button" onClick={() => addLikeUser(users[0]._id)}>
										<img src={like} className="btnLike" alt="Like" />
									</button>
								</div>
								<div className="help">
									<div>
										<img src={nope} alt="Like" />
										<p>NOPE</p>
									</div>
									<div>
										<img src={yes} alt="Like" />
										<p>LIKE</p>
									</div>
								</div>
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
				{meUser && <Navbar isHome={true} user={meUser} uid={meUser._id} />}
				<div className="empty-container" style={{ display: 'flex', flexDirection: 'column' }}>
					<p>{JSON.stringify(users[0])}</p>

					{meUser === null ? (
						<>
							<span className="pulse">
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
							</span>
							<div className="oops">Loading...</div>
							<div className="empty" style={{ fontWeight: 'normal' }}>
								Fetching Devs Around You
							</div>
						</>
					) : (
						<>
							<span className="pulse">
								<img src={meUser.photo} alt="You..." />
							</span>
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
